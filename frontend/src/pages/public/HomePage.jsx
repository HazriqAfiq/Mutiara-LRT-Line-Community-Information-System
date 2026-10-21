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
          1. HERO: Civic Public Transit Announcement Header
          ============================================================ */}
      <section className="px-4 sm:px-6 pt-3 pb-0">
        <div
          className="relative w-full overflow-hidden border border-gray-200"
          style={{ borderRadius: '12px', minHeight: '380px', maxHeight: '500px' }}
        >
          {/* Hero Image */}
          <img
            src="/images/hero_community.jpg"
            alt="Penang LRT Mutiara Line Community, residents of George Town"
            className="w-full h-full object-cover object-center"
            style={{ minHeight: '380px', maxHeight: '500px' }}
          />

          {/* Contrast scrim */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(18, 55, 91, 0.25) 0%, rgba(18, 55, 91, 0.4) 100%)' }}
          />
        </div>
      </section>

      {/* ============================================================
          HEADLINE SECTION: Civic transit identity
          ============================================================ */}
      <section
        className="px-4 sm:px-6 py-8"
        style={{ backgroundColor: '#F5F7FA' }}
      >
        <div className="max-w-[850px] mx-auto text-center">
          <h1
            className="font-extrabold tracking-tight leading-tight mb-2"
            style={{ color: '#12375B', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
          >
            Penang LRT Mutiara Line
          </h1>
          <p
            className="font-bold leading-tight mb-4"
            style={{ color: '#16A6A1', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}
          >
            Community Information and Public Feedback Portal
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-xl mx-auto mb-6">
            Official public notices, scheduled road closures, and neighbourhood traffic advisories.
            Submit inquiries directly to the project team and track resolution progress.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/announcements"
              id="hero-view-updates-cta"
              className="inline-flex items-center gap-2 bg-[#12375B] hover:bg-[#0c2640] text-white font-semibold text-sm px-5 py-2.5 rounded-md transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#16A6A1]"
            >
              <span>View Construction Notices</span>
            </Link>
            <Link
              to="/road-closures"
              id="hero-check-closures-cta"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#12375B] border border-gray-300 font-semibold text-sm px-5 py-2.5 rounded-md transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#16A6A1]"
            >
              <span>Traffic Advisories & Detours</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. PROJECT BANNER: Transit Corridor Overview
          ============================================================ */}
      <section ref={belowHeroRef} className="px-4 sm:px-6 py-4">
        <div
          className="relative w-full overflow-hidden border border-gray-200"
          style={{ borderRadius: '12px', minHeight: '320px', maxHeight: '420px' }}
        >
          <img
            src="/images/penang_cityscape.jpg"
            alt="Aerial view of George Town Penang showing the alignment corridor"
            className="w-full h-full object-cover object-center"
            style={{ minHeight: '320px', maxHeight: '420px' }}
          />
          {/* Contrast scrim for clear text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(18, 55, 91, 0.94) 0%, rgba(18, 55, 91, 0.82) 50%, rgba(18, 55, 91, 0.35) 100%)',
            }}
          />
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 sm:px-12 max-w-xl">
              <span
                className="text-xs font-bold uppercase tracking-wider block mb-2 text-[#F4B942]"
              >
                PUBLIC INFRASTRUCTURE
              </span>
              <h2
                className="font-extrabold leading-tight mb-3 text-white"
                style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.25rem)' }}
              >
                Connecting Penang Communities
              </h2>
              <p
                className="text-sm sm:text-base leading-relaxed mb-6 max-w-md text-gray-100"
              >
                Linking George Town, Bayan Lepas, and Butterworth via Penang Sentral.
                Structured notifications ensure daily commuters and residents navigate construction smoothly.
              </p>
              <div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-[#F4B942] hover:bg-[#d9992a] font-bold text-sm px-5 py-2.5 rounded-md text-[#12375B] transition-colors shadow-sm"
                >
                  <span>Explore Route Alignment</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. KEY PUBLIC SERVICES
          ============================================================ */}
      <section className="px-4 sm:px-6 py-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Service 1: Construction Notices */}
            <div
              className="bg-white p-6 flex flex-col justify-between border border-gray-200 rounded-lg hover:border-gray-300 transition-colors shadow-sm"
            >
              <div>
                <div className="w-10 h-10 flex items-center justify-center rounded bg-[#E0F2FE] text-[#0284C7] mb-4">
                  <Newspaper size={20} />
                </div>
                <h3 className="font-bold text-[#12375B] text-base mb-2">
                  Construction Updates
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  Regular progress reports on station piling, viaduct segmental launch, and safety procedures.
                </p>
              </div>
              <Link
                to="/announcements"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A6A1] hover:text-[#0f7a76] focus:outline-none focus:underline"
              >
                <span>Browse Announcements</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {/* Service 2: Traffic Detours */}
            <div
              className="bg-white p-6 flex flex-col justify-between border border-gray-200 rounded-lg hover:border-gray-300 transition-colors shadow-sm"
            >
              <div>
                <div className="w-10 h-10 flex items-center justify-center rounded bg-[#FEF3C7] text-[#D97706] mb-4">
                  <Car size={20} />
                </div>
                <h3 className="font-bold text-[#12375B] text-base mb-2">
                  Road Closures & Detours
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  Scheduled lane closures, night-time diversions, and alternative arterial routes across Penang.
                </p>
              </div>
              <Link
                to="/road-closures"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A6A1] hover:text-[#0f7a76] focus:outline-none focus:underline"
              >
                <span>View Traffic Map & Notices</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {/* Service 3: Public Feedback */}
            <div
              className="bg-white p-6 flex flex-col justify-between border border-gray-200 rounded-lg hover:border-gray-300 transition-colors shadow-sm"
            >
              <div>
                <div className="w-10 h-10 flex items-center justify-center rounded bg-[#D1FAE5] text-[#059669] mb-4">
                  <MessageSquare size={20} />
                </div>
                <h3 className="font-bold text-[#12375B] text-base mb-2">
                  Public Feedback System
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  Log concerns regarding noise, dust, vibration, or accessibility directly to project liaison officers.
                </p>
              </div>
              <Link
                to={isAuthenticated ? (isAdmin ? '/admin/feedback' : '/feedback/new') : '/feedback/new'}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A6A1] hover:text-[#0f7a76] focus:outline-none focus:underline"
              >
                <span>Submit Inquiries or Complaints</span>
                <ChevronRight size={14} />
              </Link>
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
      <section className="px-4 sm:px-6 py-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-2 border-b border-gray-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1] block mb-1">
                PUBLIC NOTICES
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#12375B] tracking-tight">
                Latest Construction Announcements
              </h2>
            </div>
            <Link
              to="/announcements"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#12375B] hover:text-[#16A6A1] transition-colors self-start sm:self-auto"
            >
              <span>View All Notices</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="py-16 flex justify-center">
              <LoadingSpinner message="Loading updates..." />
            </div>
          ) : error ? (
            <div className="p-6 text-center bg-white border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 mb-1">{error}</p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="p-8 text-center bg-white border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-500">No announcements published at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        className="px-4 sm:px-6 py-8"
        style={{ backgroundColor: '#F5F7FA' }}
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-2 border-b border-gray-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1] block mb-1">
                TRAFFIC MANAGEMENT
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#12375B] tracking-tight">
                Scheduled Road Closures & Diversions
              </h2>
            </div>
            <Link
              to="/road-closures"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#12375B] hover:text-[#16A6A1] transition-colors self-start sm:self-auto"
            >
              <span>View All Advisories</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="py-16 flex justify-center">
              <LoadingSpinner message="Checking road closures..." />
            </div>
          ) : closures.length === 0 ? (
            <div className="p-8 text-center bg-white border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-500">No active or scheduled road closures reported.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          6. COMMUNITY ENGAGEMENT PROTOCOL
          ============================================================ */}
      <section className="px-4 sm:px-6 py-10 bg-white border-y border-gray-200">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1] block mb-1">
              COMMUNITY GRIEVANCE MECHANISM
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#12375B] tracking-tight">
              Community Engagement & Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Every complaint is logged, assigned to an on-site liaison engineer, and resolved under transparent timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="bg-[#F5F7FA] p-6 rounded-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center mb-3 rounded-md bg-[#E0F2FE] text-[#0284C7] font-bold text-lg">
                1
              </div>
              <h3 className="font-bold text-[#12375B] text-sm mb-1.5">Lodge Inquiry</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Provide location, category (e.g. noise, traffic detour), and description of construction concerns.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F5F7FA] p-6 rounded-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center mb-3 rounded-md bg-[#CCFBF1] text-[#0f7a76] font-bold text-lg">
                2
              </div>
              <h3 className="font-bold text-[#12375B] text-sm mb-1.5">Site Investigation</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Project engineers inspect the site and document mitigation steps directly in the resolution log.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F5F7FA] p-6 rounded-lg border border-gray-200 flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center mb-3 rounded-md bg-[#E0E7FF] text-[#4F46E5] font-bold text-lg">
                3
              </div>
              <h3 className="font-bold text-[#12375B] text-sm mb-1.5">Verified Resolution</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Status is updated to Resolved once mitigation measures are verified by municipal authorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. ABOUT THE INFRASTRUCTURE
          ============================================================ */}
      <section
        id="about-project"
        className="px-4 sm:px-6 py-10 scroll-mt-24"
        style={{ backgroundColor: '#F5F7FA' }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Visual Container */}
            <div
              className="overflow-hidden border border-gray-200 rounded-lg"
              style={{ aspectRatio: '16/10', background: '#e2e8f0' }}
            >
              <img
                src="/images/construction_viaduct.jpg"
                alt="Penang LRT Mutiara Line viaduct construction"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Narrative & Key Facts */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1] block mb-1">
                  PROJECT SCOPE
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#12375B] tracking-tight mb-2">
                  Penang LRT Mutiara Line Overview
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  The Mutiara Line represents Penang's first urban light rail transit system, spanning from
                  Silicon Island through the Bayan Lepas industrial corridor to George Town (KOMTAR) and connecting
                  to Penang Sentral (Butterworth) via a sea-crossing viaduct.
                </p>
              </div>

              {/* Transit Parameters (Real Planned Specifications) */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 text-center bg-white border border-gray-200 rounded-md">
                  <div className="text-[#16A6A1] mb-1 flex justify-center">
                    <Train size={20} />
                  </div>
                  <p className="font-extrabold text-sm text-[#12375B]">29</p>
                  <p className="text-[11px] text-gray-600">Stations</p>
                </div>

                <div className="p-3 text-center bg-white border border-gray-200 rounded-md">
                  <div className="text-[#16A6A1] mb-1 flex justify-center">
                    <Route size={20} />
                  </div>
                  <p className="font-extrabold text-sm text-[#12375B]">29 km</p>
                  <p className="text-[11px] text-gray-600">Alignment</p>
                </div>

                <div className="p-3 text-center bg-white border border-gray-200 rounded-md">
                  <div className="text-[#16A6A1] mb-1 flex justify-center">
                    <Users size={20} />
                  </div>
                  <p className="font-extrabold text-sm text-[#12375B]">Penang</p>
                  <p className="text-[11px] text-gray-600">Island & Mainland</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#12375B] bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>Detailed Station Alignment and Technical Specs</span>
                  <ChevronRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          8. CALL TO ACTION BANNER: Civic Engagement
          ============================================================ */}
      <section className="px-4 sm:px-6 py-8">
        <div
          className="max-w-[1200px] mx-auto rounded-lg border border-navy/20"
          style={{ backgroundColor: '#12375B' }}
        >
          <div className="px-6 sm:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left max-w-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F4B942] block mb-1">
                PUBLIC INQUIRIES & COMPLAINTS
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
                Have an Issue Regarding Construction in Your Area?
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                Submit an inquiry or feedback ticket. The project coordination desk reviews submissions daily.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link
                to={isAuthenticated ? (isAdmin ? '/admin/feedback' : '/feedback/new') : '/feedback/new'}
                className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-md bg-[#F4B942] hover:bg-[#d9992a] text-[#12375B] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
                id="cta-submit-feedback-button"
              >
                <MessageSquare size={16} />
                <span>Submit Feedback Ticket</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
