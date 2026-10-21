/**
 * pages/public/HomePage.jsx
 * Route: /
 *
 * Redesigned to match the official Laluan Mutiara website structure:
 *   1. Hero: large rounded-corner image container + headline + scroll indicator below
 *   2. Penang cityscape / video-style banner (large rounded container)
 *   3. Three Quick Access Service Cards
 *   4. Construction Updates & Announcements (3 editorial cards)
 *   5. Road Closures & Traffic Advisories
 *   6. Share Your Concerns in 3 Simple Steps
 *   7. About The Project (split image + key metrics)
 *   8. CTA Banner
 */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  ArrowRight,
  Newspaper,
  Car,
  ChevronRight,
  Train,
  Route,
  Users,
  FileEdit,
  Search,
  MessageCircle,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAnnouncements } from '../../services/announcementService';
import { getRoadClosures } from '../../services/roadClosureService';
import AnnouncementCard from '../../components/common/AnnouncementCard';
import RoadClosureCard from '../../components/common/RoadClosureCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import LRTMapSection from '../../components/map/LRTMapSection';

export default function HomePage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const belowHeroRef = useRef(null);

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
    return () => { isMounted = false; };
  }, []);

  const scrollToContent = () => {
    belowHeroRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#EEF2F7' }}>

      {/* ============================================================
          1. HERO SECTION: Official elevated LRT project visual with high-contrast text overlay
          ============================================================ */}
      <section className="px-3 sm:px-5" style={{ paddingTop: '8px', paddingBottom: '0' }}>
        <div
          className="relative w-full overflow-hidden flex items-center"
          style={{
            borderRadius: '28px',
            minHeight: '500px',
            maxHeight: '620px',
          }}
        >
          {/* Hero Image: Penang LRT Mutiara Line Elevated Train & Viaduct */}
          <img
            src="/images/hero_lrt.jpg"
            alt="Penang LRT Mutiara Line elevated light rail transit train in George Town Penang"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* High-visibility multi-stop contrast gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(10, 31, 56, 0.95) 0%, rgba(10, 31, 56, 0.88) 45%, rgba(10, 31, 56, 0.55) 75%, rgba(10, 31, 56, 0.35) 100%), linear-gradient(180deg, rgba(10, 31, 56, 0.65) 0%, rgba(10, 31, 56, 0.20) 40%, rgba(10, 31, 56, 0.85) 100%)',
            }}
          />

          {/* Hero Content Container — with clearance for floating navbar */}
          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-14 pt-28 sm:pt-36 pb-12 sm:pb-16 flex flex-col justify-center">
            <div className="max-w-2xl">
              {/* Civic Authority Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-[#12375B]/85 text-[#F4B942] border border-[#F4B942]/50 shadow-md backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#F4B942] animate-pulse" />
                <span>PULAU PINANG • LALUAN MUTIARA</span>
              </div>

              {/* Main Headline — Maximum Visibility with High-Contrast Text Shadow */}
              <h1
                className="font-extrabold tracking-tight leading-tight mb-3"
                style={{
                  fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                  color: '#FFFFFF',
                  textShadow: '0 2px 14px rgba(0, 0, 0, 0.9), 0 4px 30px rgba(0, 0, 0, 0.6)',
                  letterSpacing: '-0.02em',
                }}
              >
                LRT Mutiara Line
              </h1>

              {/* Subtitle — Luminous High-Contrast Cyan/Teal */}
              <p
                className="font-bold leading-tight mb-4"
                style={{
                  color: '#2DD4BF',
                  fontSize: 'clamp(1.2rem, 3.2vw, 1.95rem)',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.85)',
                }}
              >
                Enhancing Mobility, Enriching Communities
              </p>

              {/* Supporting Description */}
              <p
                className="text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-medium text-slate-100"
                style={{
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.85)',
                }}
              >
                Stay informed about construction progress, road closures and community updates.
                Share your concerns and track responses — all in one platform.
              </p>

              {/* Primary Call-to-Actions */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Link
                  to="/announcements"
                  id="hero-view-updates-cta"
                  className="inline-flex items-center gap-2 bg-[#F4B942] hover:bg-[#e5a82e] font-bold text-sm px-6 py-3 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  style={{ borderRadius: '24px', color: '#0F2C59' }}
                >
                  <span style={{ color: '#0F2C59' }}>View Construction Updates</span>
                  <ArrowRight size={15} style={{ color: '#0F2C59' }} />
                </Link>

                <Link
                  to="/road-closures"
                  id="hero-check-closures-cta"
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md font-bold text-sm px-6 py-3 border border-white/50 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  style={{ borderRadius: '24px', color: '#FFFFFF' }}
                >
                  <span style={{ color: '#FFFFFF' }}>Check Traffic Advisories</span>
                  <ArrowRight size={15} style={{ color: '#FFFFFF' }} />
                </Link>
              </div>

              {/* Scroll down indicator */}
              <div className="pt-1">
                <button
                  onClick={scrollToContent}
                  aria-label="Scroll to explore services"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white transition-colors group cursor-pointer"
                >
                  <span className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center group-hover:border-white group-hover:bg-white/15 transition-all">
                    <ChevronDown size={15} strokeWidth={2.5} className="group-hover:translate-y-0.5 transition-transform" />
                  </span>
                  <span style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>Scroll to Explore</span>
                </button>
              </div>
            </div>
          </div>

          {/* Academic disclaimer watermark */}
          <div
            className="absolute bottom-3 right-4 text-right text-[10px] text-white/70 pointer-events-none hidden sm:block"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
          >
            <p>Academic prototype — not an official MRT Corp website.</p>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. THREE QUICK ACCESS SERVICE CARDS
          ============================================================ */}
      <section ref={belowHeroRef} className="px-3 sm:px-5 py-6 scroll-mt-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Construction Updates */}
            <div
              className="bg-white p-6 flex items-start gap-4 hover:shadow-md transition-all duration-200"
              style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ borderRadius: '14px', backgroundColor: '#E0F2FE', color: '#0284C7' }}
              >
                <Newspaper size={22} />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="font-bold text-[#12375B] text-base mb-1.5">
                  Construction Updates
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  Stay informed about ongoing construction activities and important project announcements.
                </p>
                <Link
                  to="/announcements"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#16A6A1] hover:text-[#0f7a76] transition-colors mt-auto"
                >
                  <span>View Updates</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Card 2: Traffic Announcement */}
            <div
              className="bg-white p-6 flex items-start gap-4 hover:shadow-md transition-all duration-200"
              style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ borderRadius: '14px', backgroundColor: '#FEF3C7', color: '#D97706' }}
              >
                <Car size={22} />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="font-bold text-[#12375B] text-base mb-1.5">
                  Traffic Advisories
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  Check affected roads, temporary closures, diversions, and alternative routes.
                </p>
                <Link
                  to="/road-closures"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#16A6A1] hover:text-[#0f7a76] transition-colors mt-auto"
                >
                  <span>View Advisories</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Card 3: Community Feedback */}
            <div
              className="bg-white p-6 flex items-start gap-4 hover:shadow-md transition-all duration-200"
              style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ borderRadius: '14px', backgroundColor: '#D1FAE5', color: '#059669' }}
              >
                <MessageSquare size={22} />
              </div>
              <div className="flex flex-col flex-1">
                <h3 className="font-bold text-[#12375B] text-base mb-1.5">
                  Community Feedback
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  Submit concerns about construction activities and track progress on your reports.
                </p>
                <Link
                  to={isAuthenticated ? (isAdmin ? '/admin/feedback' : '/feedback/new') : '/feedback/new'}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#16A6A1] hover:text-[#0f7a76] transition-colors mt-auto"
                >
                  <span>Submit Feedback</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          INTERACTIVE LRT CONSTRUCTION & TRAFFIC INFORMATION MAP
          ============================================================ */}
      <LRTMapSection />

      {/* ============================================================
          4. CONSTRUCTION UPDATES & ANNOUNCEMENTS
          ============================================================ */}
      <section className="px-3 sm:px-5 py-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#16A6A1] block mb-1">
                LATEST UPDATES
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#12375B] tracking-tight">
                Construction Updates & Announcements
              </h2>
            </div>
            <Link
              to="/announcements"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#12375B] hover:text-[#16A6A1] transition-colors self-start sm:self-auto"
            >
              <span>View All Updates</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="py-16 flex justify-center">
              <LoadingSpinner message="Loading updates..." />
            </div>
          ) : error ? (
            <div
              className="p-8 text-center bg-white"
              style={{ borderRadius: '16px', border: '1px solid #fecaca' }}
            >
              <p className="text-xs text-red-600 mb-2">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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

      {/* ============================================================
          5. ROAD CLOSURES & TRAFFIC ADVISORIES
          ============================================================ */}
      <section
        className="px-3 sm:px-5 py-8"
        style={{ backgroundColor: '#f8fafc' }}
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#16A6A1] block mb-1">
                TRAFFIC INFORMATION
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#12375B] tracking-tight">
                Road Closures & Traffic Advisories
              </h2>
            </div>
            <Link
              to="/road-closures"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#12375B] hover:text-[#16A6A1] transition-colors self-start sm:self-auto"
            >
              <span>View All Advisories</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="py-16 flex justify-center">
              <LoadingSpinner message="Checking road closures..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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

      {/* ============================================================
          6. HOW FEEDBACK WORKS: 3 Simple Steps
          ============================================================ */}
      <section className="px-3 sm:px-5 py-10">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#16A6A1] block mb-1">
              HOW FEEDBACK WORKS
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#12375B] tracking-tight">
              Share Your Concerns in 3 Simple Steps
            </h2>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div
              className="bg-white p-6 flex flex-col items-center text-center"
              style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}
            >
              <div
                className="w-14 h-14 flex items-center justify-center mb-4 relative"
                style={{ borderRadius: '18px', backgroundColor: '#E0F2FE', color: '#0284C7' }}
              >
                <FileEdit size={24} />
                <span
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                  style={{ backgroundColor: '#16A6A1' }}
                >
                  1
                </span>
              </div>
              <h3 className="font-bold text-[#12375B] text-sm mb-2">Submit Your Feedback</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Tell us about construction-related issues affecting your neighbourhood.
              </p>
            </div>

            {/* Connector (desktop) */}
            <div className="hidden md:flex items-center justify-center absolute" style={{ display: 'none' }} />

            {/* Step 2 */}
            <div
              className="bg-white p-6 flex flex-col items-center text-center"
              style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}
            >
              <div
                className="w-14 h-14 flex items-center justify-center mb-4 relative"
                style={{ borderRadius: '18px', backgroundColor: '#CCFBF1', color: '#16A6A1' }}
              >
                <Search size={24} />
                <span
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                  style={{ backgroundColor: '#16A6A1' }}
                >
                  2
                </span>
              </div>
              <h3 className="font-bold text-[#12375B] text-sm mb-2">Track Your Complaint</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Log in to check the real-time status and updates on your submitted feedback.
              </p>
            </div>

            {/* Step 3 */}
            <div
              className="bg-white p-6 flex flex-col items-center text-center"
              style={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}
            >
              <div
                className="w-14 h-14 flex items-center justify-center mb-4 relative"
                style={{ borderRadius: '18px', backgroundColor: '#E0E7FF', color: '#4F46E5' }}
              >
                <MessageCircle size={24} />
                <span
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                  style={{ backgroundColor: '#16A6A1' }}
                >
                  3
                </span>
              </div>
              <h3 className="font-bold text-[#12375B] text-sm mb-2">Receive Official Response</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Get official responses and follow-up actions from the project team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          STRATEGIC TRANSIT ALIGNMENT BANNER
          ============================================================ */}
      <section className="px-3 sm:px-5 py-4">
        <div
          className="max-w-[1200px] mx-auto relative overflow-hidden"
          style={{ borderRadius: '24px', minHeight: '320px', maxHeight: '420px' }}
        >
          <img
            src="/images/penang_cityscape.jpg"
            alt="Aerial view of George Town Penang showing the city and Penang Strait"
            className="w-full h-full object-cover object-center"
            style={{ minHeight: '320px', maxHeight: '420px' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(11, 37, 69, 0.94) 0%, rgba(11, 37, 69, 0.78) 50%, rgba(11, 37, 69, 0.25) 100%)',
            }}
          />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 sm:px-12 max-w-xl">
              <span
                className="text-xs font-extrabold uppercase tracking-widest block mb-2"
                style={{ color: '#F4B942', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
              >
                STRATEGIC TRANSIT ALIGNMENT
              </span>
              <h2
                className="font-extrabold leading-tight mb-3"
                style={{
                  fontSize: 'clamp(1.5rem, 3.2vw, 2.35rem)',
                  color: '#FFFFFF',
                  textShadow: '0 2px 10px rgba(0,0,0,0.7)',
                }}
              >
                Connecting Penang's Communities
              </h2>
              <p
                className="text-sm sm:text-base leading-relaxed mb-6 max-w-md font-medium"
                style={{ color: '#F1F5F9', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
              >
                A transformative public transit network linking George Town, Bayan Lepas, and Butterworth across 20 stations and 29.5 km of dedicated track.
              </p>
              <div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-[#F4B942] hover:bg-[#e5a82e] font-bold text-sm px-6 py-2.5 transition-all shadow-md"
                  style={{ borderRadius: '24px', color: '#0F2C59' }}
                >
                  <span style={{ color: '#0F2C59' }}>Explore Alignment & Stations</span>
                  <ArrowRight size={15} style={{ color: '#0F2C59' }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. ABOUT THE PROJECT
          ============================================================ */}
      <section
        id="about-project"
        className="px-3 sm:px-5 py-10 scroll-mt-24"
        style={{ backgroundColor: '#f8fafc' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* Left: Rounded Image */}
            <div
              className="overflow-hidden"
              style={{ borderRadius: '24px', aspectRatio: '16/10', background: '#e2e8f0' }}
            >
              <img
                src="/images/construction_viaduct.jpg"
                alt="Penang LRT Mutiara Line Construction Progress"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Narrative & Stats */}
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#16A6A1] block mb-1">
                  ABOUT THE PROJECT
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#12375B] tracking-tight mb-3">
                  The Penang LRT Mutiara Line
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The Penang LRT Mutiara Line is a proposed light rail transit project that will
                  enhance connectivity across Penang, supporting sustainable mobility and economic
                  growth for the state. This platform keeps the community informed and engaged
                  throughout the construction journey.
                </p>
              </div>

              {/* 3 Key Stats */}
              <div className="grid grid-cols-3 gap-4 pt-1">
                <div
                  className="p-4 text-center"
                  style={{ borderRadius: '16px', background: '#EEF2F7', border: '1px solid #e2e8f0' }}
                >
                  <div className="text-[#16A6A1] mb-1.5 flex justify-center">
                    <Train size={22} />
                  </div>
                  <p className="font-extrabold text-sm text-[#12375B] leading-tight">20</p>
                  <p className="text-[11px] text-gray-500 leading-tight">Stations</p>
                </div>

                <div
                  className="p-4 text-center"
                  style={{ borderRadius: '16px', background: '#EEF2F7', border: '1px solid #e2e8f0' }}
                >
                  <div className="text-[#16A6A1] mb-1.5 flex justify-center">
                    <Route size={22} />
                  </div>
                  <p className="font-extrabold text-sm text-[#12375B] leading-tight">29.5 km</p>
                  <p className="text-[11px] text-gray-500 leading-tight">Alignment</p>
                </div>

                <div
                  className="p-4 text-center"
                  style={{ borderRadius: '16px', background: '#EEF2F7', border: '1px solid #e2e8f0' }}
                >
                  <div className="text-[#16A6A1] mb-1.5 flex justify-center">
                    <Users size={22} />
                  </div>
                  <p className="font-extrabold text-sm text-[#12375B] leading-tight">1.7M+</p>
                  <p className="text-[11px] text-gray-500 leading-tight">Residents</p>
                </div>
              </div>

              {/* CTA */}
              <div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#16A6A1] bg-white hover:bg-teal-50 transition-colors"
                  style={{ borderRadius: '24px', border: '2px solid #16A6A1' }}
                >
                  <span>Learn More About the Project</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          8. CALL TO ACTION BANNER
          ============================================================ */}
      <section className="px-3 sm:px-5 py-6 pb-10">
        <div
          className="max-w-[1200px] mx-auto overflow-hidden"
          style={{ borderRadius: '24px', background: 'linear-gradient(135deg, #12375B 0%, #1a4a5e 60%, #16A6A1 100%)' }}
        >
          <div className="px-8 sm:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Text */}
            <div className="text-left max-w-lg">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#F4B942] block mb-1">
                HAVE A CONCERN?
              </span>
              <h2
                className="text-xl sm:text-2xl font-extrabold tracking-tight mb-1"
                style={{ color: '#FFFFFF', textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}
              >
                Let Us Know About Construction Activities
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#F1F5F9' }}
              >
                Your feedback helps build a better, more connected Penang.
              </p>
            </div>

            {/* Right Button */}
            <div className="flex-shrink-0">
              <Link
                to={isAuthenticated ? (isAdmin ? '/admin/feedback' : '/feedback/new') : '/feedback/new'}
                className="inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 transition-all shadow-md hover:shadow-lg"
                id="cta-submit-feedback-button"
                style={{
                  backgroundColor: '#F4B942',
                  color: '#12375B',
                  borderRadius: '28px',
                }}
              >
                <MessageSquare size={16} />
                <span>Submit Feedback</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
