/**
 * pages/public/AboutPage.jsx
 * Route: /about
 *
 * Streamlined, high-signal About Project page for Penang LRT Mutiara Line.
 * Focuses strictly on core project facts and specifications from MRT Corp
 * (https://laluanmutiara.mymrt.com.my/ms/lrt-mutiara-line/).
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Train,
  MapPin,
  Clock,
  Building,
  Plane,
  ArrowRight,
  Compass,
  CheckCircle2,
  HardHat,
  ChevronRight,
  Anchor,
  Car,
  ShieldCheck,
  Route,
  Layers,
  Users,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

export default function AboutPage() {
  const [activeZone, setActiveZone] = useState('sector-all');

  // Key Technical Metrics (Validated MRT Corp Specifications)
  const KEY_METRICS = [
    {
      icon: Route,
      value: '29.67 km',
      label: 'Route Length',
      detail: '23.67 km Segment 1 (Island) + 6.0 km Segment 2 (Cross-Strait).',
    },
    {
      icon: MapPin,
      value: '22 Stations',
      label: 'Passenger Stations',
      detail: '20 island stations, Penang Sentral interchange, and provisional stations.',
    },
    {
      icon: Anchor,
      value: '3.05 km',
      label: 'Marine Sea Viaduct',
      detail: 'Dedicated elevated rail bridge across Penang Strait linking Macallum to Penang Sentral.',
    },
    {
      icon: Users,
      value: '405 Pax',
      label: 'Min. Train Capacity',
      detail: 'Modular driverless trains with 4-min initial peak headway (expandable to 2 min).',
    },
    {
      icon: Building,
      value: 'Silicon Island',
      label: 'Main Depot & OCC',
      detail: 'Primary operations control center & heavy maintenance; secondary stabling at Sg Nibong.',
    },
    {
      icon: Clock,
      value: '2031',
      label: 'Target Operations',
      detail: 'Targeted full commercial passenger opening across all gazetted segments.',
    },
  ];

  // Official MRT Corp Project Contract & Alignment Segments
  const PROJECT_SEGMENTS = [
    {
      segment: 'Segment 1',
      name: 'Island Civil Works & Stations',
      extent: 'Pulau Silikon (PSR-A) – Komtar',
      length: '23.67 km',
      stationsCount: '20 Stations',
      type: 'Fully Elevated Viaduct',
      description:
        'Traverses southern Penang from Silicon Island through Bayan Lepas Free Industrial Zone, Penang International Airport, and suburban residential belts to George Town (Komtar). Houses the main OCC and depot facilities at Silicon Island.',
    },
    {
      segment: 'Segment 2',
      name: 'Cross-Strait Civil Works & Sea Crossing',
      extent: 'Macallum – Penang Sentral (Butterworth)',
      length: '6.0 km',
      stationsCount: '2 Stations',
      type: 'Marine Sea Viaduct & Mainland Link',
      description:
        'Features a landmark 3.05 km elevated marine viaduct across the Penang Strait connecting Macallum directly to Penang Sentral. Includes a 0.79 km connecting spur linking Macallum into Komtar terminal.',
    },
    {
      segment: 'Segment 3',
      name: 'Turnkey Systems & Rolling Stock',
      extent: 'Systemwide Integration',
      length: '29.67 km System',
      stationsCount: 'Entire Alignment',
      type: 'Driverless Automated Rail',
      description:
        'Encompasses high-frequency automated trainsets (minimum 405 passenger capacity), CBTC signaling, telecommunications, traction power supply, trackwork, and supervisory control systems.',
    },
  ];

  // 22 Stations categorized into 5 focused sectors
  const SECTORS = [
    {
      id: 'sector-all',
      shortTitle: 'All 22 Stations',
      title: 'Full Alignment: Silicon Island to Penang Sentral (29.67 km)',
      stations: [
        { no: 1, code: 'S01', name: 'Pulau Silikon (PSR-A)', tag: 'Main Depot & Southern Terminal (Provisional)' },
        { no: 2, code: 'S02', name: 'Permatang Damar Laut', tag: 'Elevated Community Station' },
        { no: 3, code: 'S03', name: 'Penang International Airport (PIA / LTAPP)', tag: 'Direct Airport Concourse Skybridge' },
        { no: 4, code: 'S04', name: 'Sungai Tiram', tag: 'Elevated Urban Station' },
        { no: 5, code: 'S05', name: 'FIZ South', tag: 'Industrial Employment Precinct' },
        { no: 6, code: 'S06', name: 'FIZ North', tag: 'High-Tech Semiconductor Zone' },
        { no: 7, code: 'S07', name: 'Jalan Tengah', tag: 'Suburban Residential Hub' },
        { no: 8, code: 'S08', name: 'SPICE', tag: 'Convention & Exhibition Centre Skywalk' },
        { no: 9, code: 'S09', name: 'Bukit Jambul', tag: 'Commercial & Retail District' },
        { no: 10, code: 'S10', name: 'Sungai Nibong', tag: 'Interstate Coach Terminal & Secondary Stabling' },
        { no: 11, code: 'S11', name: 'Sungai Dua', tag: 'Township Station' },
        { no: 12, code: 'S12', name: 'Batu Uban', tag: 'Strategic Park & Ride Hub' },
        { no: 13, code: 'S13', name: 'Jalan Universiti (USM)', tag: 'Universiti Sains Malaysia Campus Gateway' },
        { no: 14, code: 'S14', name: 'Gelugor', tag: 'Suburban Coastal Station' },
        { no: 15, code: 'S15', name: 'The Light / Penang Waterfront', tag: 'Waterfront TOD Precinct' },
        { no: 16, code: 'S16', name: 'East Jelutong', tag: 'Elevated High-Density Station' },
        { no: 17, code: 'S17', name: 'Sungai Pinang', tag: 'Urban Community Station' },
        { no: 18, code: 'S18', name: 'Bandar Sri Pinang', tag: 'Commercial Waterfront Hub' },
        { no: 19, code: 'S19', name: 'Macallum', tag: 'Cross-Strait Split Junction (Island/Mainland)' },
        { no: 20, code: 'S20', name: 'KOMTAR', tag: 'George Town Central Island Terminal' },
        { no: 21, code: 'S21', name: 'Penang Sentral (Butterworth)', tag: 'Mainland Intermodal Hub (KTM ETS, Komuter, Ferry)' },
        { no: 22, code: 'S22', name: 'Jalan Bagan Luar (Provisional)', tag: 'Future Mainland Expansion Station' },
      ],
    },
    {
      id: 'sector-south',
      shortTitle: 'South & Airport (Stn 1 - 4)',
      title: 'Sector 1: Silicon Island to Penang International Airport',
      stations: [
        { no: 1, code: 'S01', name: 'Pulau Silikon (PSR-A)', tag: 'Main Depot & Southern Terminal (Provisional)' },
        { no: 2, code: 'S02', name: 'Permatang Damar Laut', tag: 'Elevated Community Station' },
        { no: 3, code: 'S03', name: 'Penang International Airport (PIA / LTAPP)', tag: 'Direct Airport Concourse Skybridge' },
        { no: 4, code: 'S04', name: 'Sungai Tiram', tag: 'Elevated Urban Station' },
      ],
    },
    {
      id: 'sector-industrial',
      shortTitle: 'Industrial & SPICE (Stn 5 - 10)',
      title: 'Sector 2: Bayan Lepas FIZ & Convention Corridor',
      stations: [
        { no: 5, code: 'S05', name: 'FIZ South', tag: 'Industrial Employment Precinct' },
        { no: 6, code: 'S06', name: 'FIZ North', tag: 'High-Tech Semiconductor Zone' },
        { no: 7, code: 'S07', name: 'Jalan Tengah', tag: 'Suburban Residential Hub' },
        { no: 8, code: 'S08', name: 'SPICE', tag: 'Convention & Exhibition Centre Skywalk' },
        { no: 9, code: 'S09', name: 'Bukit Jambul', tag: 'Commercial & Retail District' },
        { no: 10, code: 'S10', name: 'Sungai Nibong', tag: 'Interstate Coach Terminal & Secondary Stabling' },
      ],
    },
    {
      id: 'sector-university',
      shortTitle: 'USM & Gelugor (Stn 11 - 14)',
      title: 'Sector 3: Education & Gelugor Residential',
      stations: [
        { no: 11, code: 'S11', name: 'Sungai Dua', tag: 'Township Station' },
        { no: 12, code: 'S12', name: 'Batu Uban', tag: 'Strategic Park & Ride Hub' },
        { no: 13, code: 'S13', name: 'Jalan Universiti (USM)', tag: 'Universiti Sains Malaysia Campus Gateway' },
        { no: 14, code: 'S14', name: 'Gelugor', tag: 'Suburban Coastal Station' },
      ],
    },
    {
      id: 'sector-georgetown',
      shortTitle: 'George Town & KOMTAR (Stn 15 - 20)',
      title: 'Sector 4: George Town Urban Core',
      stations: [
        { no: 15, code: 'S15', name: 'The Light / Penang Waterfront', tag: 'Waterfront TOD Precinct' },
        { no: 16, code: 'S16', name: 'East Jelutong', tag: 'Elevated High-Density Station' },
        { no: 17, code: 'S17', name: 'Sungai Pinang', tag: 'Urban Community Station' },
        { no: 18, code: 'S18', name: 'Bandar Sri Pinang', tag: 'Commercial Waterfront Hub' },
        { no: 19, code: 'S19', name: 'Macallum', tag: 'Cross-Strait Split Junction (Island/Mainland)' },
        { no: 20, code: 'S20', name: 'KOMTAR', tag: 'George Town Central Island Terminal' },
      ],
    },
    {
      id: 'sector-crosschannel',
      shortTitle: 'Cross-Strait & Mainland (Stn 19, 21, 22)',
      title: 'Sector 5: Cross-Strait Sea Viaduct to Butterworth',
      stations: [
        { no: 19, code: 'S19', name: 'Macallum (Island)', tag: 'Cross-Strait Marine Viaduct Approach' },
        { no: 21, code: 'S21', name: 'Penang Sentral (Mainland)', tag: 'Mainland Intermodal Hub (KTM ETS, Komuter, Ferry)' },
        { no: 22, code: 'S22', name: 'Jalan Bagan Luar (Provisional)', tag: 'Future Mainland Expansion Station' },
      ],
    },
  ];

  // 4 Major Multimodal Hubs
  const INTERCHANGES = [
    {
      title: 'KOMTAR Interchange',
      location: 'George Town (Island)',
      role: 'Island Central Transit Hub',
      detail: 'Direct links with Rapid Penang main bus depot and state civic center.',
    },
    {
      title: 'Penang Sentral',
      location: 'Butterworth (Mainland)',
      role: 'Mainland Railway & Ferry Gateway',
      detail: 'Cross-platform transfer to KTM ETS, Komuter, interstate buses, and Penang Ferry.',
    },
    {
      title: 'Penang Int. Airport (PIA)',
      location: 'Bayan Lepas (Island)',
      role: 'Aviation Transit Link',
      detail: 'Seamless direct connection into domestic and international terminal concourses.',
    },
    {
      title: 'Sungai Nibong Terminal',
      location: 'Sungai Nibong (Island)',
      role: 'Interstate Coach Terminal',
      detail: 'Direct connection to long-distance express buses serving Peninsular Malaysia.',
    },
  ];

  // Phased Delivery Milestones
  const MILESTONES = [
    {
      year: '2024',
      status: 'Completed',
      title: 'Federal Approval & Final Alignment',
      desc: 'Project structure and gazetted 29.67 km alignment approved by Federal Government under MRT Corp.',
    },
    {
      year: '2025',
      status: 'Current Phase',
      title: 'Site Preparation & Early Civil Works',
      desc: 'Commencement of Segment 1 early works, geotechnical soil testing, utility diversion, and civil packages.',
    },
    {
      year: '2026 - 2028',
      status: 'Upcoming',
      title: 'Viaducts, Stations & Marine Bridge',
      desc: 'Substructure piling, segmental viaduct launching, elevated station structures, and cross-strait sea bridge.',
    },
    {
      year: '2029 - 2031',
      status: 'Target',
      title: 'Systems, Commissioning & Operations',
      desc: 'Automated trainset delivery, signaling integration, trial operations, and commercial opening targeted for end 2031.',
    },
  ];

  const currentSector = SECTORS.find((s) => s.id === activeZone) || SECTORS[0];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* ── Page Header ─────────────────────────────────────────── */}
      <PageHeader
        title="About LRT Mutiara Line"
        subtitle="Official project specifications, alignment segments, and multimodal connectivity for Penang's first light rail transit system, developed by MRT Corp."
      >
        <div className="flex items-center gap-2 text-xs text-white/80">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={13} className="text-[#F4B942]" />
          <span className="text-[#F4B942] font-semibold">About Project</span>
        </div>
      </PageHeader>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">

        {/* ============================================================
            1. HERO BANNER
            ============================================================ */}
        <div
          className="relative rounded-lg overflow-hidden border border-gray-200"
          style={{ minHeight: '340px', maxHeight: '420px' }}
        >
          <img
            src="/images/hero_lrt.png"
            alt="Penang LRT Mutiara Line Elevated Train Simulation"
            className="w-full h-full object-cover object-center"
            style={{ minHeight: '340px', maxHeight: '420px' }}
          />
          <div
            className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8"
            style={{
              background:
                'linear-gradient(180deg, rgba(18,55,91,0.2) 0%, rgba(18,55,91,0.85) 60%, rgba(18,55,91,0.98) 100%)',
            }}
          >
            <div className="max-w-2xl space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F4B942]">
                <HardHat size={13} />
                National Rail Infrastructure Project
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
                Penang LRT Mutiara Line
              </h1>
              <p className="text-xs sm:text-sm leading-relaxed text-gray-100">
                Developed by <strong>MRT Corp</strong> as the transit backbone of the Penang Transport Master Plan (PTMP), the <strong>29.67 km</strong> Mutiara Line connects Silicon Island, George Town, and Penang Sentral across <strong>22 passenger stations</strong>, featuring a dedicated <strong>3.05 km marine viaduct</strong>.
              </p>
            </div>
          </div>
        </div>


        {/* ============================================================
            2. KEY PROJECT METRICS (Quick Facts)
            ============================================================ */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#12375B] tracking-tight">
            Key Project Facts
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
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
            3. PROJECT SEGMENTS & IMPLEMENTATION STRUCTURE
            ============================================================ */}
        <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1] block mb-1">
              PROJECT STRUCTURE &amp; CONTRACT PACKAGES
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#12375B] tracking-tight">
              Three Official Implementation Segments
            </h2>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              MRT Corp has structured the LRT Mutiara Line delivery into three dedicated contract and operational segments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {PROJECT_SEGMENTS.map((seg) => (
              <div
                key={seg.segment}
                className="p-4 rounded-lg bg-[#F5F7FA] border border-gray-200 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#16A6A1] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {seg.segment}
                    </span>
                    <span className="text-[11px] font-bold text-[#12375B]">
                      {seg.length}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-[#12375B] leading-snug">
                    {seg.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-gray-500">
                    {seg.extent} • {seg.stationsCount}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed pt-1">
                    {seg.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-gray-200/80 text-[11px] font-medium text-gray-500">
                  Structure: <span className="text-gray-800 font-semibold">{seg.type}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            4. EXECUTIVE OVERVIEW (Concise & Focused)
            ============================================================ */}
        <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#12375B] tracking-tight">
            Project Overview &amp; Strategic Objectives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <p>
              The <strong>LRT Mutiara Line</strong> serves as the central public transit backbone under the{' '}
              <strong>Penang Transport Master Plan (PTMP)</strong>. Developed, owned, and supervised by{' '}
              <strong>MRT Corp</strong>, it represents Malaysia's first light rail transit system outside the Klang Valley.
            </p>
            <p>
              Designed with a <strong>minimum capacity of 405 passengers per train</strong> and an initial peak-hour{' '}
              headway of <strong>4 minutes</strong> (scalable to 2 minutes), the line delivers predictable travel times,
              decongests chronic choke points, and provides a direct cross-strait fixed rail connection between the island and mainland.
            </p>
          </div>

          {/* 4 Core Highlights from MRT Corp Portal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-gray-100">
            <div className="flex items-start gap-3 p-3 rounded-md bg-[#F5F7FA]">
              <Car size={18} className="text-[#12375B] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-[#12375B]">Traffic Decongestion</h4>
                <p className="text-[11px] text-gray-600 mt-0.5">Bypasses chronic congestion on Tun Dr Lim Chong Eu Expressway & Jalan Sultan Azlan Shah.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-md bg-[#F5F7FA]">
              <Compass size={18} className="text-[#16A6A1] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-[#12375B]">Cross-Channel Rail Link</h4>
                <p className="text-[11px] text-gray-600 mt-0.5">3.05 km marine viaduct over Penang Strait connecting George Town to Butterworth rail hub.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-md bg-[#F5F7FA]">
              <Users size={18} className="text-[#12375B] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-[#12375B]">Universal Accessibility</h4>
                <p className="text-[11px] text-gray-600 mt-0.5">Full barrier-free access with tactile paving, step-free access, and elevators across all stations.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-md bg-[#F5F7FA]">
              <ShieldCheck size={18} className="text-[#047857] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-[#12375B]">Clean Green Mobility</h4>
                <p className="text-[11px] text-gray-600 mt-0.5">100% electric zero-emission transit directly supporting the Penang Green Agenda 2030.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            5. ROUTE ALIGNMENT & 22 STATIONS
            ============================================================ */}
        <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#12375B] tracking-tight">
                22 Stations &amp; Alignment Corridor
              </h2>
              <p className="text-xs text-gray-600 mt-0.5">
                Gazetted station sequence along the 29.67 km transit corridor.
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
            6. STRATEGIC MULTIMODAL INTERCHANGES
            ============================================================ */}
        <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#12375B] tracking-tight">
            4 Major Multimodal Interchanges
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {INTERCHANGES.map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-lg bg-[#F5F7FA] border border-gray-200 space-y-1.5"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f7a76]">
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
            7. PROJECT TIMELINE (4 Steps)
            ============================================================ */}
        <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#12375B] tracking-tight">
            Implementation Timeline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {MILESTONES.map((step) => {
              const isCurrent = step.status === 'Current Phase';
              const isDone = step.status === 'Completed';
              return (
                <div
                  key={step.year}
                  className={`p-4 rounded-lg border space-y-2 ${
                    isCurrent
                      ? 'bg-teal-50/50 border-[#16A6A1]'
                      : isDone
                      ? 'bg-[#F5F7FA] border-gray-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-[#12375B]">
                      {step.year}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        isCurrent
                          ? 'text-[#F4B942]'
                          : isDone
                          ? 'text-[#0f7a76]'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-[#12375B] leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            8. CALL TO ACTION BANNER
            ============================================================ */}
        <section
          className="rounded-lg p-6 sm:p-7 text-white relative overflow-hidden shadow-sm"
          style={{ backgroundColor: '#12375B' }}
        >
          <div className="relative z-10 max-w-xl space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F4B942] block">
              Community Portal
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight leading-tight text-white">
              Questions or Inquiries Concerning Construction?
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              Submit feedback tickets directly to community liaison officers or check the latest traffic advisories.
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
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
              <Link
                to="/announcements"
                className="text-xs font-semibold px-4 py-2 rounded-md inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 transition-colors"
              >
                <span>Notices</span>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
