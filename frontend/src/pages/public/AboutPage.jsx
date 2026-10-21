/**
 * pages/public/AboutPage.jsx
 * Route: /about
 *
 * Comprehensive About Project page for the Penang LRT Mutiara Line
 * Community Information & Feedback Platform.
 *
 * Sections:
 *   1. Page Header & Hero Banner
 *   2. Strategic Vision & Executive Summary
 *   3. Key Project Metrics & Technical Specifications
 *   4. Route Alignment & Landmark Station Corridor
 *   5. Community-First Information & Feedback Mission
 *   6. Project Milestones & Delivery Timeline
 *   7. Call to Action (Feedback & Updates)
 *   8. Academic Disclaimer (CMT322)
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Train,
  MapPin,
  Clock,
  Shield,
  Layers,
  Building,
  Plane,
  ArrowRight,
  CheckCircle2,
  Users,
  Compass,
  AlertTriangle,
  Info,
  Calendar,
  MessageSquare,
  HardHat,
  ChevronRight,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

export default function AboutPage() {
  const [activeZone, setActiveZone] = useState('zone1');

  const ZONES = [
    {
      id: 'zone1',
      title: 'Zone 1: Southern Terminal & Airport',
      subtitle: 'Silicon Island to Penang International Airport',
      description:
        'Serving the expanding southern island development, primary depot operations, and providing seamless direct rail transit to Penang International Airport (PIA).',
      stations: [
        'Silicon Island Depot & Terminal',
        'Permatang Damar Laut',
        'Penang International Airport (PIA)',
        'Sungai Tiram',
      ],
      highlights: 'Direct airport terminal link, multimodal parking, and Southern maintenance depot.',
    },
    {
      id: 'zone2',
      title: 'Zone 2: Industrial & University Corridor',
      subtitle: 'Bayan Lepas Free Industrial Zone to USM Gelugor',
      description:
        'The high-capacity spine connecting over 100,000 workforce commuters across the semiconductor hub, residential townships, and Universiti Sains Malaysia (USM).',
      stations: [
        'Bayan Lepas FIZ Phase 1-4',
        'Bayan Baru Central',
        'Sungai Nibong (Interstate Bus Hub)',
        'Bukit Jambul',
        'Universiti Sains Malaysia (USM)',
      ],
      highlights: 'Peak commuter relief for Tun Dr Lim Chong Eu Expressway and industrial workers.',
    },
    {
      id: 'zone3',
      title: 'Zone 3: Heritage & George Town Core',
      subtitle: 'Gelugor to Komtar Central Station',
      description:
        'Threading through Penang’s dense urban core and UNESCO World Heritage buffer zone, culminating at the premier island transit hub at KOMTAR.',
      stations: [
        'Bandar Sri Pinang',
        'Sungai Pinang',
        'KOMTAR Central Interchange Station',
        'Macallum Urban Gateway',
      ],
      highlights: 'Full interchange with Rapid Penang bus network, pedestrian skywalks, and government administrative hub.',
    },
    {
      id: 'zone4',
      title: 'Zone 4: Sea-Crossing & Mainland Gateway',
      subtitle: 'George Town Cross-Channel Link to Penang Sentral (Butterworth)',
      description:
        'The iconic cross-channel sea viaduct linking Penang Island directly to Seberang Perai, offering an all-weather alternative to existing road bridges.',
      stations: [
        'Penang Strait Cross-Channel Viaduct',
        'Penang Sentral / Butterworth Station',
      ],
      highlights: 'Direct cross-platform transfer to KTM ETS, KTM Komuter Northern Sector, and Penang Ferry services.',
    },
  ];

  const KEY_METRICS = [
    {
      icon: Train,
      value: '29.5 km',
      label: 'Total Route Length',
      detail: 'Fully elevated guideway and cross-channel sea-crossing rail bridge',
    },
    {
      icon: MapPin,
      value: '20 Stations',
      label: 'Passenger Stations',
      detail: 'Including 2 major multimodal interchanges at Komtar and Penang Sentral',
    },
    {
      icon: Clock,
      value: '18 - 20 mins',
      label: 'Estimated Transit Time',
      detail: 'Between Silicon Island and KOMTAR during peak operating hours',
    },
    {
      icon: Building,
      value: '1 Primary Depot',
      label: 'Operations & Maintenance',
      detail: 'State-of-the-art facility located at Silicon Island for 30+ train sets',
    },
  ];

  const MILESTONES = [
    {
      year: '2024',
      quarter: 'Q1 - Q2',
      title: 'Federal Approval & Final Alignment',
      description:
        'Federal Cabinet approves the Mutiara Line project structure under MRT Corp with gazetted 29.5km route alignment.',
      status: 'completed',
    },
    {
      year: '2025',
      quarter: 'Q1 - Q4',
      title: 'Detailed Engineering Design & Soil Investigation',
      description:
        'Soil geotechnical surveys, utility mapping, and structural package awards across island and cross-channel zones.',
      status: 'completed',
    },
    {
      year: '2026',
      quarter: 'Current Phase',
      title: 'Civil Construction & Viaduct Foundations',
      description:
        'Substructure pier construction, pile cap installation, utility diversions, and active community traffic mitigation.',
      status: 'active',
    },
    {
      year: '2028',
      quarter: 'Target',
      title: 'Trackwork & Station Superstructures',
      description:
        'Elevated station construction, architectural fit-out, power sub-stations, and signaling infrastructure deployment.',
      status: 'upcoming',
    },
    {
      year: '2030',
      quarter: 'Target',
      title: 'Testing, Commissioning & Operations',
      description:
        'Trial train runs, safety certifications, and commercial revenue passenger operations across the entire 20-station corridor.',
      status: 'upcoming',
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EEF2F7' }}>
      {/* ── Page Header ─────────────────────────────────────────── */}
      <PageHeader
        title="About Penang LRT Mutiara Line"
        subtitle="Transforming public mobility and connecting communities between Penang Island and Seberang Perai."
      >
        <div className="flex items-center gap-2 text-xs text-white/80">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={13} className="text-[#F4B942]" />
          <span className="text-[#F4B942] font-semibold">About Project</span>
        </div>
      </PageHeader>

      <div className="container pb-12 sm:pb-16 space-y-12">

        {/* ============================================================
            1. HERO VISUAL BANNER
            ============================================================ */}
        <div
          className="relative rounded-[28px] overflow-hidden shadow-xl"
          style={{ minHeight: '360px', maxHeight: '460px' }}
        >
          <img
            src="/images/hero_lrt.jpg"
            alt="Penang LRT Mutiara Line Elevated Train Simulation"
            className="w-full h-full object-cover object-center"
            style={{ minHeight: '360px', maxHeight: '460px' }}
          />
          <div
            className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10"
            style={{
              background:
                'linear-gradient(180deg, rgba(12,38,64,0.25) 0%, rgba(12,38,64,0.85) 60%, rgba(12,38,64,0.97) 100%)',
            }}
          >
            <div className="max-w-3xl space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#0F2C59] bg-[#F4B942]">
                <HardHat size={13} />
                National Rail Infrastructure Project
              </span>
              <h2
                className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight"
                style={{ color: '#FFFFFF', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
              >
                A Unified Transit Spine for 1.74 Million Penangites
              </h2>
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: '#F1F5F9', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
              >
                Bridging Penang’s high-tech manufacturing corridor in Bayan Lepas, the UNESCO World
                Heritage city of George Town, and the mainland transportation gateway at Penang Sentral
                into one seamless transit network.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================
            2. STRATEGIC PURPOSE & EXECUTIVE OVERVIEW
            ============================================================ */}
        <section className="bg-white rounded-[24px] p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#16A6A1] uppercase tracking-wider">
              Project Purpose & Strategic Role
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12375B] mt-1 tracking-tight">
              Solving Critical Traffic Chokepoints with Rapid Transit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600 leading-relaxed">
            <div className="space-y-4">
              <p>
                The <strong>LRT Mutiara Line</strong> represents Penang’s flagship light rapid transit
                initiative under the National Transport Policy. Developed by{' '}
                <strong>Mass Rapid Transit Corporation Sdn Bhd (MRT Corp)</strong> in collaboration with
                the Penang State Government, the project delivers modern, climate-resilient passenger
                rail along the state’s most congested travel corridors.
              </p>
              <p>
                Spanning <strong>29.5 kilometres</strong> with 20 stations, the Mutiara Line addresses
                decades-long traffic congestion across the Bayan Lepas industrial belt, George Town’s
                heritage center, and the two road bridges linking the island and mainland.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Crucially, the line incorporates an iconic <strong>sea-crossing rail alignment</strong>{' '}
                spanning the Penang Strait. This ensures direct rail connectivity between the island’s
                central terminal at KOMTAR and the mainland railway hub at Penang Sentral in Butterworth.
              </p>
              <div className="p-4 bg-[#EEF2F7] rounded-2xl border-l-4 border-[#16A6A1] space-y-1">
                <p className="font-semibold text-xs text-[#12375B]">Key Project Beneficiaries:</p>
                <p className="text-xs text-gray-500">
                  Over 100,000 daily industrial commuters in Bayan Lepas, regional tourists arriving via
                  Penang International Airport, students at USM, and interstate travelers transferring at
                  Penang Sentral.
                </p>
              </div>
            </div>
          </div>

          {/* 3 Strategic Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50">
              <div className="p-2.5 rounded-xl bg-teal-50 text-[#16A6A1] flex-shrink-0">
                <Compass size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#12375B]">Cross-Channel Link</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Direct sea-crossing rail viaduct providing all-weather connection between Island &amp; Mainland.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50">
              <div className="p-2.5 rounded-xl bg-amber-50 text-[#F4B942] flex-shrink-0">
                <Plane size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#12375B]">Airport Connection</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Direct integrated airport station at Penang International Airport (PIA) terminal.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50">
              <div className="p-2.5 rounded-xl bg-blue-50 text-[#12375B] flex-shrink-0">
                <Shield size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#12375B]">Green &amp; Sustainable</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Zero local emissions, expected to eliminate thousands of private vehicular trips daily.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            3. KEY PROJECT METRICS (Visual Cards)
            ============================================================ */}
        <section className="space-y-4">
          <div>
            <span className="text-xs font-bold text-[#16A6A1] uppercase tracking-wider">
              Technical Specifications
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#12375B] mt-1 tracking-tight">
              Project Key Metrics at a Glance
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {KEY_METRICS.map((metric) => {
              const IconComp = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="p-3 w-fit rounded-2xl bg-[#EEF2F7] text-[#16A6A1] mb-4">
                    <IconComp size={24} />
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#12375B] tracking-tight">
                      {metric.value}
                    </p>
                    <p className="text-xs font-bold text-gray-700 mt-1 uppercase tracking-wide">
                      {metric.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {metric.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            4. ROUTE ALIGNMENT & INTERACTIVE ZONE EXPLORER
            ============================================================ */}
        <section className="bg-white rounded-[24px] p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#16A6A1] uppercase tracking-wider">
                Alignment &amp; Stations
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12375B] mt-1 tracking-tight">
                20 Stations Along 4 Transit Corridors
              </h2>
            </div>
            <p className="text-xs text-gray-500 max-w-sm">
              Click through the zones below to examine key station locations and transit connections.
            </p>
          </div>

          {/* Zone Selector Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-3">
            {ZONES.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeZone === zone.id
                    ? 'bg-[#12375B] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {zone.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Active Zone Content Card */}
          {(() => {
            const currentZone = ZONES.find((z) => z.id === activeZone) || ZONES[0];
            return (
              <div className="p-6 rounded-[20px] bg-[#EEF2F7] border border-gray-200/60 space-y-4 animate-in fade-in duration-150">
                <div>
                  <h3 className="text-lg font-extrabold text-[#12375B]">
                    {currentZone.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#16A6A1]">
                    {currentZone.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                    {currentZone.description}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Key Stations in this Sector:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentZone.stations.map((stn, idx) => (
                      <div
                        key={stn}
                        className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 border border-gray-200/70"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#16A6A1]/15 text-[#16A6A1] flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <span>{stn}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-300/40 text-xs text-gray-500 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#16A6A1] flex-shrink-0" />
                  <span><strong>Highlight:</strong> {currentZone.highlights}</span>
                </div>
              </div>
            );
          })()}

          {/* 3 Landmark Interchanges */}
          <div className="pt-4">
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
              Strategic Multimodal Interchanges
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-gray-100 bg-slate-50 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#16A6A1] bg-teal-50 px-2 py-0.5 rounded-md">
                  Island Central Hub
                </span>
                <h5 className="font-bold text-sm text-[#12375B]">KOMTAR Interchange</h5>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Direct connection with Rapid Penang central bus depot, Komtar pedestrian mall, and
                  state administrative headquarters.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-gray-100 bg-slate-50 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F4B942] bg-amber-50 px-2 py-0.5 rounded-md text-[#92400e]">
                  Mainland Railway Hub
                </span>
                <h5 className="font-bold text-sm text-[#12375B]">Penang Sentral (Butterworth)</h5>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Seamless intermodal link to KTM Electric Train Service (ETS), KTM Komuter, interstate
                  bus services, and the Penang Ferry.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-gray-100 bg-slate-50 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#3B82F6] bg-blue-50 px-2 py-0.5 rounded-md">
                  Aviation Gateway
                </span>
                <h5 className="font-bold text-sm text-[#12375B]">Penang International Airport</h5>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Direct terminal baggage concourse connection supporting international flight passengers
                  and airport employment precinct.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            5. COMMUNITY FIRST: ROLE OF THIS PLATFORM
            ============================================================ */}
        <section className="bg-white rounded-[24px] p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#16A6A1] uppercase tracking-wider">
              Community Engagement &amp; Public Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12375B] mt-1 tracking-tight">
              Why This Community Information Portal Exists
            </h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Major urban transit infrastructure inevitably impacts surrounding residential neighborhoods,
              commercial districts, and local traffic circulation during construction. This portal serves
              as Penang’s centralized communication and civic accountability bridge.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-[20px] bg-[#EEF2F7] space-y-3">
              <div className="p-2.5 w-fit rounded-xl bg-white text-[#12375B] shadow-xs">
                <Info size={20} />
              </div>
              <h4 className="font-bold text-sm text-[#12375B]">Verified Construction Updates</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Stay updated with official, engineer-verified work progress, piling schedules, and night-work
                advisories across all 20 station packages.
              </p>
              <Link
                to="/announcements"
                className="text-xs font-bold text-[#16A6A1] hover:underline inline-flex items-center gap-1"
              >
                <span>Browse Announcements</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="p-5 rounded-[20px] bg-[#EEF2F7] space-y-3">
              <div className="p-2.5 w-fit rounded-xl bg-white text-[#F4B942] shadow-xs">
                <AlertTriangle size={20} />
              </div>
              <h4 className="font-bold text-sm text-[#12375B]">Real-Time Traffic Advisories</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Check scheduled road closures, contraflow lanes, detour route maps, and peak-hour traffic
                marshaling before planning your commute.
              </p>
              <Link
                to="/road-closures"
                className="text-xs font-bold text-[#16A6A1] hover:underline inline-flex items-center gap-1"
              >
                <span>View Road Closures</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            <div className="p-5 rounded-[20px] bg-[#EEF2F7] space-y-3">
              <div className="p-2.5 w-fit rounded-xl bg-white text-[#16A6A1] shadow-xs">
                <MessageSquare size={20} />
              </div>
              <h4 className="font-bold text-sm text-[#12375B]">Direct Community Feedback</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Report noise exceedances, vibration, dust pollution, or pedestrian detours directly to
                community liaison officers with tracking ticket numbers.
              </p>
              <Link
                to="/feedback/new"
                className="text-xs font-bold text-[#16A6A1] hover:underline inline-flex items-center gap-1"
              >
                <span>Submit Feedback</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================
            6. PROJECT DELIVERY MILESTONES
            ============================================================ */}
        <section className="bg-white rounded-[24px] p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold text-[#16A6A1] uppercase tracking-wider">
              Project Timeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12375B] mt-1 tracking-tight">
              From Groundbreaking to Revenue Operations (2024 - 2030)
            </h2>
          </div>

          <div className="space-y-4">
            {MILESTONES.map((item, index) => {
              const isCompleted = item.status === 'completed';
              const isActive = item.status === 'active';
              return (
                <div
                  key={item.year + item.quarter}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isActive
                      ? 'bg-teal-50/50 border-[#16A6A1] shadow-xs'
                      : isCompleted
                      ? 'bg-slate-50 border-gray-200'
                      : 'bg-white border-gray-100'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-extrabold text-xs flex-shrink-0 ${
                        isActive
                          ? 'bg-[#16A6A1] text-white shadow-sm'
                          : isCompleted
                          ? 'bg-[#12375B] text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <span className="text-[10px] leading-tight font-medium opacity-80">
                        {item.quarter}
                      </span>
                      <span className="text-sm leading-tight">{item.year}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-[#12375B]">{item.title}</h4>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#F4B942] text-[#0F2C59] uppercase tracking-wider">
                            Active Phase
                          </span>
                        )}
                        {isCompleted && (
                          <CheckCircle2 size={14} className="text-[#10B981]" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-2xl">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit ${
                      isActive
                        ? 'text-[#16A6A1] bg-teal-100/60'
                        : isCompleted
                        ? 'text-gray-600 bg-gray-200/60'
                        : 'text-gray-400 bg-gray-100'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================
            7. CALL TO ACTION BANNER
            ============================================================ */}
        <section
          className="rounded-[28px] p-8 sm:p-12 text-white relative overflow-hidden shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #12375B 0%, #1a4a5e 100%)',
          }}
        >
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#F4B942] border border-white/20">
              Get Involved
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight"
              style={{ color: '#FFFFFF', textShadow: '0 2px 6px rgba(0,0,0,0.3)' }}
            >
              Have Questions or Feedback Concerning Construction in Your Area?
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: '#F1F5F9' }}
            >
              Our community liaison team responds to legitimate resident feedback within 48 hours.
              Help us keep Penang moving safely throughout the construction period.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/feedback/new"
                className="btn btn-amber text-xs sm:text-sm font-bold px-6 py-3 rounded-full"
                style={{ backgroundColor: '#F4B942', color: '#0F2C59' }}
              >
                <span style={{ color: '#0F2C59' }}>Submit Community Feedback</span>
                <ArrowRight size={14} style={{ color: '#0F2C59' }} />
              </Link>
              <Link
                to="/announcements"
                className="btn btn-glass text-xs sm:text-sm font-semibold px-6 py-3 rounded-full"
                style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.45)' }}
              >
                <span style={{ color: '#FFFFFF' }}>View Construction Notices</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================================
            8. ACADEMIC DISCLAIMER BANNER (CMT322)
            ============================================================ */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
          <Info size={18} className="text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-950 mb-0.5">
              Academic Project Notice &amp; Prototype Disclaimer
            </p>
            <p className="text-amber-800">
              This website is an academic prototype developed for <strong>CMT322</strong> at Universiti
              Sains Malaysia (USM). It is created strictly for academic research and interface simulation
              purposes, and is <strong>not</strong> the official corporate website of Mass Rapid Transit
              Corporation Sdn Bhd (MRT Corp) or the Penang State Government.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
