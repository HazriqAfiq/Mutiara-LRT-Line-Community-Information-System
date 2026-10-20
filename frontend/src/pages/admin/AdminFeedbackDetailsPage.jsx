/**
 * pages/admin/AdminFeedbackDetailsPage.jsx
 * Route: /admin/feedback/:id
 *
 * Administrator Feedback Review, Status Investigation, and Official Response Portal.
 * Features:
 *   - Comprehensive complaint dossier with photo attachment inspection
 *   - Complainant resident profile summary
 *   - Visual lifecycle timeline sync (Pending -> In Progress -> Resolved)
 *   - Immediate status transition controls
 *   - Official response composer with pre-drafted liaison quick-templates
 *   - Real-time persistence to mutiara_feedback_store & mutiara_responses_store
 */
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  CheckCircle2,
  Clock,
  User,
  Mail,
  MapPin,
  Calendar,
  Tag,
  ShieldAlert,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  Image as ImageIcon,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  getFeedback,
  updateFeedbackStatus,
  addFeedbackResponse,
} from '../../services/feedbackService';
import { getUser, getUserFeedbackCount } from '../../services/userService';
import { formatDate } from '../../utils/dateUtils';
import StatusBadge from '../../components/common/StatusBadge';
import FeedbackTimeline from '../../components/common/FeedbackTimeline';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const QUICK_TEMPLATES = [
  'We have notified the site supervisor and project contractor to investigate this issue immediately.',
  'On-site inspection completed. Noise reduction measures and acoustic curtains have been deployed.',
  'Traffic management team has realigned directional signage and deployed additional flaggers.',
  'Remedial works completed. The affected pedestrian walkway and drainage access are fully restored.',
];

