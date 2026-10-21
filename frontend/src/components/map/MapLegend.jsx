/**
 * components/map/MapLegend.jsx
 *
 * Visual map legend adhering to the official project color palette:
 * - Teal: LRT Stations & Alignment
 * - Amber: Construction Zones
 * - Red: Active Road Closures & Traffic Advisories
 */
import { Train, HardHat, AlertTriangle } from 'lucide-react';

export default function MapLegend() {
  return (
    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-[11px] uppercase tracking-wider text-slate-500">
          Map Legend
        </span>
        <span className="text-[10px] text-slate-400">Penang Mutiara Line</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        {/* Stations */}
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#16A6A1] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Train size={11} strokeWidth={2.5} />
          </span>
          <span className="text-slate-700 font-medium">LRT Station</span>
        </div>

        {/* Construction Zones */}
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#F4B942] text-[#12375B] flex items-center justify-center flex-shrink-0 shadow-xs font-bold">
            <HardHat size={11} strokeWidth={2.5} />
          </span>
          <span className="text-slate-700 font-medium">Work Zone</span>
        </div>

        {/* Road Closures */}
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#EF4444] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <AlertTriangle size={11} strokeWidth={2.5} />
          </span>
          <span className="text-slate-700 font-medium">Road Closure</span>
        </div>

        {/* LRT Alignment */}
        <div className="flex items-center gap-2">
          <span className="w-5 flex items-center justify-center flex-shrink-0">
            <span className="w-4 h-0.5 border-t-2 border-dashed border-[#16A6A1]" />
          </span>
          <span className="text-slate-700 font-medium">29.5 km Route</span>
        </div>
      </div>
    </div>
  );
}
