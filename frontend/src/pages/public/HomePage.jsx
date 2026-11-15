/**
 * pages/public/HomePage.jsx
 * Route: /
 *
 * Redesigned to match the official Laluan Mutiara website structure:
 *   1. Hero: large rounded-corner image container + headline + scroll indicator below
 *   2. Three Quick Access Service Cards
 *   4. Construction Updates & Announcements (3 editorial cards)
 *   5. Road Closures & Traffic Advisories
 *   6. Share Your Concerns in 3 Simple Steps
 *   7. About The Project (split image + key metrics)
 *   8. CTA Banner
 */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronRight,
  Train,
  Route,
  Users,
  FileEdit,
  Search,
  MessageCircle,
  ChevronDown,
  Clock,
} from 'lucide-react';
import { getAnnouncements } from '../../services/announcementService';
import { getRoadClosures } from '../../services/roadClosureService';
import AnnouncementCard from '../../components/common/AnnouncementCard';
import RoadClosureCard from '../../components/common/RoadClosureCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import LRTMapSection from '../../components/map/LRTMapSection';

export default function HomePage() {
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
          1. HERO: Civic Public Transit Announcement Header with LRT Photo & Overlay Title
          ============================================================ */}
      <section className="px-3 sm:px-5 pt-3 pb-2">
        <div
          className="relative w-full overflow-hidden border border-gray-200 flex items-center"
          style={{ borderRadius: '12px', minHeight: '440px', maxHeight: '560px' }}
        >
          {/* Hero Image */}
          <img
            src="/images/hero_lrt.png"
            alt="Penang LRT Mutiara Line elevated rapid transit train"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Contrast scrim & gradient overlay for optimal legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(18, 55, 91, 0.94) 0%, rgba(18, 55, 91, 0.82) 48%, rgba(18, 55, 91, 0.4) 100%)',
            }}
          />

          {/* Hero Content Overlay: Aligned to max-w-[1200px] mx-auto matching Navbar */}
          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-16 text-left">
            <div className="max-w-2xl">
              <h1
                className="font-extrabold tracking-tight leading-tight mb-2 text-white"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
              >
                Penang LRT Mutiara Line
              </h1>
              <p
                className="font-semibold leading-snug mb-3 text-[#16A6A1]"
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)' }}
              >
                Community Information & Public Feedback Portal
              </p>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-6 max-w-xl">
                Official community liaison portal for MRT Corp's 29.67 km Penang LRT Mutiara Line project. Access construction notices, traffic advisories, and submit inquiries directly to project liaison teams.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/announcements"
                  id="hero-view-updates-cta"
                  className="inline-flex items-center gap-2 bg-[#16A6A1] hover:bg-[#128a86] text-white font-semibold text-sm px-5 py-2.5 rounded-md transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span>View Construction Notices</span>
                </Link>
                <Link
                  to="/road-closures"
                  id="hero-check-closures-cta"
                  className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-[#12375B] font-semibold text-sm px-5 py-2.5 rounded-md transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#16A6A1]"
                >
                  <span>Traffic Advisories & Detours</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          INTERACTIVE LRT CONSTRUCTION & TRAFFIC INFORMATION MAP
          ============================================================ */}
      <div ref={belowHeroRef}>
        <LRTMapSection />
      </div>

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
          6. ABOUT THE INFRASTRUCTURE (Validated MRT Corp Data)
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
                  PROJECT SCOPE &amp; SPECIFICATIONS
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#12375B] tracking-tight mb-2">
                  Penang LRT Mutiara Line Overview
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Developed by <strong>MRT Corp</strong> under the Penang Transport Master Plan (PTMP), the Mutiara Line is Penang's first urban light rail transit system. Spanning <strong>29.67 km</strong> across <strong>22 passenger stations</strong>, the alignment connects Silicon Island, Bayan Lepas, and George Town (KOMTAR), extending across the Penang Strait to Penang Sentral (Butterworth) via a <strong>3.05 km marine viaduct</strong>.
                </p>
              </div>

              {/* Transit Parameters (Validated Official Specifications) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="p-3 text-center bg-white border border-gray-200 rounded-md">
                  <div className="text-[#16A6A1] mb-1 flex justify-center">
                    <Route size={18} />
                  </div>
                  <p className="font-extrabold text-sm text-[#12375B]">29.67 km</p>
                  <p className="text-[10px] text-gray-600 font-medium">Total Alignment</p>
                </div>

                <div className="p-3 text-center bg-white border border-gray-200 rounded-md">
                  <div className="text-[#16A6A1] mb-1 flex justify-center">
                    <Train size={18} />
                  </div>
                  <p className="font-extrabold text-sm text-[#12375B]">22</p>
                  <p className="text-[10px] text-gray-600 font-medium">Stations</p>
                </div>

                <div className="p-3 text-center bg-white border border-gray-200 rounded-md">
                  <div className="text-[#16A6A1] mb-1 flex justify-center">
                    <Users size={18} />
                  </div>
                  <p className="font-extrabold text-sm text-[#12375B]">405 Pax</p>
                  <p className="text-[10px] text-gray-600 font-medium">Min. Train Capacity</p>
                </div>

                <div className="p-3 text-center bg-white border border-gray-200 rounded-md">
                  <div className="text-[#16A6A1] mb-1 flex justify-center">
                    <Clock size={18} />
                  </div>
                  <p className="font-extrabold text-sm text-[#12375B]">4 Min</p>
                  <p className="text-[10px] text-gray-600 font-medium">Peak Headway</p>
                </div>
              </div>

              {/* Core Advantages List */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A6A1] mt-1.5 flex-shrink-0" />
                  <span><strong>Cross-Strait Fixed Link:</strong> 3.05 km dedicated marine rail viaduct linking George Town (Macallum) directly to Penang Sentral.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A6A1] mt-1.5 flex-shrink-0" />
                  <span><strong>Multimodal Connectivity:</strong> Integrated interchanges at Penang Airport (PIA), Sungai Nibong Bus Terminal, KOMTAR, and Penang Sentral.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A6A1] mt-1.5 flex-shrink-0" />
                  <span><strong>Traffic Decongestion:</strong> Reliable transit bypassing peak-hour bottlenecks along Tun Dr Lim Chong Eu Expressway and Jalan Sultan Azlan Shah.</span>
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

    </div>
  );
}
