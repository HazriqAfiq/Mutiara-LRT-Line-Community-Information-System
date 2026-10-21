/**
 * components/map/LRTMapSection.jsx
 *
 * Full-width homepage interactive section:
 * "Explore the LRT Construction Map"
 *
 * Implements a modern two-column layout (30% Left Panel / 70% Interactive Map Canvas)
 * on desktop, stacking seamlessly on mobile devices.
 */
import { useState, useEffect, useMemo } from 'react';
import { MapPin, RefreshCw, AlertCircle } from 'lucide-react';
import { getMapLocations, getRoutePolyline } from '../../services/mapService';
import MapCanvas from './MapCanvas';
import MapFilters from './MapFilters';
import MapSearch from './MapSearch';
import MapLegend from './MapLegend';
import MapInfoPanel from './MapInfoPanel';
import LoadingSpinner from '../common/LoadingSpinner';

export default function LRTMapSection() {
  const [allLocations, setAllLocations] = useState([]);
  const [polyline, setPolyline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [locationsRes, polylineRes] = await Promise.all([
        getMapLocations(),
        getRoutePolyline(),
      ]);
      setAllLocations(locationsRes.data || []);
      setPolyline(polylineRes.data || []);
    } catch (err) {
      console.error('Failed to load LRT map locations:', err);
      setError('Unable to load map data. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute category counts for filter badges
  const counts = useMemo(() => {
    return {
      all: allLocations.length,
      station: allLocations.filter((l) => l.type === 'station').length,
      construction_zone: allLocations.filter((l) => l.type === 'construction_zone').length,
      road_closure: allLocations.filter((l) => l.type === 'road_closure').length,
    };
  }, [allLocations]);

  // Filter locations based on active filter tab
  const visibleLocations = useMemo(() => {
    if (activeFilter === 'all') return allLocations;
    return allLocations.filter((l) => l.type === activeFilter);
  }, [allLocations, activeFilter]);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    // If the selected location type doesn't match the current filter, switch to 'all' or that filter
    if (activeFilter !== 'all' && location.type !== activeFilter) {
      setActiveFilter('all');
    }
  };

  return (
    <section
      id="lrt-construction-map"
      className="px-3 sm:px-5 py-8 sm:py-10 scroll-mt-20"
      style={{ backgroundColor: '#EEF2F7' }}
      aria-labelledby="map-section-heading"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="mb-6 max-w-2xl">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#16A6A1] block mb-1">
            EXPLORE THE LINE
          </span>
          <h2
            id="map-section-heading"
            className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#12375B] tracking-tight mb-2"
          >
            Explore the LRT Construction Map
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Find station locations, construction activities and traffic advisories along the Mutiara Line.
          </p>
        </div>

        {/* Loading / Error States */}
        {loading ? (
          <div className="bg-white rounded-xl border border-slate-200 p-16 flex flex-col items-center justify-center min-h-[420px]">
            <LoadingSpinner message="Loading interactive transit & construction map..." />
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl border border-red-200 p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-3">
              <AlertCircle size={24} />
            </div>
            <p className="text-sm font-semibold text-red-700 mb-4">{error}</p>
            <button
              type="button"
              onClick={loadData}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#12375B] hover:bg-[#1a4e7a] text-white text-xs font-bold rounded-md transition-colors cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>Retry Loading Map</span>
            </button>
          </div>
        ) : (
          /* Main Two-Column Layout (30% Left Panel / 70% Map Canvas) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Control & Info Panel (12 cols mobile, 4 cols desktop = ~33%) */}
            <div className="lg:col-span-4 flex flex-col gap-3.5 order-2 lg:order-1">
              {/* Search Bar */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                  Quick Search
                </span>
                <MapSearch
                  locations={allLocations}
                  onSelectLocation={handleSelectLocation}
                  selectedLocation={selectedLocation}
                />
              </div>

              {/* Category Filters */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-700">
                    Category Filter
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Showing {visibleLocations.length} of {allLocations.length}
                  </span>
                </div>
                <MapFilters
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  counts={counts}
                />
              </div>

              {/* Selected Location Info Card */}
              <MapInfoPanel
                selectedLocation={selectedLocation}
                onClearSelection={() => setSelectedLocation(null)}
              />

              {/* Map Legend */}
              <MapLegend />
            </div>

            {/* Right Map Canvas (12 cols mobile, 8 cols desktop = ~67%) */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <MapCanvas
                locations={visibleLocations}
                polyline={polyline}
                selectedLocation={selectedLocation}
                onSelectLocation={handleSelectLocation}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
