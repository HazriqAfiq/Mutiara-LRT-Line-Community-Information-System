/**
 * components/common/AnnouncementCard.jsx
 *
 * Reusable card for displaying a construction announcement.
 * Used on both the HomePage (compact) and AnnouncementsPage (full).
 *
 * Props:
 *   announcement  {object}   - Announcement data object
 *   compact       {boolean}  - If true, trims description to fewer lines
 */
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Tag, ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatDate } from '../../utils/dateUtils';

export default function AnnouncementCard({ announcement, compact = false }) {
  const {
    id,
    title,
    category,
    location,
    description,
    status,
    created_at,
  } = announcement;

  return (
    <article className="card card-hover flex flex-col h-full">
      {/* Category + Status row */}
      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <span
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide"
          style={{ color: 'var(--color-teal)' }}
        >
          <Tag size={11} />
          {category}
        </span>
        {/* Only show status on admin/detail views; on public listing hide draft/archived */}
        {status === 'published' ? null : (
          <StatusBadge status={status} type="announcement" />
        )}
      </div>

      {/* Title */}
      <h3
        className="font-bold mb-2 leading-snug"
        style={{
          color: 'var(--color-navy)',
          fontSize: compact ? '1rem' : '1.05rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {title}
      </h3>

      {/* Meta row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
        {location && (
          <span
            className="flex items-center gap-1 text-xs"
            style={{ color: 'var(--color-gray-500)' }}
          >
            <MapPin size={12} />
            {location}
          </span>
        )}
        <span
          className="flex items-center gap-1 text-xs"
          style={{ color: 'var(--color-gray-500)' }}
        >
          <Calendar size={12} />
          {formatDate(created_at)}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-sm flex-1 mb-4"
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

      {/* Read More link */}
      <Link
        to={`/announcements/${id}`}
        className="btn btn-outline btn-sm self-start flex items-center gap-1 mt-auto"
        aria-label={`Read more about: ${title}`}
      >
        Read More <ArrowRight size={14} />
      </Link>
    </article>
  );
}
