/**
 * components/map/MapCanvas.jsx
 *
 * Interactive Leaflet Map Canvas using React-Leaflet and OpenStreetMap tiles.
 * Renders custom SVG divIcons for Stations, Construction Zones, and Road Closures,
 * alongside the gazetted Mutiara Line teal route polyline.
 */
import { useEffect, useRef, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import {
  Train,
  HardHat,
  AlertTriangle,
  MapPin,
  Calendar,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

// Default Penang map center (midpoint between George Town and Bayan Lepas corridor)
const PENANG_CENTER = [5.350, 100.305];
const DEFAULT_ZOOM = 12;

// Custom SVG-based Leaflet DivIcons (avoids missing asset paths in Vite)
function getMarkerIcon(type) {
  if (type === 'station') {
    return L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background: #16A6A1;
          border: 2.5px solid #FFFFFF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(22, 166, 161, 0.45);
          color: #FFFFFF;
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect width="16" height="16" x="4" y="3" rx="2"/>
            <path d="M4 11h16"/>
            <path d="M12 3v8"/>
            <path d="m8 19-2 3"/>
            <path d="m18 22-2-3"/>
            <circle cx="8" cy="15" r="1"/>
            <circle cx="16" cy="15" r="1"/>
          </svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -20],
    });
  }

  if (type === 'construction_zone') {
    return L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background: #F4B942;
          border: 2.5px solid #FFFFFF;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(244, 185, 66, 0.5);
          color: #12375B;
        ">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/>
            <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/>
            <path d="M4 15v-3a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v3"/>
          </svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -20],
    });
  }

  // Road Closure (Default warning red)
  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: #EF4444;
        border: 2.5px solid #FFFFFF;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 14px rgba(239, 68, 68, 0.5);
        color: #FFFFFF;
      ">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -20],
  });
}

/**
 * Controller subcomponent to handle camera fly-to animations and popup triggers
 */
function MapController({ selectedLocation }) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation?.latitude && selectedLocation?.longitude) {
      map.flyTo([selectedLocation.latitude, selectedLocation.longitude], 14, {
        duration: 1.1,
        easeLinearity: 0.25,
      });
    }
  }, [selectedLocation, map]);

  return null;
}

export default function MapCanvas({
  locations = [],
  polyline = [],
  selectedLocation,
  onSelectLocation,
}) {
  const markerRefs = useRef({});

  // When selectedLocation changes, open its popup automatically
  useEffect(() => {
    if (selectedLocation?.id && markerRefs.current[selectedLocation.id]) {
      markerRefs.current[selectedLocation.id].openPopup();
    }
  }, [selectedLocation]);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[540px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
      <MapContainer
        center={PENANG_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ minHeight: '100%', width: '100%' }}
      >
        <MapController selectedLocation={selectedLocation} />

        {/* OpenStreetMap standard tiles with attribution */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
        />

        {/* Gazetted Mutiara Line Route Polyline */}
        {polyline && polyline.length > 1 && (
          <Polyline
            positions={polyline}
            pathOptions={{
              color: '#16A6A1',
              weight: 4.5,
              opacity: 0.85,
              dashArray: '6, 8',
              lineCap: 'round',
            }}
          />
        )}

        {/* Map Markers */}
        {locations.map((loc) => {
          if (!loc.latitude || !loc.longitude) return null;

          const icon = getMarkerIcon(loc.type);

          return (
            <Marker
              key={loc.id}
              position={[loc.latitude, loc.longitude]}
              icon={icon}
              ref={(ref) => {
                if (ref) markerRefs.current[loc.id] = ref;
              }}
              eventHandlers={{
                click: () => onSelectLocation(loc),
              }}
            >
              <Popup className="custom-popup" maxWidth={280}>
                <div className="p-3.5 text-left text-slate-800">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    {loc.type === 'station' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#16A6A1] bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                        <Train size={11} />
                        <span>STATION</span>
                      </span>
                    )}
                    {loc.type === 'construction_zone' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#B45309] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <HardHat size={11} />
                        <span>WORK ZONE</span>
                      </span>
                    )}
                    {loc.type === 'road_closure' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#EF4444] bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                        <AlertTriangle size={11} />
                        <span>ROAD CLOSURE</span>
                      </span>
                    )}

                    <span className="text-[10px] text-slate-500 font-medium">
                      {loc.status || 'Active'}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-bold text-xs text-[#12375B] mb-1 leading-snug">
                    {loc.name}
                  </h4>

                  {/* Location snippet */}
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mb-2">
                    <MapPin size={11} className="text-slate-400 flex-shrink-0" />
                    <span className="truncate">{loc.location || loc.road_name}</span>
                  </p>

                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {loc.description}
                  </p>

                  {/* Road closure specific CTA */}
                  {loc.type === 'road_closure' && loc.road_closure_id && (
                    <Link
                      to={`/road-closures/${loc.road_closure_id}`}
                      className="inline-flex items-center justify-center gap-1 w-full text-center py-1.5 px-2 bg-[#12375B] hover:bg-[#1a4e7a] text-white text-[11px] font-bold rounded-lg transition-colors"
                    >
                      <span>View Advisory Details</span>
                      <ArrowRight size={11} />
                    </Link>
                  )}

                  {/* Select button for other types */}
                  {loc.type !== 'road_closure' && (
                    <button
                      type="button"
                      onClick={() => onSelectLocation(loc)}
                      className="w-full text-center py-1 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded-md transition-colors cursor-pointer"
                    >
                      View in Panel
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
