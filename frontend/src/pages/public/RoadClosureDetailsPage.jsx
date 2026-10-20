/**
 * pages/public/RoadClosureDetailsPage.jsx
 * Route: /road-closures/:id
 *
 * Detailed traffic advisory page for a single road closure.
 * Displays road name, full description, alternative detour route,
 * pedestrian access information, and safety guidelines.
 */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Navigation,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Footprints,
  Info,
  Share2,
} from 'lucide-react';
import { getRoadClosure } from '../../services/roadClosureService';
import { formatDate, formatDateRange } from '../../utils/dateUtils';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StatusBadge from '../../components/common/StatusBadge';

export default function RoadClosureDetailsPage() {
  const { id } = useParams();

  const [closure, setClosure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchClosureDetail() {
      setLoading(true);
      setError(null);

      if (!id || isNaN(Number(id))) {
        setError('Invalid road closure notice ID.');
        setLoading(false);
        return;
      }

      try {
        const res = await getRoadClosure(id);
        if (isMounted) {
          setClosure(res.data);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load road closure:', err);
          const msg =
            err.response?.status === 404
              ? 'Road closure notice not found. It may have concluded or been removed.'
              : 'Failed to load traffic advisory. Please try again later.';
          setError(msg);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchClosureDetail();

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
    <div className="min-h-screen py-10" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container max-w-4xl mx-auto px-4">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/road-closures"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
            style={{ color: 'var(--color-teal)' }}
          >
            <ArrowLeft size={16} /> Back to Road Closures
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="card p-16 flex justify-center bg-white border border-gray-100 shadow-sm rounded-2xl">
            <LoadingSpinner message="Loading traffic advisory details..." />
          </div>
        )}

        {/* Error / Not Found */}
        {!loading && error && (
          <div className="card p-12 text-center bg-white border border-red-200 shadow-sm rounded-2xl max-w-lg mx-auto">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#FEE2E2', color: 'var(--color-error)' }}
            >
              <AlertTriangle size={30} />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
              Advisory Not Found
            </h2>
            <p className="text-sm text-gray-600 mb-6">{error}</p>
            <Link to="/road-closures" className="btn btn-primary inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Return to Road Closures
            </Link>
          </div>
        )}

        {/* Details Card */}
        {!loading && !error && closure && (
          <article className="card bg-white border border-gray-100 shadow-md rounded-2xl overflow-hidden">
            {/* Header banner */}
            <div
              className="p-6 sm:p-8 border-b"
              style={{
                backgroundColor: 'rgba(18, 55, 91, 0.03)',
                borderColor: 'var(--color-gray-100)',
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ backgroundColor: 'rgba(18, 55, 91, 0.1)', color: 'var(--color-navy)' }}
                  >
                    <AlertTriangle size={12} />
                    {closure.road_name}
                  </span>
                  <StatusBadge status={closure.status} type="roadClosure" />
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="btn btn-ghost btn-sm text-xs flex items-center gap-1.5 text-gray-500 hover:text-gray-800"
                >
                  <Share2 size={14} />
                  {copied ? 'Link Copied!' : 'Share Advisory'}
                </button>
              </div>

              {/* Title */}
              <h1
                className="text-2xl sm:text-3xl font-extrabold leading-snug mb-4"
                style={{ color: 'var(--color-navy)' }}
              >
                {closure.title}
              </h1>

              {/* Key metadata grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-200/70 text-xs text-gray-600">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 text-teal-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Affected Location</p>
                    <p>{closure.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar size={16} className="mt-0.5 text-teal-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Effective Dates</p>
                    <p>{formatDateRange(closure.start_date, closure.end_date)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock size={16} className="mt-0.5 text-teal-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Last Notice Update</p>
                    <p>{formatDate(closure.updated_at || closure.created_at)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Description */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Closure Description & Context
                </h3>
                <div className="text-base text-gray-700 leading-relaxed space-y-4">
                  {closure.description
                    .split('\n')
                    .filter((p) => p.trim().length > 0)
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
              </div>

              {/* Alternative Route Section (Highlighted) */}
              <div
                className="rounded-xl p-5 border shadow-sm"
                style={{
                  backgroundColor: 'rgba(22, 166, 161, 0.05)',
                  borderColor: 'var(--color-teal)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: 'var(--color-teal)' }}
                  >
                    <Navigation size={16} />
                  </div>
                  <h4 className="text-base font-bold text-gray-900">
                    Suggested Alternative Route / Detour
                  </h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed pl-10">
                  {closure.alternative_route ||
                    'Please follow temporary electronic detour signboards and heed advice from traffic marshals stationed along the perimeter.'}
                </p>
              </div>

              {/* Pedestrian Access Section */}
              <div
                className="rounded-xl p-5 border"
                style={{
                  backgroundColor: 'var(--color-gray-50)',
                  borderColor: 'var(--color-gray-200)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: 'var(--color-navy)' }}
                  >
                    <Footprints size={16} />
                  </div>
                  <h4 className="text-base font-bold text-gray-900">
                    Pedestrian Access & Safety Walkway
                  </h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed pl-10">
                  {closure.pedestrian_access ||
                    'Designated pedestrian walkways are maintained. Do not walk within barricaded civil engineering zones.'}
                </p>
              </div>

              {/* Important Advisory Section */}
              <div
                className="p-5 rounded-xl border flex items-start gap-3"
                style={{
                  backgroundColor: '#FEF3C7',
                  borderColor: '#F59E0B',
                }}
              >
                <Info size={22} className="mt-0.5 text-amber-800 flex-shrink-0" />
                <div className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                  <p className="font-bold mb-1">
                    Important Road Safety & Access Advisory
                  </p>
                  <p className="mb-2">
                    Heavy construction transport vehicles, mobile cranes, and concrete mixers frequently operate
                    in this area. Motorists are urged to reduce driving speeds to 30 km/h and maintain safe braking distances.
                  </p>
                  <p className="font-medium">
                    Emergency response vehicles (Ambulance, Fire & Rescue, Police) retain priority escorted right-of-way through all active work zones at all times.
                  </p>
                </div>
              </div>

              {/* Bottom Back Button & Inquiries Link */}
              <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <Link to="/road-closures" className="btn btn-outline btn-sm inline-flex items-center gap-1.5">
                  <ArrowLeft size={14} /> Back to Road Closures
                </Link>

                <div className="flex items-center gap-3">
                  <Link
                    to="/feedback/new"
                    className="btn btn-secondary btn-sm inline-flex items-center gap-1.5"
                  >
                    Report Traffic Issue
                  </Link>
                </div>
              </div>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
