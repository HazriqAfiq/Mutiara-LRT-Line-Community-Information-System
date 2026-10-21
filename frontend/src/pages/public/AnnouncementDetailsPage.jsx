/**
 * pages/public/AnnouncementDetailsPage.jsx
 * Route: /announcements/:id
 *
 * Detailed view for an individual construction announcement.
 * Fetches data via announcementService.getAnnouncement(id).
 * Restricts draft or archived items from public display.
 */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Tag,
  AlertCircle,
  Share2,
  Clock,
  HardHat,
  Info,
} from 'lucide-react';
import { getAnnouncement } from '../../services/announcementService';
import { formatDate, formatDateRange } from '../../utils/dateUtils';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StatusBadge from '../../components/common/StatusBadge';

export default function AnnouncementDetailsPage() {
  const { id } = useParams();

  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchDetails() {
      setLoading(true);
      setError(null);

      // Validate numeric ID
      if (!id || isNaN(Number(id))) {
        setError('Invalid announcement identifier.');
        setLoading(false);
        return;
      }

      try {
        const res = await getAnnouncement(id);
        const data = res.data;

        // Public route safety: only 'published' records may be viewed
        if (data.status !== 'published') {
          if (isMounted) {
            setError('This announcement is currently not publicly available or has been archived.');
          }
          return;
        }

        if (isMounted) {
          setAnnouncement(data);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load announcement:', err);
          const msg =
            err.response?.status === 404
              ? 'Announcement not found. The notice may have expired or been removed.'
              : 'Failed to load announcement details. Please try again.';
          setError(msg);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container max-w-4xl mx-auto px-4">
        {/* Back navigation button */}
        <div className="mb-6">
          <Link
            to="/announcements"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
            style={{ color: 'var(--color-teal)' }}
          >
            <ArrowLeft size={16} /> Back to Announcements
          </Link>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="card p-16 flex justify-center bg-white border border-gray-100 shadow-sm rounded-2xl">
            <LoadingSpinner message="Fetching announcement details..." />
          </div>
        )}

        {/* Error / Not Found state */}
        {!loading && error && (
          <div className="card p-12 text-center bg-white border border-red-200 shadow-sm rounded-2xl max-w-lg mx-auto">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#FEE2E2', color: 'var(--color-error)' }}
            >
              <AlertCircle size={30} />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
              Notice Unavailable
            </h2>
            <p className="text-sm text-gray-600 mb-6">{error}</p>
            <Link to="/announcements" className="btn btn-primary inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Return to Construction Updates
            </Link>
          </div>
        )}

        {/* Announcement Details Content */}
        {!loading && !error && announcement && (
          <article className="card bg-white border border-gray-100 shadow-md rounded-2xl overflow-hidden p-0">
            {/* Top Editorial Photo Banner */}
            <div className="relative w-full h-64 sm:h-80 bg-slate-900 overflow-hidden">
              <img
                src={
                  announcement.image_url ||
                  (announcement.category === 'General Update'
                    ? '/images/station_design.jpg'
                    : announcement.category === 'Public Notice'
                    ? '/images/traffic_detour.jpg'
                    : announcement.category === 'Safety Advisory'
                    ? '/images/hero_lrt.jpg'
                    : '/images/construction_viaduct.jpg')
                }
                alt={announcement.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-black/20" />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-md border border-white/20 shadow-sm">
                  <Tag size={12} className="text-teal-400" />
                  {announcement.category}
                </span>
              </div>
            </div>

            {/* Header / Meta banner */}
            <div
              className="p-6 sm:p-8 border-b"
              style={{
                backgroundColor: 'rgba(18, 55, 91, 0.03)',
                borderColor: 'var(--color-gray-100)',
              }}
            >
              {/* Category, Status & Share */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <StatusBadge status={announcement.status} type="announcement" />
                  <span className="text-xs text-gray-500 font-medium">Notice Ref #{announcement.id}</span>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="btn btn-ghost btn-sm text-xs flex items-center gap-1.5 text-gray-500 hover:text-gray-800"
                >
                  <Share2 size={14} />
                  {copied ? 'Link Copied!' : 'Share Notice'}
                </button>
              </div>

              {/* Title */}
              <h1
                className="text-2xl sm:text-3xl font-extrabold leading-snug mb-4"
                style={{ color: 'var(--color-navy)' }}
              >
                {announcement.title}
              </h1>

              {/* Key metadata grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-200/70 text-xs text-gray-600">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 text-teal-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Location</p>
                    <p>{announcement.location || 'Project Corridor'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock size={16} className="mt-0.5 text-teal-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Published Date</p>
                    <p>{formatDate(announcement.created_at)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar size={16} className="mt-0.5 text-teal-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Active Construction Period</p>
                    <p>{formatDateRange(announcement.start_date, announcement.end_date)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content body */}
            <div className="p-6 sm:p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
                Notice Details
              </h3>

              <div
                className="prose max-w-none text-base leading-relaxed space-y-4"
                style={{ color: 'var(--color-gray-800)' }}
              >
                {announcement.description
                  .split('\n')
                  .filter((p) => p.trim().length > 0)
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </div>

              {/* Timeframe breakdown card */}
              {(announcement.start_date || announcement.end_date) && (
                <div
                  className="mt-8 p-4 rounded-xl border flex items-center justify-between flex-wrap gap-4"
                  style={{
                    backgroundColor: 'var(--color-gray-50)',
                    borderColor: 'var(--color-gray-200)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'var(--color-navy)', color: 'white' }}
                    >
                      <HardHat size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Work Schedule</p>
                      <p className="text-sm font-bold text-gray-800">
                        {formatDate(announcement.start_date)}
                        {announcement.end_date ? ` to ${formatDate(announcement.end_date)}` : ' (Ongoing)'}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                    Active Phase
                  </span>
                </div>
              )}

              {/* Inquiries / Feedback Callout */}
              <div
                className="mt-8 p-5 rounded-xl border flex items-start gap-3"
                style={{
                  backgroundColor: 'rgba(244, 185, 66, 0.1)',
                  borderColor: 'rgba(244, 185, 66, 0.4)',
                }}
              >
                <Info size={20} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-amber-dark)' }} />
                <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  <p className="font-bold mb-1" style={{ color: 'var(--color-navy)' }}>
                    Questions or Concerns Regarding this Work Area?
                  </p>
                  <p className="mb-3">
                    If this activity disrupts your premises, creates excessive dust, or interferes with driveway access,
                    please log a feedback ticket with our community liaison team.
                  </p>
                  <Link to="/feedback/new" className="btn btn-primary btn-sm inline-flex items-center gap-1.5">
                    Submit Community Feedback
                  </Link>
                </div>
              </div>

              {/* Bottom Back Button */}
              <div className="pt-8 mt-8 border-t border-gray-100 flex items-center justify-between">
                <Link to="/announcements" className="btn btn-outline btn-sm inline-flex items-center gap-1.5">
                  <ArrowLeft size={14} /> Back to Announcements
                </Link>
                <Link to="/road-closures" className="btn btn-ghost btn-sm text-xs text-gray-600 hover:text-gray-900">
                  Check Related Road Closures →
                </Link>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
