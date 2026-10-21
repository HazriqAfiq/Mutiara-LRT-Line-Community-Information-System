/**
 * components/common/AnnouncementCard.jsx
 *
 * Editorial card matching the reference design layout:
 * - High-res rail infrastructure image
 * - Top-left category badge pill (Blue, Green, Yellow)
 * - Date row with calendar icon
 * - Bold navy title
 * - Location with pin icon
 * - Description excerpt
 * - "Read More →" link
 */
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

const CATEGORY_STYLES = {
  'Construction Progress': 'bg-[#0284C7] text-white',
  'General Update': 'bg-[#10B981] text-white',
  'Public Notice': 'bg-[#F59E0B] text-white',
  'Safety Advisory': 'bg-[#EF4444] text-white',
};

const CATEGORY_IMAGES = {
  'Construction Progress': '/images/construction_viaduct.jpg',
  'General Update': '/images/hero_lrt.jpg',
  'Public Notice': '/images/traffic_detour.jpg',
  'Safety Advisory': '/images/station_design.jpg',
};

export default function AnnouncementCard({ announcement, compact = false }) {
  const {
    id,
    title,
    category,
    location,
    description,
    created_at,
    image_url,
  } = announcement;

  const displayImage = image_url || CATEGORY_IMAGES[category] || '/images/construction_viaduct.jpg';
  const badgeClass = CATEGORY_STYLES[category] || 'bg-[#009688] text-white';

  return (
    <article
      className="bg-white overflow-hidden flex flex-col h-full border border-gray-200 rounded-lg hover:border-gray-300 transition-colors shadow-sm"
    >
      {/* Image Header with Category Badge */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden flex-shrink-0">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Top-left Category Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`inline-block px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider ${badgeClass}`}>
            {category}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Date Row */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
          <Calendar size={13} className="text-gray-400" />
          <span>{formatDate(created_at)}</span>
        </div>

        {/* Title */}
        <h3
          className="font-bold text-[#12375B] mb-2 leading-snug hover:text-[#16A6A1] transition-colors"
          style={{
            fontSize: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </h3>

        {/* Location Row */}
        {location && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3 font-medium">
            <MapPin size={13} className="text-[#16A6A1] flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}

        {/* Excerpt */}
        <p
          className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 flex-1"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: compact ? 2 : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </p>

        {/* Read More Link */}
        <div className="pt-2 mt-auto border-t border-gray-100">
          <Link
            to={`/announcements/${id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#12375B] hover:text-[#16A6A1] transition-colors focus:outline-none focus:underline"
          >
            <span>Read Full Notice</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}
