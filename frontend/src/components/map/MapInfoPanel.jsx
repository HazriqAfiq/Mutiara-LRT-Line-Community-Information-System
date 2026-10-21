/**
 * components/map/MapInfoPanel.jsx
 *
 * Left-panel card displaying detailed information for the currently
 * selected map marker, with direct action buttons (e.g. View Road Closure Details).
 */
import { Link } from 'react-router-dom';
import {
  Train,
  HardHat,
  AlertTriangle,
  MapPin,
  Calendar,
  Route,
  ArrowRight,
  Info,
  CheckCircle2,
  X,
} from 'lucide-react';

export default function MapInfoPanel({ selectedLocation, onClearSelection }) {
  if (!selectedLocation) {
    return (
      <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 text-center">
        <div className="w-10 h-10 rounded-full bg-slate-200/60 text-slate-400 flex items-center justify-center mx-auto mb-2">
          <Info size={18} />
        </div>
        <h4 className="text-xs font-bold text-slate-700 mb-1">Select a Location on the Map</h4>
        <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs mx-auto">
          Click any station pin, construction zone, or road closure notice to view detailed traffic advisories and engineering updates.
        </p>
      </div>
    );
  }

  const { type } = selectedLocation;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs relative transition-all">
      {/* Close button */}
      <button
        type="button"
        onClick={onClearSelection}
        className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        aria-label="Deselect location"
      >
        <X size={14} />
      </button>

      {/* Header based on type */}
      {type === 'station' && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-[#16A6A1] border border-teal-200/60">
              <Train size={11} />
              <span>STATION</span>
            </span>
            {selectedLocation.code && (
              <span className="text-[10px] font-mono font-bold text-slate-400">
                {selectedLocation.code}
              </span>
            )}
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 ml-auto mr-6">
              {selectedLocation.status || 'Gazetted'}
            </span>
          </div>

          <h3 className="font-bold text-sm text-[#12375B] mb-1 leading-snug">
            {selectedLocation.name}
          </h3>
          <p className="text-[11px] text-slate-500 flex items-center gap-1 mb-3">
            <MapPin size={12} className="text-slate-400 flex-shrink-0" />
            <span className="truncate">{selectedLocation.location}</span>
          </p>

          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            {selectedLocation.description}
          </p>

          {selectedLocation.interchange && (
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-[11px] text-slate-700 mb-2">
              <span className="font-bold block text-slate-800 mb-0.5">Intermodal Connectivity:</span>
              <span>{selectedLocation.interchange}</span>
            </div>
          )}

          <div className="text-[10px] text-slate-400 pt-1">
            <span>Alignment: {selectedLocation.zone || 'Penang LRT Mutiara Line'}</span>
          </div>
        </div>
      )}

      {type === 'construction_zone' && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-[#B45309] border border-amber-200">
              <HardHat size={11} />
              <span>CONSTRUCTION ZONE</span>
            </span>
            {selectedLocation.code && (
              <span className="text-[10px] font-mono font-bold text-slate-400">
                {selectedLocation.code}
              </span>
            )}
          </div>

          <h3 className="font-bold text-sm text-[#12375B] mb-1 leading-snug">
            {selectedLocation.name}
          </h3>
          <p className="text-[11px] text-slate-500 flex items-center gap-1 mb-3">
            <MapPin size={12} className="text-slate-400 flex-shrink-0" />
            <span className="truncate">{selectedLocation.location}</span>
          </p>

          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            {selectedLocation.description}
          </p>

          <div className="space-y-1.5 text-[11px] bg-amber-50/50 border border-amber-200/60 rounded-lg p-2.5 mb-2">
            <div className="flex items-center gap-1.5 text-slate-700">
              <Calendar size={12} className="text-[#B45309] flex-shrink-0" />
              <span><strong>Timeline:</strong> {selectedLocation.period}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle2 size={12} className="text-[#B45309] flex-shrink-0" />
              <span><strong>Status:</strong> {selectedLocation.status}</span>
            </div>
          </div>

          {selectedLocation.safetyNotice && (
            <p className="text-[10px] text-amber-800 bg-amber-100/60 p-2 rounded-lg font-medium leading-relaxed">
              ⚠️ {selectedLocation.safetyNotice}
            </p>
          )}
        </div>
      )}

      {type === 'road_closure' && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-[#EF4444] border border-red-200">
              <AlertTriangle size={11} />
              <span>TRAFFIC ADVISORY</span>
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ml-auto mr-6 ${
                selectedLocation.status === 'active'
                  ? 'bg-red-100 text-red-800'
                  : selectedLocation.status === 'scheduled'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {selectedLocation.status}
            </span>
          </div>

          <h3 className="font-bold text-sm text-[#12375B] mb-1 leading-snug">
            {selectedLocation.name}
          </h3>
          <p className="text-[11px] text-slate-500 flex items-center gap-1 mb-2.5">
            <MapPin size={12} className="text-slate-400 flex-shrink-0" />
            <span className="truncate">{selectedLocation.location}</span>
          </p>

          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            {selectedLocation.description}
          </p>

          {/* Dates & Alternative Route */}
          <div className="space-y-1.5 bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-[11px] mb-3">
            <div className="flex items-center gap-1.5 text-slate-700">
              <Calendar size={12} className="text-slate-400 flex-shrink-0" />
              <span>
                <strong>Period:</strong> {selectedLocation.start_date} → {selectedLocation.end_date}
              </span>
            </div>
            {selectedLocation.alternative_route && (
              <div className="flex items-start gap-1.5 text-slate-700">
                <Route size={12} className="text-[#16A6A1] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Detour:</strong> {selectedLocation.alternative_route}
                </span>
              </div>
            )}
          </div>

          {/* View Details button navigating to existing details page */}
          {selectedLocation.road_closure_id && (
            <Link
              to={`/road-closures/${selectedLocation.road_closure_id}`}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#12375B] hover:bg-[#1a4e7a] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
            >
              <span>View Full Road Closure Notice</span>
              <ArrowRight size={13} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
