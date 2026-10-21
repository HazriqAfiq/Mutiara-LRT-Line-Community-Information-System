/**
 * components/map/MapSearch.jsx
 *
 * In-memory location search across stations, construction zones, and road closures.
 * Selecting a result centers the map and displays marker details.
 */
import { useState, useRef, useEffect } from 'react';
import { Search, X, Train, HardHat, AlertTriangle, MapPin } from 'lucide-react';

export default function MapSearch({ locations, onSelectLocation, selectedLocation }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLocations = query.trim()
    ? locations.filter((loc) => {
        const q = query.toLowerCase();
        const nameMatch = loc.name?.toLowerCase().includes(q);
        const locMatch = loc.location?.toLowerCase().includes(q);
        const roadMatch = loc.road_name?.toLowerCase().includes(q);
        const zoneMatch = loc.zone?.toLowerCase().includes(q);
        return nameMatch || locMatch || roadMatch || zoneMatch;
      }).slice(0, 6)
    : [];

  const handleSelect = (location) => {
    onSelectLocation(location);
    setQuery(location.name);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'station':
        return <Train size={14} className="text-[#16A6A1]" />;
      case 'construction_zone':
        return <HardHat size={14} className="text-[#F4B942]" />;
      case 'road_closure':
        return <AlertTriangle size={14} className="text-[#EF4444]" />;
      default:
        return <MapPin size={14} className="text-slate-400" />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'station':
        return 'LRT Station';
      case 'construction_zone':
        return 'Construction Zone';
      case 'road_closure':
        return 'Road Advisory';
      default:
        return 'Location';
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <label htmlFor="map-location-search" className="sr-only">
        Search station or location
      </label>
      <div className="relative">
        <input
          id="map-location-search"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          placeholder="Search station or location..."
          className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#16A6A1] focus:border-[#16A6A1] text-slate-800 placeholder-slate-400 transition-all"
        />
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Clear search input"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-lg shadow-md z-50 overflow-hidden max-h-64 overflow-y-auto">
          {filteredLocations.length > 0 ? (
            <ul className="divide-y divide-slate-100 py-1">
              {filteredLocations.map((loc) => (
                <li key={loc.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(loc)}
                    className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
                  >
                    <div className="mt-0.5 p-1 rounded-md bg-slate-100 group-hover:bg-white transition-colors">
                      {getIcon(loc.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-800 truncate">
                          {loc.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                          {getTypeLabel(loc.type)}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">
                        {loc.location || loc.road_name}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-xs text-slate-500">
              <MapPin size={18} className="mx-auto text-slate-300 mb-1" />
              <span>No matching locations along the Mutiara Line.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
