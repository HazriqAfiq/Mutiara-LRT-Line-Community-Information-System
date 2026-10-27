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
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

export default function AboutPage() {
  const [activeZone, setActiveZone] = useState('sector-all');

  // Key Technical Metrics
  const KEY_METRICS = [
    {
      icon: Train,
      value: '29.5 km',
      label: 'Route Length',
      detail: 'Fully elevated guideway and dedicated sea-crossing rail bridge.',
    },
    {
      icon: MapPin,
      value: '21 Stations',
      label: 'Passenger Stations',
      detail: '20 stations on Penang Island and 1 major mainland interchange.',
    },
    {
      icon: Anchor,
      value: 'Cross-Strait',
      label: 'Direct Sea Link',
      detail: 'Rail bridge across Penang Strait from Macallum to Penang Sentral.',
    },
    {
      icon: Building,
      value: 'Silicon Island',
      label: 'Main Depot & OCC',
      detail: 'Primary operations, maintenance facility, and transit development.',
    },
    {
      icon: Plane,
      value: 'Airport Direct',
      label: 'PIA Connection',
      detail: 'Integrated station directly linking the Penang Airport terminal.',
    },
    {
      icon: Clock,
      value: '2031',
      label: 'Target Operations',
      detail: 'Targeted full commercial passenger operations across the line.',
    },
  ];

  // 21 Stations categorized into 5 focused sectors
  const SECTORS = [
    {
      id: 'sector-all',
      shortTitle: 'All 21 Stations',
      title: 'Full Alignment: Silicon Island to Penang Sentral (29.5 km)',
      stations: [
        { no: 1, name: 'Silicon Island (PSR-A)', tag: 'Main Depot & Terminal' },
        { no: 2, name: 'Permatang Damar Laut', tag: 'Elevated Station' },
        { no: 3, name: 'Penang International Airport (PIA)', tag: 'Airport Concourse Link' },
        { no: 4, name: 'Sungai Tiram', tag: 'Elevated Station' },
        { no: 5, name: 'FIZ South', tag: 'Industrial Corridor' },
        { no: 6, name: 'FIZ North', tag: 'High-Tech Zone' },
        { no: 7, name: 'Jalan Tengah', tag: 'Residential Hub' },
        { no: 8, name: 'SPICE', tag: 'Convention Centre' },
        { no: 9, name: 'Bukit Jambul', tag: 'Commercial Precinct' },
        { no: 10, name: 'Sungai Nibong', tag: 'Interstate Bus Interchange' },
        { no: 11, name: 'Sungai Dua', tag: 'Township Station' },
        { no: 12, name: 'Batu Uban', tag: 'Park & Ride' },
        { no: 13, name: 'Jalan Universiti (USM)', tag: 'University Campus' },
        { no: 14, name: 'Gelugor', tag: 'Suburban Station' },
        { no: 15, name: 'Penang Waterfront', tag: 'Waterfront Precinct' },
        { no: 16, name: 'East Jelutong', tag: 'Elevated Station' },
        { no: 17, name: 'Sungai Pinang', tag: 'Urban Station' },
        { no: 18, name: 'Bandar Sri Pinang', tag: 'Commercial Hub' },
        { no: 19, name: 'Macallum', tag: 'Cross-Strait Split Junction' },
        { no: 20, name: 'KOMTAR', tag: 'Central Island Terminal' },
        { no: 21, name: 'Penang Sentral (Butterworth)', tag: 'Mainland Intermodal Hub' },
      ],
    },
    {
      id: 'sector-south',
      shortTitle: 'South & Airport (Stn 1 - 4)',
      title: 'Sector 1: Silicon Island to Penang Airport',
      stations: [
        { no: 1, name: 'Silicon Island (PSR-A)', tag: 'Main Depot & Terminal' },
        { no: 2, name: 'Permatang Damar Laut', tag: 'Elevated Station' },
        { no: 3, name: 'Penang International Airport (PIA)', tag: 'Airport Concourse Link' },
        { no: 4, name: 'Sungai Tiram', tag: 'Elevated Station' },
      ],
    },
    {
      id: 'sector-industrial',
      shortTitle: 'Industrial & SPICE (Stn 5 - 10)',
      title: 'Sector 2: Bayan Lepas FIZ & Convention Corridor',
      stations: [
        { no: 5, name: 'FIZ South', tag: 'Industrial Corridor' },
        { no: 6, name: 'FIZ North', tag: 'High-Tech Zone' },
        { no: 7, name: 'Jalan Tengah', tag: 'Residential Hub' },
        { no: 8, name: 'SPICE', tag: 'Convention Centre' },
        { no: 9, name: 'Bukit Jambul', tag: 'Commercial Precinct' },
        { no: 10, name: 'Sungai Nibong', tag: 'Interstate Bus Interchange' },
      ],
    },
    {
      id: 'sector-university',
      shortTitle: 'USM & Gelugor (Stn 11 - 14)',
      title: 'Sector 3: Education & Gelugor Residential',
      stations: [
        { no: 11, name: 'Sungai Dua', tag: 'Township Station' },
        { no: 12, name: 'Batu Uban', tag: 'Park & Ride' },
        { no: 13, name: 'Jalan Universiti (USM)', tag: 'University Campus' },
        { no: 14, name: 'Gelugor', tag: 'Suburban Station' },
      ],
    },
    {
      id: 'sector-georgetown',
      shortTitle: 'George Town & KOMTAR (Stn 15 - 20)',
      title: 'Sector 4: George Town Urban Core',
      stations: [
        { no: 15, name: 'Penang Waterfront', tag: 'Waterfront Precinct' },
        { no: 16, name: 'East Jelutong', tag: 'Elevated Station' },
        { no: 17, name: 'Sungai Pinang', tag: 'Urban Station' },
        { no: 18, name: 'Bandar Sri Pinang', tag: 'Commercial Hub' },
        { no: 19, name: 'Macallum', tag: 'Cross-Strait Split Junction' },
        { no: 20, name: 'KOMTAR', tag: 'Central Island Terminal' },
      ],
    },
    {
      id: 'sector-crosschannel',
      shortTitle: 'Cross-Strait (Stn 19 & 21)',
      title: 'Sector 5: Cross-Strait Sea Viaduct to Butterworth',
      stations: [
        { no: 19, name: 'Macallum (Island)', tag: 'Sea-Bridge Approach' },
        { no: 21, name: 'Penang Sentral (Mainland)', tag: 'Mainland Intermodal Hub' },
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
      title: 'Federal Approval & Final Route',
      desc: 'Project structure and gazetted 29.5 km alignment approved by Federal Government under MRT Corp.',
    },
    {
      year: '2025',
      status: 'Current Phase',
      title: 'Utility Relocation & Site Preparation',
      desc: 'Active geotechnical soil testing, underground utility mapping, and civil contract packages.',
    },
    {
      year: '2026 - 2028',
      status: 'Upcoming',
      title: 'Viaducts, Stations & Sea Bridge',
      desc: 'Substructure piling, segmental viaduct launching, elevated station structures, and sea viaduct.',
    },
    {
      year: '2029 - 2031',
      status: 'Target',
      title: 'Trackwork, Testing & Operations',
      desc: 'Automated train delivery, signaling integration, trial operations, and commercial passenger opening.',
    },
  ];

  const currentSector = SECTORS.find((s) => s.id === activeZone) || SECTORS[0];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* ── Page Header ─────────────────────────────────────────── */}
      <PageHeader
        title="About LRT Mutiara Line"
        subtitle="Key project facts, route alignment, and multimodal connectivity for Penang's first light rail transit system."
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
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider text-[#12375B] bg-[#F4B942]">
                <HardHat size={13} />
                National Rail Infrastructure Project
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
                Penang LRT Mutiara Line
              </h1>
              <p className="text-xs sm:text-sm leading-relaxed text-gray-100">
                Developed by <strong>MRT Corp</strong>, the 29.5 km Mutiara Line is Penang’s first light rail transit system,
                connecting Silicon Island, George Town, and Penang Sentral across 21 stations.
              </p>
            </div>
          </div>
        </div>


        {/* ============================================================
            3. KEY PROJECT METRICS (Quick Facts)
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
            4. EXECUTIVE OVERVIEW (Concise & Focused)
            ============================================================ */}
        <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm space-y-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#12375B] tracking-tight">
            Project Overview &amp; Objectives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-gray-600 leading-relaxed">
            <p>
              The <strong>LRT Mutiara Line</strong> is the transit spine under the{' '}
              <strong>Penang Transport Master Plan (PTMP)</strong>. Built and owned by{' '}
              <strong>MRT Corp</strong>, it is the first light rail transit system developed in Malaysia
              outside the Klang Valley.
            </p>
            <p>
              The line provides an all-weather, predictable alternative to chronic traffic on Tun Dr Lim Chong Eu
              Expressway and Jalan Sultan Azlan Shah, featuring a direct <strong>sea-crossing rail bridge</strong>{' '}
              linking Penang Island to Seberang Perai.
            </p>
          </div>

          {/* 3 Core Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-100">
            <div className="flex items-start gap-3 p-3 rounded-md bg-[#F5F7FA]">
              <Car size={18} className="text-[#12375B] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-[#12375B]">Traffic Decongestion</h4>
                <p className="text-[11px] text-gray-600 mt-0.5">Bypasses peak-hour gridlocks across major road corridors.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-md bg-[#F5F7FA]">
              <Compass size={18} className="text-[#16A6A1] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-[#12375B]">Cross-Channel Rail Link</h4>
                <p className="text-[11px] text-gray-600 mt-0.5">Direct sea viaduct connecting island to mainland railway network.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-md bg-[#F5F7FA]">
              <ShieldCheck size={18} className="text-[#047857] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs text-[#12375B]">Clean Electric Transit</h4>
                <p className="text-[11px] text-gray-600 mt-0.5">Zero direct emissions supporting Penang’s green mobility targets.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            5. ROUTE ALIGNMENT & 21 STATIONS
            ============================================================ */}
        <section className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#12375B] tracking-tight">
                21 Stations &amp; Alignment Corridor
              </h2>
              <p className="text-xs text-gray-600 mt-0.5">
                Sequential station list along the 29.5 km transit line.
              </p>
            </div>
            <span className="text-xs font-bold text-[#16A6A1] bg-teal-50 px-2.5 py-1 rounded w-fit">
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
                  <h4 className="font-bold text-xs text-[#12375B] truncate">
                    {stn.name}
                  </h4>
                  <span className="text-[10px] text-gray-500 font-medium">
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
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f7a76] bg-teal-100/70 px-2 py-0.5 rounded">
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
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isCurrent
                          ? 'bg-[#F4B942] text-[#12375B]'
                          : isDone
                          ? 'bg-teal-100 text-[#0f7a76]'
                          : 'bg-gray-100 text-gray-500'
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
            <span className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider bg-white/10 text-[#F4B942] border border-white/20">
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
