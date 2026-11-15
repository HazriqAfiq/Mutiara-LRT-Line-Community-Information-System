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
import { MapPin, Clock, ArrowRight } from 'lucide-react';
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
      className="bg-white p-5 sm:p-6 flex flex-col h-full border border-gray-200 rounded-lg hover:border-gray-300 transition-colors shadow-sm"
    >
      {/* Top Row: Status */}
      <div className="flex items-center justify-between gap-2 mb-3">
        {/* Status */}
        {isActive && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#DC2626]">
            ACTIVE CLOSURE
          </span>
        )}
        {isScheduled && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB]">
            SCHEDULED CLOSURE
          </span>
        )}
        {isCompleted && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#475569]">
            COMPLETED
          </span>
        )}
      </div>

      {/* Date Range */}
      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
        <Clock size={13} className="text-gray-400" />
        <span>{formatDateRange(start_date, end_date)}</span>
      </div>

      {/* Road Name Title */}
      <Link to={`/road-closures/${id}`}>
        <h3 className="font-bold text-[#12375B] text-base mb-1 leading-snug hover:text-[#16A6A1] transition-colors cursor-pointer">
          {road_name || title}
        </h3>
      </Link>

      {/* Location */}
      {location && (
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3 font-medium">
          <MapPin size={13} className="text-[#16A6A1] flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
      )}

      {/* Description */}
      <p
        className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 flex-1"
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
      <div className="pt-2 mt-auto border-t border-gray-100">
        <Link
          to={`/road-closures/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12375B] hover:text-[#16A6A1] transition-colors focus:outline-none focus:underline"
        >
          <span>View Detour Details</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
