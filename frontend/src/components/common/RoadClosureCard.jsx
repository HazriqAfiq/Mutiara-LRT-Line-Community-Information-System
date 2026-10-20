/**
 * components/common/RoadClosureCard.jsx
 *
 * Road Closure / Traffic Advisory card matching the reference design layout:
 * - Top row: Status pill badge on left (Active, Scheduled, Completed), Circular icon on right
 * - Date range row with clock/calendar icon
 * - Bold road name title
 * - Location with pin
 * - Brief description
 * - "View Details →" outline button
 */
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, Map, Calendar, CheckCircle2 } from 'lucide-react';
import { formatDateRange } from '../../utils/dateUtils';

export default function RoadClosureCard({ closure, compact = false }) {
  const {
    id,
    title,
    road_name,
    location,
    description,
    start_date,
    end_date,
    status,
  } = closure;

  const isCompleted = status === 'completed';
  const isScheduled = status === 'scheduled';
  const isActive = status === 'active';

  return (
    <article
      className="bg-white p-5 sm:p-6 flex flex-col h-full hover:shadow-md transition-all duration-200"
      style={{ borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
    >
      {/* Top Row: Status Badge & Icon Container */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {/* Status Badge */}
        {isActive && (
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#DC2626] text-white">
            ACTIVE CLOSURE
          </span>
        )}
        {isScheduled && (
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2563EB] text-white">
            SCHEDULED CLOSURE
          </span>
        )}
        {isCompleted && (
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#475569] text-white">
            COMPLETED
          </span>
        )}

        {/* Circular Icon */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
            isActive
              ? 'bg-red-50 text-red-500'
              : isScheduled
              ? 'bg-blue-50 text-blue-500'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {isActive ? (
            <Map size={16} />
          ) : isScheduled ? (
            <Calendar size={16} />
          ) : (
            <CheckCircle2 size={16} />
          )}
        </div>
      </div>

      {/* Date Range */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
        <Clock size={13} className="text-gray-400" />
        <span>{formatDateRange(start_date, end_date)}</span>
      </div>

      {/* Road Name Title */}
      <h3 className="font-bold text-[#0F2C59] text-base sm:text-lg mb-1 leading-snug">
        {road_name || title}
      </h3>

      {/* Location */}
      {location && (
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3 font-medium">
          <MapPin size={13} className="text-red-500 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
      )}

      {/* Description */}
      <p
        className="text-xs text-gray-600 leading-relaxed mb-6 flex-1"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: compact ? 2 : 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {description}
      </p>

      {/* View Details Button */}
      <div className="pt-1 mt-auto">
        <Link
          to={`/road-closures/${id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span>View Details</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
