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
        className="relative text-white border-b border-navy-dark"
        style={{
          backgroundColor: 'var(--color-navy)',
        }}
      >
        <div className="container relative py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-semibold mb-4 bg-white/10 text-teal-200">
                Official Transit Information & Community Portal
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-3 tracking-tight"
                style={{ color: '#FFFFFF' }}
              >
                Penang LRT <span style={{ color: 'var(--color-amber)' }}>Mutiara Line</span>
              </h1>

              <p
                className="text-lg sm:text-xl font-medium mb-3"
                style={{ color: 'rgba(255, 255, 255, 0.95)' }}
              >
                Community Information & Feedback Platform
              </p>

              <p
                className="text-sm sm:text-base leading-relaxed mb-8 max-w-xl"
                style={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                Access verified construction milestones, active traffic diversions, and road closure
                advisories along the Mutiara LRT alignment. Lodge local concerns directly with project
                liaison officers.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/announcements"
                  className="btn btn-amber flex items-center gap-2 px-5 py-2.5 text-sm font-semibold shadow-sm"
                >
                  <HardHat size={16} />
                  View Construction Updates
                </Link>

                <Link
                  to="/road-closures"
                  className="btn flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border border-white/40 text-white hover:bg-white/10 hover:border-white transition-colors"
                  style={{ color: '#FFFFFF' }}
                >
                  <AlertTriangle size={16} style={{ color: 'var(--color-amber)' }} />
                  Check Road Closures
                </Link>
              </div>

              {/* Academic Simulation Notice */}
              <p
                className="text-xs mt-6 text-white/60 flex items-center gap-1.5"
              >
                Academic demonstration prototype for USM CMT322. Not an official government portal.
              </p>
            </div>

            {/* Right Column: Line Corridor Overview */}
            <div className="lg:col-span-5">
              <div
                className="rounded-lg p-5 border border-white/20 bg-navy-dark/80"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Train size={18} className="text-amber-400" />
                    <div>
                      <h3 className="text-white text-sm font-bold leading-tight" style={{ color: '#FFFFFF' }}>
                        Alignment Snapshot
                      </h3>
                      <p className="text-xs text-white/70">Silicon Island to Komtar Interchange</p>
                    </div>
                  </div>
                  <span className="badge font-semibold bg-emerald-900/60 text-emerald-200 border-emerald-700/50">
                    Phase 1 Construction
                  </span>
                </div>

                {/* Corridor details */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="rounded p-2 bg-white/5 border border-white/10">
                    <p className="text-[11px] text-white/60 mb-0.5">Route Length</p>
                    <p className="text-base font-bold text-white" style={{ color: '#FFFFFF' }}>29.0 km</p>
                  </div>
                  <div className="rounded p-2 bg-white/5 border border-white/10">
                    <p className="text-[11px] text-white/60 mb-0.5">Planned Stations</p>
                    <p className="text-base font-bold text-white" style={{ color: '#FFFFFF' }}>20 Stations</p>
                  </div>
                  <div className="rounded p-2 bg-white/5 border border-white/10">
                    <p className="text-[11px] text-white/60 mb-0.5">Main Depot</p>
                    <p className="text-base font-bold text-white" style={{ color: '#FFFFFF' }}>Island A</p>
                  </div>
                </div>

                {/* Schematic stops */}
                <div className="space-y-2 mb-4">
                  {[
                    { name: 'Komtar Interchange', zone: 'George Town Hub', active: true },
                    { name: 'Jelutong Station', zone: 'Sub-surface piling', active: true },
                    { name: 'Bayan Lepas FTZ', zone: 'Viaduct utility works', active: false },
                    { name: 'Penang Int. Airport', zone: 'Pre-construction survey', active: false },
                  ].map((station) => (
                    <div
                      key={station.name}
                      className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded bg-white/5 border border-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            station.active ? 'bg-amber-400' : 'bg-teal-400/80'
                          }`}
                        />
                        <span className="font-medium text-white/95">{station.name}</span>
                      </div>
                      <span className="text-white/60 text-[11px]">{station.zone}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-1 text-center">
                  <Link
                    to="/announcements"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-300 hover:text-white transition-colors"
                  >
                    View station progress announcements <ChevronRight size={14} />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="card flex flex-col p-6 bg-white">
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                style={{ backgroundColor: 'rgba(18, 55, 91, 0.08)', color: 'var(--color-navy)' }}
              >
                <HardHat size={20} />
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
                Construction Announcements
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                Verified notices on station excavations, viaduct assembly, utility diversions, and daily construction schedules.
              </p>
              <Link
                to="/announcements"
                className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline mt-auto"
                style={{ color: 'var(--color-navy)' }}
              >
                Browse updates <ArrowRight size={14} />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="card flex flex-col p-6 bg-white">
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                style={{ backgroundColor: 'rgba(244, 185, 66, 0.15)', color: '#b45309' }}
              >
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
                Road Closures & Detours
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                Active lane restrictions, scheduled night closures, traffic rerouting plans, and designated pedestrian walkways.
              </p>
              <Link
                to="/road-closures"
                className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline mt-auto"
                style={{ color: 'var(--color-navy)' }}
              >
                Check detour routes <ArrowRight size={14} />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="card flex flex-col p-6 bg-white">
              <div
                className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                style={{ backgroundColor: 'rgba(22, 166, 161, 0.1)', color: 'var(--color-teal)' }}
              >
                <MessageSquare size={20} />
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
                Community Feedback Portal
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                Direct channel for residents and merchants to lodge concerns regarding construction noise, dust, access, or safety.
              </p>
              <Link
                to={isAuthenticated ? '/feedback/new' : '/login'}
                className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline mt-auto"
                style={{ color: 'var(--color-navy)' }}
              >
                Lodge an inquiry <ArrowRight size={14} />
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
      {/* ========================================================
          SECTION E: COMMUNITY FEEDBACK
          ======================================================== */}
      <section
        className="py-16 text-white border-t border-navy-dark"
        style={{
          backgroundColor: 'var(--color-navy)',
        }}
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span
              className="text-xs font-semibold uppercase tracking-wider text-amber-300 inline-block mb-2"
            >
              Community Voice & Resolution
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-white mb-3"
              style={{ color: '#FFFFFF' }}
            >
              Have a Concern Regarding Nearby Works?
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-white/80">
              We work with contractors and local municipal councils to minimize disruption to residents and
              local merchants. Submit your inquiries, complaints, or safety feedback through our structured resolution pipeline.
            </p>
          </div>

          {/* 3-Step Process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            <div className="rounded-lg p-6 bg-navy-light/60 border border-white/10 text-center flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-3 text-white"
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

            <div className="rounded-lg p-6 bg-navy-light/60 border border-white/10 text-center flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-3 text-white"
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

            <div className="rounded-lg p-6 bg-navy-light/60 border border-white/10 text-center flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-3 text-white"
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
