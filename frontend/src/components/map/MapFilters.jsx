/**
 * components/map/MapFilters.jsx
 *
 * Interactive category filters for the LRT Construction Map:
 * - All
 * - Stations
 * - Construction Zones
 * - Road Closures
 */
import { Train, HardHat, AlertTriangle, Layers } from 'lucide-react';

const FILTERS = [
  { id: 'all', label: 'All', icon: Layers },
  { id: 'station', label: 'Stations', icon: Train },
  { id: 'construction_zone', label: 'Construction', icon: HardHat },
  { id: 'road_closure', label: 'Road Closures', icon: AlertTriangle },
];

export default function MapFilters({ activeFilter, onFilterChange, counts = {} }) {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200/60"
      role="tablist"
      aria-label="Map marker filters"
    >
      {FILTERS.map((f) => {
        const Icon = f.icon;
        const isActive = activeFilter === f.id;
        const count = counts[f.id] ?? 0;

        return (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onFilterChange(f.id)}
            className={`w-full h-9 inline-flex items-center justify-center gap-1.5 px-2 rounded-md text-xs font-semibold transition-all duration-150 cursor-pointer border ${
              isActive
                ? 'bg-white text-[#12375B] shadow-xs font-bold border-slate-200/80'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Icon
              size={13}
              className={`shrink-0 ${isActive ? 'text-[#16A6A1]' : 'text-slate-400'}`}
            />
            <span className="whitespace-nowrap">{f.label}</span>
            {count > 0 && (
              <span
                className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none ${
                  isActive
                    ? 'bg-[#12375B]/10 text-[#12375B]'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
