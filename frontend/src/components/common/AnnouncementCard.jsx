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
      className="bg-white overflow-hidden flex flex-col h-full group hover:shadow-md transition-all duration-200"
      style={{ borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
    >
      {/* Image Header with Category Badge */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden flex-shrink-0">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Top-left Category Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${badgeClass}`}>
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
          className="font-bold text-[#0F2C59] mb-2 leading-snug group-hover:text-[#009688] transition-colors"
          style={{
            fontSize: '1.05rem',
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
            <MapPin size={13} className="text-[#009688] flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}

        {/* Excerpt */}
        <p
          className="text-xs text-gray-600 leading-relaxed mb-4 flex-1"
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
        <div className="pt-2 mt-auto">
          <Link
            to={`/announcements/${id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0F2C59] hover:text-[#009688] transition-colors"
          >
            <span>Read More</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}
