/**
 * pages/public/HomePage.jsx
 * Route: /
 *
 * Public landing page introducing the Penang LRT Mutiara Line
 * Community Information & Feedback Platform.
 *
 * Sections:
 *   A. Hero Section (with primary/secondary CTAs & transit route visual)
 *   B. Platform Introduction (3 core services cards)
 *   C. Latest Construction Updates (top 3 published announcements)
 *   D. Road Closure Advisories (top 3 active/scheduled notices)
 *   E. Community Feedback (3-step process & feedback CTA)
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Train,
  AlertTriangle,
  MessageSquare,
  ArrowRight,
  HardHat,
  Send,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAnnouncements } from '../../services/announcementService';
import { getRoadClosures } from '../../services/roadClosureService';
import AnnouncementCard from '../../components/common/AnnouncementCard';
import RoadClosureCard from '../../components/common/RoadClosureCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  const [announcements, setAnnouncements] = useState([]);
  const [closures, setClosures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadHomeData() {
      setLoading(true);
      setError(null);
      try {
        const [annRes, closureRes] = await Promise.all([
          getAnnouncements({ status: 'published' }),
          getRoadClosures(),
        ]);

        if (isMounted) {
          // Take top 3 for each
          setAnnouncements(annRes.data.slice(0, 3));
          setClosures(closureRes.data.slice(0, 3));
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load homepage data:', err);
          setError('Unable to load latest updates at this time. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* ========================================================
          SECTION A: HERO SECTION
          ======================================================== */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background: 'linear-gradient(135deg, #0c2640 0%, #12375B 55%, #0f4c6e 100%)',
        }}
      >
        {/* Subtle decorative grid/glow overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, #16A6A1 0%, transparent 40%), radial-gradient(circle at 80% 70%, #F4B942 0%, transparent 40%)',
          }}
        />

        <div className="container relative py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5 bg-white/10 backdrop-blur-sm border border-white/15 text-teal-300">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                Community Engagement Initiative
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white mb-4 tracking-tight"
                style={{ color: '#FFFFFF' }}
              >
                Penang LRT <span style={{ color: 'var(--color-amber)' }}>Mutiara Line</span>
              </h1>

              <p
                className="text-lg sm:text-xl font-medium mb-3"
                style={{ color: 'rgba(255, 255, 255, 0.9)' }}
              >
                Community Information & Feedback Platform
              </p>

              <p
                className="text-sm sm:text-base leading-relaxed mb-8 max-w-xl"
                style={{ color: 'rgba(255, 255, 255, 0.75)' }}
              >
                Stay informed with official construction progress, traffic diversions, and road closure
                advisories along the Mutiara LRT alignment. Share your voice directly with the project
                liaison team to ensure safe and accessible neighborhoods.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/announcements"
                  className="btn btn-amber flex items-center gap-2 px-6 py-3 text-base shadow-lg"
                >
                  <HardHat size={18} />
                  View Construction Updates
                </Link>

                <Link
                  to="/road-closures"
                  className="btn flex items-center gap-2 px-6 py-3 text-base border-2 border-white/40 text-white hover:bg-white/10 hover:border-white transition-all shadow-md"
                  style={{ color: '#FFFFFF' }}
                >
                  <AlertTriangle size={18} style={{ color: 'var(--color-amber)' }} />
                  Check Road Closures
                </Link>
              </div>

              {/* Academic Simulation Notice */}
              <p
                className="text-xs mt-6 italic flex items-center gap-1.5"
                style={{ color: 'rgba(255, 255, 255, 0.55)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Academic demonstration prototype for USM CMT322. Not an official government portal.
              </p>
            </div>

            {/* Right Column: Interactive Line Schematic Card */}
            <div className="lg:col-span-5">
              <div
                className="rounded-2xl p-6 sm:p-7 backdrop-blur-md border border-white/15 shadow-2xl"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              >
                <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
                      style={{ backgroundColor: 'var(--color-teal)' }}
                    >
                      <Train size={20} color="white" />
                    </div>
                    <div>
                      <h3 className="text-white text-base font-bold leading-tight" style={{ color: '#FFFFFF' }}>
                        Alignment Snapshot
                      </h3>
                      <p className="text-xs text-white/60">Silicon Island ⇄ Komtar</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Phase 1 Active
                  </span>
                </div>

                {/* Corridor details */}
                <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                  <div className="rounded-xl p-3 bg-white/5 border border-white/10">
                    <p className="text-xs text-white/60 mb-0.5">Length</p>
                    <p className="text-lg font-bold text-white" style={{ color: '#FFFFFF' }}>29.0 km</p>
                  </div>
                  <div className="rounded-xl p-3 bg-white/5 border border-white/10">
                    <p className="text-xs text-white/60 mb-0.5">Stations</p>
                    <p className="text-lg font-bold text-white" style={{ color: '#FFFFFF' }}>20 Stations</p>
                  </div>
                  <div className="rounded-xl p-3 bg-white/5 border border-white/10">
                    <p className="text-xs text-white/60 mb-0.5">Depot</p>
                    <p className="text-lg font-bold text-white" style={{ color: '#FFFFFF' }}>Island A</p>
                  </div>
                </div>

                {/* Schematic stops */}
                <div className="space-y-3 mb-6">
                  {[
                    { name: 'Komtar Interchange', zone: 'George Town Hub', active: true },
                    { name: 'Jelutong Station', zone: 'Sub-surface piling', active: true },
                    { name: 'Bayan Lepas FTZ', zone: 'Viaduct utility works', active: false },
                    { name: 'Penang Int. Airport', zone: 'Pre-construction survey', active: false },
                  ].map((station) => (
                    <div
                      key={station.name}
                      className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-white/5 border border-white/5"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            station.active ? 'bg-amber-400 ring-2 ring-amber-400/30' : 'bg-teal-400/60'
                          }`}
                        />
                        <span className="font-semibold text-white/90">{station.name}</span>
                      </div>
                      <span className="text-white/50">{station.zone}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <Link
                    to="/announcements"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-white transition-colors"
                  >
                    Explore all station development notices <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION B: PLATFORM INTRODUCTION (3 CORE SERVICES)
          ======================================================== */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--color-teal)' }}
            >
              Public Services & Transparency
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold mt-1 mb-3"
              style={{ color: 'var(--color-navy)' }}
            >
              Built for Penang Commuters and Residents
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              The Mutiara LRT Line represents Penang’s most transformative public transit project.
              Our community platform ensures you remain fully informed and equipped during every construction milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="card flex flex-col p-6 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100 bg-white">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(18, 55, 91, 0.08)', color: 'var(--color-navy)' }}
              >
                <HardHat size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
                1. Construction Information
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                Receive verified updates on viaduct assembly, station excavations, piling schedules,
                and safety protocols straight from the project management office.
              </p>
              <Link
                to="/announcements"
                className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline mt-auto"
                style={{ color: 'var(--color-teal)' }}
              >
                Browse updates <ArrowRight size={14} />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="card flex flex-col p-6 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100 bg-white">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', color: 'var(--color-error)' }}
              >
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
                2. Road Closure Advisories
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                Plan your daily journey with advance notices of lane diversions, full road blockages,
                designated alternative routes, and pedestrian walkway conditions.
              </p>
              <Link
                to="/road-closures"
                className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline mt-auto"
                style={{ color: 'var(--color-teal)' }}
              >
                View road notices <ArrowRight size={14} />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="card flex flex-col p-6 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100 bg-white">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(22, 166, 161, 0.1)', color: 'var(--color-teal)' }}
              >
                <MessageSquare size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
                3. Community Feedback
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                Raise site-specific concerns regarding noise levels, dust containment, delivery vehicle access,
                or safety fences. Track team response status directly from your portal.
              </p>
              <Link
                to={isAuthenticated ? '/feedback/new' : '/login'}
                className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline mt-auto"
                style={{ color: 'var(--color-teal)' }}
              >
                Share feedback <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION C: LATEST CONSTRUCTION UPDATES
          ======================================================== */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'var(--color-teal)' }}
              >
                Timely Information
              </span>
              <h2
                className="text-2xl sm:text-3xl font-extrabold mt-1"
                style={{ color: 'var(--color-navy)' }}
              >
                Latest Construction Updates
              </h2>
            </div>
            <Link
              to="/announcements"
              className="btn btn-outline flex items-center gap-2 self-start sm:self-auto"
            >
              View All Updates <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 flex justify-center">
              <LoadingSpinner message="Loading latest announcements..." />
            </div>
          ) : error ? (
            <div className="p-6 text-center bg-white rounded-xl border border-red-200">
              <p className="text-sm text-red-600 mb-2">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-sm btn-outline text-xs"
              >
                Retry
              </button>
            </div>
          ) : announcements.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-xl text-gray-500">
              No recent announcements found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  compact={true}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          SECTION D: ROAD CLOSURE ADVISORIES
          ======================================================== */}
      <section className="py-16 bg-white border-t border-b border-gray-100">
        <div className="container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'var(--color-error)' }}
              >
                Traffic Advisories
              </span>
              <h2
                className="text-2xl sm:text-3xl font-extrabold mt-1"
                style={{ color: 'var(--color-navy)' }}
              >
                Active & Upcoming Road Closures
              </h2>
            </div>
            <Link
              to="/road-closures"
              className="btn btn-outline-teal flex items-center gap-2 self-start sm:self-auto"
            >
              View All Road Closures <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 flex justify-center">
              <LoadingSpinner message="Checking road closure notices..." />
            </div>
          ) : error ? (
            <div className="p-6 text-center bg-white rounded-xl border border-red-200">
              <p className="text-sm text-red-600">Failed to load road closures.</p>
            </div>
          ) : closures.length === 0 ? (
            <div className="p-8 text-center bg-gray-50 rounded-xl text-gray-500">
              No active or scheduled road closures currently posted.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {closures.map((closure) => (
                <RoadClosureCard
                  key={closure.id}
                  closure={closure}
                  compact={true}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          SECTION E: COMMUNITY FEEDBACK
          ======================================================== */}
      <section
        className="py-16 text-white relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #12375B 0%, #164670 100%)',
        }}
      >
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-amber-300 border border-white/15 inline-block mb-3"
            >
              Community Voice & Resolution
            </span>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4"
              style={{ color: '#FFFFFF' }}
            >
              Have a Concern Regarding Nearby Works?
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-white/80">
              We work closely with contractors and local councils to minimize disruption to residents and
              merchants. Submit your inquiries, complaints, or safety feedback through our structured resolution pipeline.
            </p>
          </div>

          {/* 3-Step Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="rounded-xl p-6 bg-white/10 backdrop-blur-sm border border-white/15 text-center flex flex-col items-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4 text-white"
                style={{ backgroundColor: 'var(--color-teal)' }}
              >
                1
              </div>
              <h3 className="text-base font-bold text-white mb-2" style={{ color: '#FFFFFF' }}>
                Submit Feedback
              </h3>
              <p className="text-xs leading-relaxed text-white/70">
                Categorize your issue (noise, dust, traffic, safety) and detail the exact location.
              </p>
            </div>

            <div className="rounded-xl p-6 bg-white/10 backdrop-blur-sm border border-white/15 text-center flex flex-col items-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4 text-white"
                style={{ backgroundColor: 'var(--color-teal)' }}
              >
                2
              </div>
              <h3 className="text-base font-bold text-white mb-2" style={{ color: '#FFFFFF' }}>
                Track Progress
              </h3>
              <p className="text-xs leading-relaxed text-white/70">
                Receive live status notifications as our project liaison team investigates your ticket.
              </p>
            </div>

            <div className="rounded-xl p-6 bg-white/10 backdrop-blur-sm border border-white/15 text-center flex flex-col items-center">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4 text-white"
                style={{ backgroundColor: 'var(--color-teal)' }}
              >
                3
              </div>
              <h3 className="text-base font-bold text-white mb-2" style={{ color: '#FFFFFF' }}>
                Receive Response
              </h3>
              <p className="text-xs leading-relaxed text-white/70">
                View formal explanations, corrective actions, and contractor follow-up reports.
              </p>
            </div>
          </div>

          {/* Final Feedback CTA button */}
          <div className="text-center">
            <Link
              to={isAuthenticated ? '/feedback/new' : '/login'}
              className="btn btn-amber px-8 py-3.5 text-base font-bold shadow-xl inline-flex items-center gap-2"
            >
              <Send size={18} />
              Submit Feedback Now
            </Link>
            {!isAuthenticated && (
              <p className="text-xs text-white/60 mt-3">
                Account required to submit and track feedback.{' '}
                <Link to="/register" className="text-amber-300 hover:underline font-semibold">
                  Register here
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
