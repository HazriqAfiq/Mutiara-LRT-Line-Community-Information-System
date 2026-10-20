/**
 * components/common/RoadClosureCard.jsx
 *
 * Reusable card for a road closure / traffic advisory notice.
 * Used on both the HomePage and RoadClosuresPage.
 *
 * Props:
 *   closure   {object}   - Road closure data object
 *   compact   {boolean}  - Shorter description for homepage
 */
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Navigation, ArrowRight, AlertTriangle } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatDateRange } from '../../utils/dateUtils';

// Status-specific left border colour
const STATUS_BORDER = {
  active:    'var(--color-error)',
  scheduled: 'var(--color-info)',
  completed: 'var(--color-success)',
};

export default function RoadClosureCard({ closure, compact = false }) {
  const {
    id,
    title,
    road_name,
    location,
    description,
    start_date,
    end_date,
    alternative_route,
    status,
  } = closure;

  const borderColor = STATUS_BORDER[status] || 'var(--color-gray-300)';

  return (
    <article
      className="card card-hover flex flex-col h-full"
      style={{ borderLeft: `4px solid ${borderColor}` }}
    >
      {/* Status badge + road tag */}
      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <span
          className="flex items-center gap-1 text-xs font-semibold"
          style={{ color: 'var(--color-navy)' }}
        >
          <AlertTriangle size={12} />
          {road_name}
        </span>
        <StatusBadge status={status} type="roadClosure" />
      </div>

      {/* Title */}
      <h3
        className="font-bold mb-2 leading-snug"
        style={{
          color: 'var(--color-navy)',
          fontSize: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {title}
      </h3>

      {/* Location + Date row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
        <span
          className="flex items-center gap-1 text-xs"
          style={{ color: 'var(--color-gray-500)' }}
        >
          <MapPin size={12} />
          {location}
        </span>
        <span
          className="flex items-center gap-1 text-xs"
          style={{ color: 'var(--color-gray-500)' }}
        >
          <Calendar size={12} />
          {formatDateRange(start_date, end_date)}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-sm flex-1 mb-3"
        style={{
          color: 'var(--color-gray-600)',
          display: '-webkit-box',
          WebkitLineClamp: compact ? 2 : 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>

      {/* Alternative route snippet (non-compact only) */}
      {!compact && alternative_route && (
        <div
          className="flex items-start gap-2 text-xs rounded-lg p-2 mb-3"
          style={{
            backgroundColor: 'var(--color-gray-50)',
            color: 'var(--color-gray-600)',
            border: '1px solid var(--color-gray-200)',
          }}
        >
          <Navigation size={12} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-teal)' }} />
          <span className="line-clamp-2">{alternative_route}</span>
        </div>
      )}

      {/* View Details link */}
      <Link
        to={`/road-closures/${id}`}
        className="btn btn-outline-teal btn-sm self-start flex items-center gap-1 mt-auto"
        aria-label={`View details for: ${title}`}
      >
        View Details <ArrowRight size={14} />
      </Link>
    </article>
  );
}
