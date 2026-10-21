/**
 * pages/user/FeedbackDetailsPage.jsx
 * Route: /my-feedback/:id
 *
 * Detailed complaint status and administrator response tracking page.
 * Features:
 *   - Strict access control: verifies that feedback belongs to the logged-in user
 *   - Reference number, category, location, full description, and image attachment preview
 *   - Multi-stage visual timeline (Pending -> In Progress -> Resolved)
 *   - "Responses & Updates" section showing official responses
 *   - Navigation: "Back to My Feedback" and "Submit Another Feedback"
 */
import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  PlusCircle,
  Clock,
  Calendar,
  MapPin,
  Tag,
  ShieldAlert,
  MessageSquare,
  User,
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getFeedback } from '../../services/feedbackService';
import { formatDate } from '../../utils/dateUtils';
import StatusBadge from '../../components/common/StatusBadge';
import FeedbackTimeline from '../../components/common/FeedbackTimeline';
import LoadingSpinner from '../../components/common/LoadingSpinner';

export default function FeedbackDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const location = useLocation();

  // If redirected from successful submission
  const justSubmitted = location.state?.submittedSuccess || false;

  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadFeedbackDetails() {
      setLoading(true);
      setError(null);
      setAccessDenied(false);

      if (!id || isNaN(Number(id))) {
        setError('Invalid complaint identifier.');
        setLoading(false);
        return;
      }

      try {
        const res = await getFeedback(id);
        const data = res.data;

        // Access Control check: user may only inspect their own feedback
        if (user && data.user_id !== user.id && user.role !== 'admin') {
          if (isMounted) {
            setAccessDenied(true);
          }
          return;
        }

        if (isMounted) {
          setFeedback(data);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error loading feedback:', err);
          setError(
            err.response?.status === 404
              ? 'Complaint ticket not found. It may have been archived or removed.'
              : 'Failed to load complaint details. Please try again.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadFeedbackDetails();

    return () => {
      isMounted = false;
    };
  }, [id, user]);

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-16" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container max-w-4xl mx-auto px-4">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            to="/my-feedback"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
            style={{ color: 'var(--color-teal)' }}
          >
            <ArrowLeft size={16} /> Back to My Feedback
          </Link>

          <Link
            to="/feedback/new"
            className="btn btn-outline btn-sm text-xs flex items-center gap-1.5"
          >
            <PlusCircle size={14} /> Submit Another Feedback
          </Link>
        </div>

        {/* Just Submitted Success Banner */}
        {justSubmitted && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 shadow-sm">
            <CheckCircle2 size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
              <p className="font-bold">Feedback Ticket Successfully Logged!</p>
              <p>
                Your report has been queued under reference{' '}
                <span className="font-mono font-bold">{feedback?.reference_number}</span>. Our project
                community liaison team will review the issue and initiate on-site assessment.
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="card p-16 flex justify-center bg-white border border-gray-100 shadow-sm rounded-2xl">
            <LoadingSpinner message="Fetching complaint tracking status..." />
          </div>
        )}

        {/* Access Denied State */}
        {!loading && accessDenied && (
          <div className="card p-12 text-center bg-white border border-red-200 shadow-sm rounded-2xl max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-red-100 text-red-600">
              <ShieldAlert size={30} />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
              Access Restricted
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              You do not have permission to view this feedback ticket. For privacy and data protection,
              residents can only track tickets submitted from their own account.
            </p>
            <Link to="/my-feedback" className="btn btn-primary inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Return to My Feedback
            </Link>
          </div>
        )}

        {/* Error / Not Found State */}
        {!loading && !accessDenied && error && (
          <div className="card p-12 text-center bg-white border border-red-200 shadow-sm rounded-2xl max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-amber-100 text-amber-700">
              <AlertCircle size={30} />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
              Complaint Not Found
            </h2>
            <p className="text-sm text-gray-600 mb-6">{error}</p>
            <Link to="/my-feedback" className="btn btn-primary inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Return to My Feedback
            </Link>
          </div>
        )}

        {/* Details Card */}
        {!loading && !accessDenied && !error && feedback && (
          <div className="space-y-8">
            <article className="card bg-white border border-gray-100 shadow-md rounded-2xl overflow-hidden">
              {/* Header Box */}
              <div
                className="p-6 sm:p-8 border-b"
                style={{
                  backgroundColor: 'rgba(18, 55, 91, 0.03)',
                  borderColor: 'var(--color-gray-100)',
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-sm font-bold text-gray-800 bg-white border border-gray-200 px-3 py-1 rounded-lg shadow-sm">
                      {feedback.reference_number}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{ backgroundColor: 'rgba(22, 166, 161, 0.12)', color: 'var(--color-teal)' }}
                    >
                      <Tag size={12} /> {feedback.category}
                    </span>
                  </div>

                  <StatusBadge status={feedback.status} type="feedback" />
                </div>

                <h1
                  className="text-2xl sm:text-3xl font-extrabold leading-snug mb-4"
                  style={{ color: 'var(--color-navy)' }}
                >
                  {feedback.title}
                </h1>

                {/* Metadata Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200/70 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Location</p>
                      <p>{feedback.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Submitted On</p>
                      <p>{formatDate(feedback.created_at)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock size={16} className="text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">Last Status Update</p>
                      <p>{formatDate(feedback.updated_at || feedback.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Detailed Complaint Description
                  </h3>
                  <div className="text-base text-gray-800 leading-relaxed space-y-3 bg-gray-50/70 p-5 rounded-xl border border-gray-100">
                    {feedback.description
                      .split('\n')
                      .filter((p) => p.trim().length > 0)
                      .map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>
                </div>

                {/* Supporting Image Attachment (if present) */}
                {feedback.attachment_url && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Attached Photographic Evidence
                    </h3>
                    <div className="inline-block p-2 bg-gray-50 rounded-lg border border-gray-200">
                      <img
                        src={feedback.attachment_url}
                        alt="Supporting evidence"
                        className="max-h-72 w-auto object-cover rounded-md shadow-xs"
                      />
                    </div>
                  </div>
                )}

                {/* Status Tracking Stepper */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Resolution Status Progress
                  </h3>
                  <FeedbackTimeline
                    status={feedback.status}
                    createdAt={feedback.created_at}
                    updatedAt={feedback.updated_at}
                  />
                </div>
              </div>
            </article>

            {/* Official Responses Section */}
            <section className="card bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: 'var(--color-navy)' }}
                  >
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold" style={{ color: 'var(--color-navy)' }}>
                      Responses & Updates
                    </h2>
                    <p className="text-xs text-gray-500">
                      Official communication from Penang LRT project coordinators
                    </p>
                  </div>
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                  {feedback.responses?.length || 0}{' '}
                  {feedback.responses?.length === 1 ? 'Response' : 'Responses'}
                </span>
              </div>

              {(!feedback.responses || feedback.responses.length === 0) ? (
                <div className="py-8 text-center text-gray-500 bg-gray-50/70 rounded-xl border border-dashed border-gray-200">
                  <Clock size={28} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm font-semibold text-gray-700">No response has been provided yet.</p>
                  <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                    Your complaint has been submitted and will be reviewed during standard operating hours.
                    Responses will appear here as the liaison team inspects the site.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {feedback.responses.map((resp, i) => (
                    <div
                      key={resp.id || i}
                      className="p-5 rounded-xl border border-teal-100 bg-teal-50/30 space-y-2.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-gray-900 flex items-center gap-1.5">
                          <ShieldCheck size={15} className="text-teal-600" />
                          {resp.admin_name || 'Project Liaison Office'}
                          <span className="font-normal text-gray-500 text-[11px]">
                            (Official Liaison)
                          </span>
                        </span>
                        <span className="text-gray-400">{formatDate(resp.created_at)}</span>
                      </div>

                      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line pl-5 border-l-2 border-teal-400">
                        {resp.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
