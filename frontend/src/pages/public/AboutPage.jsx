/**
 * pages/public/AboutPage.jsx
 * Route: /about
 *
 * Concise, high-signal project overview for Penang LRT Mutiara Line.
 * Focuses on core facts, vital transit hubs, and station alignment from MRT Corp.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Route,
  MapPin,
  Anchor,
  Clock,
  ChevronRight,
  ArrowRight,
  Train,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

export default function AboutPage() {
  const [activeZone, setActiveZone] = useState('sector-all');

  // Key Technical Metrics (Core Facts from MRT Corp)
  const KEY_METRICS = [
    {
      icon: Route,
      value: '29.67 km',
      label: 'Route Length',
      detail: '23.67 km Island alignment + 6.0 km Cross-Strait link.',
    },
    {
      icon: MapPin,
      value: '22 Stations',
      label: 'Passenger Stations',
      detail: '20 on Penang Island and Penang Sentral mainland hub.',
    },
    {
      icon: Anchor,
      value: '3.05 km',
      label: 'Marine Viaduct',
      detail: 'Dedicated rail sea bridge linking Macallum to Butterworth.',
    },
    {
      icon: Clock,
      value: '2031',
      label: 'Target Operations',
      detail: 'Targeted full commercial passenger opening.',
    },
  ];

  // 4 Major Multimodal Interchanges
  const INTERCHANGES = [
    {
      title: 'KOMTAR Terminal',
      location: 'George Town',
      role: 'Island Central Hub',
      detail: 'Direct transfer to Rapid Penang main bus network and civic administrative centre.',
    },
    {
      title: 'Penang Sentral',
      location: 'Butterworth',
      role: 'Mainland Gateway',
      detail: 'Integrated transfer to KTM ETS, KTM Komuter, interstate express buses, and Penang Ferry.',
    },
    {
      title: 'Penang Int. Airport (PIA)',
      location: 'Bayan Lepas',
      role: 'Airport Connection',
      detail: 'Direct covered skybridge access into departure and arrival terminal concourses.',
    },
    {
      title: 'Sungai Nibong Terminal',
      location: 'Sungai Nibong',
      role: 'Coach Interchange',
      detail: 'Direct interchange with long-distance express buses serving Peninsular Malaysia.',
    },
  ];

  // 22 Stations categorized into 5 focused sectors
  const SECTORS = [
    {
      id: 'sector-all',
      shortTitle: 'All 22 Stations',
      title: 'Full Alignment: Silicon Island to Penang Sentral (29.67 km)',
      stations: [
        { no: 1, code: 'S01', name: 'Pulau Silikon (PSR-A)', tag: 'Main Depot & Southern Terminal' },
        { no: 2, code: 'S02', name: 'Permatang Damar Laut', tag: 'Elevated Community Station' },
        { no: 3, code: 'S03', name: 'Penang International Airport (PIA)', tag: 'Direct Airport Skybridge' },
        { no: 4, code: 'S04', name: 'Sungai Tiram', tag: 'Elevated Urban Station' },
        { no: 5, code: 'S05', name: 'FIZ South', tag: 'Industrial Corridor' },
        { no: 6, code: 'S06', name: 'FIZ North', tag: 'High-Tech Zone' },
        { no: 7, code: 'S07', name: 'Jalan Tengah', tag: 'Residential Hub' },
        { no: 8, code: 'S08', name: 'SPICE', tag: 'Convention Centre' },
        { no: 9, code: 'S09', name: 'Bukit Jambul', tag: 'Commercial Precinct' },
        { no: 10, code: 'S10', name: 'Sungai Nibong', tag: 'Interstate Coach Terminal' },
        { no: 11, code: 'S11', name: 'Sungai Dua', tag: 'Township Station' },
        { no: 12, code: 'S12', name: 'Batu Uban', tag: 'Park & Ride' },
        { no: 13, code: 'S13', name: 'Jalan Universiti (USM)', tag: 'USM Campus Gateway' },
        { no: 14, code: 'S14', name: 'Gelugor', tag: 'Suburban Station' },
        { no: 15, code: 'S15', name: 'The Light / Waterfront', tag: 'Waterfront Precinct' },
        { no: 16, code: 'S16', name: 'East Jelutong', tag: 'Elevated Station' },
        { no: 17, code: 'S17', name: 'Sungai Pinang', tag: 'Urban Station' },
        { no: 18, code: 'S18', name: 'Bandar Sri Pinang', tag: 'Commercial Hub' },
        { no: 19, code: 'S19', name: 'Macallum', tag: 'Cross-Strait Split Junction' },
        { no: 20, code: 'S20', name: 'KOMTAR', tag: 'Central Island Terminal' },
        { no: 21, code: 'S21', name: 'Penang Sentral (Butterworth)', tag: 'Mainland Intermodal Hub' },
        { no: 22, code: 'S22', name: 'Jalan Bagan Luar (Provisional)', tag: 'Future Mainland Station' },
      ],
    },
    {
      id: 'sector-south',
      shortTitle: 'South & Airport (1-4)',
      title: 'Sector 1: Silicon Island to Penang Airport',
      stations: [
        { no: 1, code: 'S01', name: 'Pulau Silikon (PSR-A)', tag: 'Main Depot & Southern Terminal' },
        { no: 2, code: 'S02', name: 'Permatang Damar Laut', tag: 'Elevated Community Station' },
        { no: 3, code: 'S03', name: 'Penang International Airport (PIA)', tag: 'Direct Airport Skybridge' },
        { no: 4, code: 'S04', name: 'Sungai Tiram', tag: 'Elevated Urban Station' },
      ],
    },
    {
      id: 'sector-industrial',
      shortTitle: 'FIZ & SPICE (5-10)',
      title: 'Sector 2: Bayan Lepas Industrial Corridor',
      stations: [
        { no: 5, code: 'S05', name: 'FIZ South', tag: 'Industrial Corridor' },
        { no: 6, code: 'S06', name: 'FIZ North', tag: 'High-Tech Zone' },
        { no: 7, code: 'S07', name: 'Jalan Tengah', tag: 'Residential Hub' },
        { no: 8, code: 'S08', name: 'SPICE', tag: 'Convention Centre' },
        { no: 9, code: 'S09', name: 'Bukit Jambul', tag: 'Commercial Precinct' },
        { no: 10, code: 'S10', name: 'Sungai Nibong', tag: 'Interstate Coach Terminal' },
      ],
    },
    {
      id: 'sector-university',
      shortTitle: 'USM & Gelugor (11-14)',
      title: 'Sector 3: Education & Residential',
      stations: [
        { no: 11, code: 'S11', name: 'Sungai Dua', tag: 'Township Station' },
        { no: 12, code: 'S12', name: 'Batu Uban', tag: 'Park & Ride' },
        { no: 13, code: 'S13', name: 'Jalan Universiti (USM)', tag: 'USM Campus Gateway' },
        { no: 14, code: 'S14', name: 'Gelugor', tag: 'Suburban Station' },
      ],
    },
    {
      id: 'sector-georgetown',
      shortTitle: 'George Town & KOMTAR (15-20)',
      title: 'Sector 4: George Town Urban Core',
      stations: [
        { no: 15, code: 'S15', name: 'The Light / Waterfront', tag: 'Waterfront Precinct' },
        { no: 16, code: 'S16', name: 'East Jelutong', tag: 'Elevated Station' },
        { no: 17, code: 'S17', name: 'Sungai Pinang', tag: 'Urban Station' },
        { no: 18, code: 'S18', name: 'Bandar Sri Pinang', tag: 'Commercial Hub' },
        { no: 19, code: 'S19', name: 'Macallum', tag: 'Cross-Strait Split Junction' },
        { no: 20, code: 'S20', name: 'KOMTAR', tag: 'Central Island Terminal' },
      ],
    },
    {
      id: 'sector-crosschannel',
      shortTitle: 'Cross-Strait (19, 21, 22)',
      title: 'Sector 5: Cross-Strait Sea Viaduct to Butterworth',
      stations: [
        { no: 19, code: 'S19', name: 'Macallum (Island)', tag: 'Marine Viaduct Approach' },
        { no: 21, code: 'S21', name: 'Penang Sentral (Mainland)', tag: 'Mainland Intermodal Hub' },
        { no: 22, code: 'S22', name: 'Jalan Bagan Luar (Provisional)', tag: 'Future Mainland Station' },
      ],
    },
  ];

  const currentSector = SECTORS.find((s) => s.id === activeZone) || SECTORS[0];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* ── Page Header ─────────────────────────────────────────── */}
      <PageHeader
        title="About LRT Mutiara Line"
        subtitle="Key project facts, alignment route, and major transit hubs for Penang's first light rail transit system."
      >
        <div className="flex items-center gap-2 text-xs text-white/80">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={13} className="text-[#F4B942]" />
          <span className="text-[#F4B942] font-semibold">About Project</span>
        </div>
      </PageHeader>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* ============================================================
            1. HERO OVERVIEW BANNER
            ============================================================ */}
        <div
          className="relative rounded-lg overflow-hidden border border-gray-200"
          style={{ minHeight: '260px', maxHeight: '320px' }}
        >
          <img
            src="/images/hero_lrt.png"
            alt="Penang LRT Mutiara Line Elevated Train Simulation"
            className="w-full h-full object-cover object-center"
            style={{ minHeight: '260px', maxHeight: '320px' }}
          />
          <div
            className="absolute inset-0 flex flex-col justify-end p-6"
            style={{
              background:
                'linear-gradient(180deg, rgba(18,55,91,0.2) 0%, rgba(18,55,91,0.85) 60%, rgba(18,55,91,0.98) 100%)',
            }}
          >
            <div className="max-w-2xl space-y-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F4B942]">
                <Train size={13} />
                Penang Transport Master Plan
              </span>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight text-white">
                Penang LRT Mutiara Line
              </h1>
              <p className="text-xs sm:text-sm leading-relaxed text-gray-200">
                Developed by <strong>MRT Corp</strong>, the <strong>29.67 km</strong> Mutiara Line connects <strong>Silicon Island</strong>, <strong>Bayan Lepas</strong>, <strong>George Town (KOMTAR)</strong>, and <strong>Penang Sentral</strong> across <strong>22 passenger stations</strong>, including a <strong>3.05 km marine viaduct</strong> across the Penang Strait.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================
            2. KEY FACTS AT A GLANCE
            ============================================================ */}
        <section className="space-y-3">
          <h2 className="text-base sm:text-lg font-extrabold text-[#12375B] tracking-tight">
            Key Project Facts
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {KEY_METRICS.map((metric) => {
              const IconComp = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="bg-white rounded-lg p-4 border border-gray-200 shadow-xs flex flex-col justify-between"
                >
                  <div className="p-2 w-fit rounded-md bg-teal-50 text-[#16A6A1] mb-2">
                    <IconComp size={18} />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-extrabold text-[#12375B] tracking-tight">
                      {metric.value}
                    </p>
                    <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wide mt-0.5">
                      {metric.label}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                      {metric.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            3. MAJOR MULTIMODAL INTERCHANGES
            ============================================================ */}
        <section className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm space-y-3">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-[#12375B] tracking-tight">
              Major Multimodal Interchanges
            </h2>
            <p className="text-xs text-gray-600 mt-0.5">
              Strategic transit hubs connecting the LRT line with rail, bus, ferry, and air networks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            {INTERCHANGES.map((item) => (
              <div
                key={item.title}
                className="p-3.5 rounded-lg bg-[#F5F7FA] border border-gray-200 space-y-1"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f7a76] block">
                  {item.location}
                </span>
                <h3 className="font-bold text-xs sm:text-sm text-[#12375B]">
                  {item.title}
                </h3>
                <p className="text-[11px] text-gray-600 leading-snug">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            4. ROUTE ALIGNMENT & 22 STATIONS
            ============================================================ */}
        <section className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-[#12375B] tracking-tight">
                Station Alignment Directory (22 Stations)
              </h2>
              <p className="text-xs text-gray-600 mt-0.5">
                Full station sequence along the 29.67 km alignment from south to north.
              </p>
            </div>
            <span className="text-xs font-bold text-[#16A6A1] w-fit">
              {currentSector.stations.length} Stations in View
            </span>
          </div>

          {/* Sector Filter Tabs */}
          <div role="tablist" className="flex flex-wrap gap-1.5 border-b border-gray-200 pb-2.5">
            {SECTORS.map((sector) => (
              <button
                key={sector.id}
                role="tab"
                aria-selected={activeZone === sector.id}
                onClick={() => setActiveZone(sector.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                  activeZone === sector.id
                    ? 'bg-[#12375B] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {sector.shortTitle}
              </button>
            ))}
          </div>

          {/* Station Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
            {currentSector.stations.map((stn) => (
              <div
                key={stn.no}
                className="flex items-center gap-3 p-3 bg-[#F5F7FA] rounded-md border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <span className="w-6 h-6 rounded bg-[#16A6A1] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {stn.no}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-200/80 px-1 py-0.2 rounded flex-shrink-0">
                      {stn.code}
                    </span>
                    <h4 className="font-bold text-xs text-[#12375B] truncate">
                      {stn.name}
                    </h4>
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium block truncate mt-0.5">
                    {stn.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            5. CIVIC ENGAGEMENT BANNER
            ============================================================ */}
        <section
          className="rounded-lg p-5 sm:p-6 text-white relative overflow-hidden shadow-sm"
          style={{ backgroundColor: '#12375B' }}
        >
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                Community Feedback &amp; Inquiries
              </h2>
              <p className="text-xs text-gray-200 leading-relaxed">
                Have questions or feedback regarding construction, road closures, or station access? Lodge an inquiry directly to the liaison team.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
              <Link
                to="/feedback/new"
                className="text-xs font-bold px-4 py-2 rounded-md inline-flex items-center gap-1.5 bg-[#F4B942] hover:bg-[#d9992a] text-[#12375B] transition-colors shadow-xs"
              >
                <span>Submit Feedback</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                to="/road-closures"
                className="text-xs font-semibold px-4 py-2 rounded-md inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 transition-colors"
              >
                <span>Traffic Advisories</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