export default function AdminFeedbackDetailsPage() {
  const { id } = useParams();
  const { user: currentAdmin } = useAuth();

  const [feedback, setFeedback]             = useState(null);
  const [complainant, setComplainant]       = useState(null);
  const [userTicketCount, setUserTicketCount] = useState(0);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState(null);

  // Response form state
  const [responseMsg, setResponseMsg]     = useState('');
  const [targetStatus, setTargetStatus]   = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const [updatingStatus, setUpdatingStatus]   = useState(false);
  const [bannerNotice, setBannerNotice]   = useState(null);

  const loadData = async () => {
    try {
      const res = await getFeedback(id);
      const fbData = res.data;
      setFeedback(fbData);
      setTargetStatus(fbData.status);

      // Load complainant resident profile
      if (fbData.user_id) {
        try {
          const [uRes, countRes] = await Promise.all([
            getUser(fbData.user_id),
            getUserFeedbackCount(fbData.user_id),
          ]);
          setComplainant(uRes.data);
          setUserTicketCount(countRes.count);
        } catch (uErr) {
          console.warn('Resident profile not found:', uErr);
        }
      }
    } catch (err) {
      console.error('Failed to load feedback details:', err);
      setError('Complaint ticket not found or failed to load.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  // Handle direct status change
  const handleStatusChange = async (newStatus) => {
    if (newStatus === feedback.status) return;
    setUpdatingStatus(true);
    setBannerNotice(null);
    try {
      await updateFeedbackStatus(id, newStatus);
      setFeedback((prev) => ({
        ...prev,
        status: newStatus,
        updated_at: new Date().toISOString(),
      }));
      setTargetStatus(newStatus);
      setBannerNotice({
        type: 'success',
        text: `Complaint status updated to "${newStatus.replace('_', ' ').toUpperCase()}".`,
      });
    } catch (err) {
      console.error('Failed to update status:', err);
      setBannerNotice({
        type: 'error',
        text: 'Failed to update complaint status. Please try again.',
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Handle post liaison response
  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    if (!responseMsg.trim()) return;

    setSubmittingReply(true);
    setBannerNotice(null);

    try {
      const adminIdentity = {
        id: currentAdmin?.id || 1,
        name: currentAdmin?.name || 'Community Liaison Officer',
      };

      // 1. Post the response
      await addFeedbackResponse(id, responseMsg.trim(), adminIdentity);

      // 2. If status was changed in the dropdown during reply
      if (targetStatus && targetStatus !== feedback.status) {
        await updateFeedbackStatus(id, targetStatus);
      }

      setResponseMsg('');
      setBannerNotice({
        type: 'success',
        text: 'Official liaison response posted and logged to ticket.',
      });

      // Reload updated thread and timestamps
      await loadData();
    } catch (err) {
      console.error('Failed to post response:', err);
      setBannerNotice({
        type: 'error',
        text: 'Could not post response. Please check connection.',
      });
    } finally {
      setSubmittingReply(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <LoadingSpinner message="Loading complaint dossier..." />
      </div>
    );
  }

  if (error || !feedback) {
    return (
      <div className="p-8 max-w-lg mx-auto text-center card bg-white border border-red-200 mt-8 rounded-2xl">
        <AlertCircle size={36} className="text-red-500 mx-auto mb-3" />
        <h3 className="text-base font-bold text-gray-900 mb-2">Complaint Not Found</h3>
        <p className="text-xs text-gray-600 mb-4">{error || 'Unable to retrieve ticket.'}</p>
        <Link to="/admin/feedback" className="btn btn-outline btn-sm text-xs">
          ← Back to Feedback List
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/feedback"
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            title="Return to feedback list"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {feedback.reference_number}
              </span>
              <StatusBadge status={feedback.status} type="feedback" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">
              {feedback.title}
            </h2>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-left sm:text-right">
          <div>
            Logged on: <span className="font-semibold">{formatDate(feedback.created_at)}</span>
          </div>
          {feedback.updated_at && feedback.updated_at !== feedback.created_at && (
            <div className="text-[11px] text-gray-400">
              Last updated: {formatDate(feedback.updated_at)}
            </div>
          )}
        </div>
      </div>

      {/* Banner Notice */}
      {bannerNotice && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 shadow-xs ${
            bannerNotice.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-red-50 border-red-200 text-red-900'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-medium">
            {bannerNotice.type === 'success' ? (
              <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
            )}
            <span>{bannerNotice.text}</span>
          </div>
          <button
            onClick={() => setBannerNotice(null)}
            className="text-xs font-bold hover:underline opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Primary Column (Complaint details, timeline, responses) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Complaint Details Card */}
          <div className="card bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full">
                <Tag size={12} /> {feedback.category}
              </span>

              <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                <MapPin size={12} className="text-gray-400" />
                <span className="font-semibold text-gray-700">{feedback.location}</span>
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Detailed Complaint Description
              </h4>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                {feedback.description}
              </p>
            </div>

            {/* Photo Attachment if present */}
            {feedback.attachment_url && (
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                  <ImageIcon size={13} /> Photographic Evidence Attached by Resident
                </h4>
                <div className="rounded-xl overflow-hidden border border-gray-200 max-w-md bg-gray-900 group relative">
                  <img
                    src={feedback.attachment_url}
                    alt="Complaint photo evidence"
                    className="w-full max-h-72 object-cover transition-opacity group-hover:opacity-90"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <a
                    href={feedback.attachment_url}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/70 text-white text-[11px] font-medium flex items-center gap-1 hover:bg-black transition-colors"
                  >
                    <ExternalLink size={11} /> Open Full Size
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Visual Lifecycle Stepper */}
          <div className="card bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Ticket Resolution Lifecycle
            </h4>
            <FeedbackTimeline
              status={feedback.status}
              createdAt={feedback.created_at}
              updatedAt={feedback.updated_at}
            />
          </div>

          {/* Responses & Liaison Discussion Thread */}
          <div className="card bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare size={17} className="text-teal-600" />
                <h3 className="text-sm font-bold text-gray-900">
                  Official Responses & Investigation Notes
                </h3>
              </div>
              <span className="text-xs text-gray-500 font-semibold">
                {feedback.responses?.length || 0} response(s) logged
              </span>
            </div>

            {/* Thread Entries */}
            {(!feedback.responses || feedback.responses.length === 0) ? (
              <div className="text-center py-6 text-gray-400 text-xs bg-gray-50 rounded-xl border border-dashed border-gray-200">
                No official responses have been published to this resident yet.
              </div>
            ) : (
              <div className="space-y-4">
                {feedback.responses.map((resp) => (
                  <div
                    key={resp.id}
                    className="p-4 rounded-xl bg-teal-50/30 border border-teal-100 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center">
                          PL
                        </div>
                        <span className="text-xs font-bold text-gray-900">
                          {resp.admin_name || 'Penang LRT Liaison Officer'}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-100 px-1.5 py-0.5 rounded">
                          Official Reply
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400">
                        {formatDate(resp.created_at)}
                      </span>
                    </div>

                    <p className="text-xs text-gray-700 whitespace-pre-line leading-relaxed pl-8">
                      {resp.message}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Post Liaison Response Form */}
            <form onSubmit={handleSubmitResponse} className="pt-4 border-t border-gray-100 space-y-3">
              <label
                htmlFor="admin-reply-box"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700"
              >
                Post New Official Liaison Response
              </label>

              {/* Quick Template Chips */}
              <div>
                <span className="text-[11px] text-gray-400 flex items-center gap-1 mb-1.5">
                  <Sparkles size={11} className="text-amber-500" /> Insert quick template:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_TEMPLATES.map((tmpl, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setResponseMsg(tmpl)}
                      className="text-[11px] text-left bg-gray-100 hover:bg-teal-50 hover:text-teal-800 text-gray-700 px-2 py-1 rounded-md border border-gray-200 transition-colors"
                    >
                      "{tmpl.slice(0, 42)}..."
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                id="admin-reply-box"
                rows={4}
                value={responseMsg}
                onChange={(e) => setResponseMsg(e.target.value)}
                placeholder="Compose official liaison update to the resident..."
                className="form-input text-xs resize-y"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs">
                  <label htmlFor="reply-status-sync" className="text-gray-500 font-medium">
                    Update status to:
                  </label>
                  <select
                    id="reply-status-sync"
                    value={targetStatus}
                    onChange={(e) => setTargetStatus(e.target.value)}
                    className="form-select text-xs py-1 px-2.5 w-auto"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submittingReply || !responseMsg.trim()}
                  className="btn btn-primary btn-sm flex items-center justify-center gap-1.5 font-bold shadow-xs text-xs px-4"
                >
                  {submittingReply ? (
                    'Sending Reply...'
                  ) : (
                    <>
                      <Send size={13} /> Publish Official Response
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right / Sidebar Column (Status controls & Resident summary) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Quick Switcher */}
          <div className="card bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Immediate Status Control
            </h4>

            <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
              <span className="text-xs text-gray-600 font-medium">Current Status:</span>
              <StatusBadge status={feedback.status} type="feedback" />
            </div>

            <div className="space-y-2">
              <button
                type="button"
                disabled={updatingStatus || feedback.status === 'in_progress'}
                onClick={() => handleStatusChange('in_progress')}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border ${
                  feedback.status === 'in_progress'
                    ? 'bg-teal-50 text-teal-700 border-teal-300 opacity-60 cursor-default'
                    : 'bg-white text-teal-700 border-teal-300 hover:bg-teal-50'
                }`}
              >
                <ShieldAlert size={14} /> Set as "In Progress"
              </button>

              <button
                type="button"
                disabled={updatingStatus || feedback.status === 'resolved'}
                onClick={() => handleStatusChange('resolved')}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border ${
                  feedback.status === 'resolved'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 opacity-60 cursor-default'
                    : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                <Check size={14} /> Mark as "Resolved"
              </button>

              {feedback.status !== 'pending' && (
                <button
                  type="button"
                  disabled={updatingStatus}
                  onClick={() => handleStatusChange('pending')}
                  className="w-full py-2 px-3 rounded-xl text-xs font-medium text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw size={13} /> Reopen as Pending
                </button>
              )}
            </div>
          </div>

          {/* Complainant Resident Profile Card */}
          <div className="card bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Complainant Profile
            </h4>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-base">
                {complainant?.name
                  ? complainant.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()
                  : 'R'}
              </div>

              <div className="min-w-0">
                <h4 className="text-sm font-bold text-gray-900 truncate">
                  {complainant?.name || 'Registered Resident'}
                </h4>
                <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
                  <Mail size={11} className="text-gray-400" />
                  {complainant?.email || 'N/A'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Account Role</span>
                <span className="font-semibold capitalize text-gray-800">
                  {complainant?.role || 'Community Resident'}
                </span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-gray-500">Total Submissions</span>
                <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  {userTicketCount} complaints
                </span>
              </div>

              {complainant?.created_at && (
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Member Since</span>
                  <span className="text-gray-700">{formatDate(complainant.created_at)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
