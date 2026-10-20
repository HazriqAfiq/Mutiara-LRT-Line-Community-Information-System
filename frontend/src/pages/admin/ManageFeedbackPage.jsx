/**
 * pages/admin/ManageFeedbackPage.jsx
 * Route: /admin/feedback
 *
 * Administrator Community Feedback & Complaints Management Portal.
 * Features:
 *   - Stat counters (Total, Pending, In Progress, Resolved)
 *   - Search by Ref No, title, complainant name, or location
 *   - Filter by Category & Status
 *   - User account mapping for complainant names
 *   - Quick action link to review ticket and post official responses
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Search,
  RefreshCw,
  Eye,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Tag,
  MapPin,
  Calendar,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { getAllFeedback } from '../../services/feedbackService';
import { getUsers } from '../../services/userService';
import { formatDate } from '../../utils/dateUtils';
import SearchBar from '../../components/common/SearchBar';
import FilterSelect from '../../components/common/FilterSelect';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories' },
  { value: 'Construction Noise', label: 'Construction Noise' },
  { value: 'Road Access', label: 'Road Access' },
  { value: 'Pedestrian Safety', label: 'Pedestrian Safety' },
  { value: 'Traffic Disruption', label: 'Traffic Disruption' },
  { value: 'Business Access', label: 'Business Access' },
  { value: 'Other', label: 'Other' },
];

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'pending', label: 'Pending Review' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
];

export default function ManageFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [userMap, setUserMap]     = useState({});
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus]     = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [fbRes, usersRes] = await Promise.all([
        getAllFeedback(),
        getUsers(),
      ]);

      const map = {};
      usersRes.data.forEach((u) => {
        map[u.id] = u;
      });
      setUserMap(map);

      let list = fbRes.data;

      // Filter locally for fast search across title, ref no, user name, and location
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        list = list.filter((item) => {
          const userName = map[item.user_id]?.name?.toLowerCase() || '';
          const userEmail = map[item.user_id]?.email?.toLowerCase() || '';
          return (
            item.title.toLowerCase().includes(q) ||
            item.reference_number.toLowerCase().includes(q) ||
            item.location.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            userName.includes(q) ||
            userEmail.includes(q)
          );
        });
      }

      if (category) {
        list = list.filter((item) => item.category === category);
      }

      if (status) {
        list = list.filter((item) => item.status === status);
      }

      setFeedbacks(list);
    } catch (err) {
      console.error('Failed to load feedback tickets:', err);
      setError('Unable to load complaints list. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 200);
    return () => clearTimeout(timer);
  }, [search, category, status]);

  const handleResetFilters = () => {
    setSearch('');
    setCategory('');
    setStatus('');
  };

  const hasActiveFilters = Boolean(search || category || status);

  // Compute overall counts across full dataset
  const totalCount      = feedbacks.length;
  const pendingCount    = feedbacks.filter((f) => f.status === 'pending').length;
  const inProgressCount = feedbacks.filter((f) => f.status === 'in_progress').length;
  const resolvedCount   = feedbacks.filter((f) => f.status === 'resolved').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--color-navy)' }}>
            Community Feedback & Complaints
          </h2>
          <p className="text-xs text-gray-500">
            Review resident complaints, investigate construction impacts, and coordinate official responses.
          </p>
        </div>
      </div>

      {/* Metric Counters Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="card p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <MessageSquare size={18} />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Total Listed
            </div>
            <div className="text-lg font-bold text-gray-900 leading-tight">
              {totalCount}
            </div>
          </div>
        </div>

        <div className="card p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock size={18} />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Pending
            </div>
            <div className="text-lg font-bold text-amber-600 leading-tight">
              {pendingCount}
            </div>
          </div>
        </div>

        <div className="card p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
            <ShieldAlert size={18} />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              In Progress
            </div>
            <div className="text-lg font-bold text-teal-600 leading-tight">
              {inProgressCount}
            </div>
          </div>
        </div>

        <div className="card p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Resolved
            </div>
            <div className="text-lg font-bold text-emerald-600 leading-tight">
              {resolvedCount}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="card p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by Ref # (e.g. FB-0001), title, or resident name..."
              id="admin-feedback-search"
            />
          </div>

          <div className="md:col-span-3">
            <FilterSelect
              value={category}
              onChange={setCategory}
              options={CATEGORY_OPTIONS}
              id="admin-feedback-category"
              label="Filter Category"
            />
          </div>

          <div className="md:col-span-3 flex items-center gap-2">
            <div className="w-full">
              <FilterSelect
                value={status}
                onChange={setStatus}
                options={STATUS_OPTIONS}
                id="admin-feedback-status"
                label="Filter Status"
              />
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="btn btn-ghost btn-sm text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 flex-shrink-0"
                title="Reset filters"
              >
                <RefreshCw size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Results counter */}
        {!loading && !error && (
          <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
            <span>
              Showing <strong>{feedbacks.length}</strong> complaints
              {hasActiveFilters && ' (filtered)'}
            </span>
            <span className="text-gray-400">
              Click on any row or Review & Respond to view details and issue updates.
            </span>
          </div>
        )}
      </div>

      {/* Feedback Table */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner message="Loading community complaints..." />
        </div>
      ) : error ? (
        <div className="card p-8 bg-white border border-red-200 text-center max-w-lg mx-auto">
          <p className="text-sm text-red-600 mb-3">{error}</p>
          <button onClick={fetchData} className="btn btn-outline text-xs">
            Retry
          </button>
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="card p-8 bg-white border border-gray-100">
          <EmptyState
            title="No complaints found"
            message={
              hasActiveFilters
                ? 'No feedback submissions match your active filter settings.'
                : 'No community feedback has been submitted yet.'
            }
            actionLabel={hasActiveFilters ? 'Reset Filters' : undefined}
            onAction={hasActiveFilters ? handleResetFilters : undefined}
          />
        </div>
      ) : (
        <div className="card bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead
                className="text-[11px] uppercase tracking-wider text-gray-500 border-b border-gray-100 font-bold"
                style={{ backgroundColor: 'var(--color-gray-50)' }}
              >
                <tr>
                  <th className="px-5 py-3.5">Ref #</th>
                  <th className="px-5 py-3.5">Complaint Title & Scope</th>
                  <th className="px-5 py-3.5">Resident</th>
                  <th className="px-5 py-3.5">Location</th>
                  <th className="px-5 py-3.5">Submitted</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {feedbacks.map((item) => {
                  const complainant = userMap[item.user_id];
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-teal-50/20 transition-colors"
                    >
                      <td className="px-5 py-3.5 font-mono font-bold text-gray-900 whitespace-nowrap">
                        <Link
                          to={`/admin/feedback/${item.id}`}
                          className="hover:text-teal-600 underline-offset-2 hover:underline"
                        >
                          {item.reference_number}
                        </Link>
                      </td>

                      <td className="px-5 py-3.5 max-w-xs sm:max-w-sm">
                        <p className="font-bold text-gray-900 truncate">{item.title}</p>
                        <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                          <Tag size={10} className="text-teal-600" />
                          <span>{item.category}</span>
                        </p>
                      </td>

                      <td className="px-5 py-3.5 text-gray-700 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <User size={12} className="text-gray-400 flex-shrink-0" />
                          <span className="font-semibold text-gray-900">
                            {complainant?.name || 'Resident'}
                          </span>
                        </div>
                        {complainant?.email && (
                          <div className="text-[11px] text-gray-400 pl-4 truncate max-w-[140px]">
                            {complainant.email}
                          </div>
                        )}
                      </td>

                      <td className="px-5 py-3.5 text-gray-600 max-w-[160px] truncate">
                        <span className="flex items-center gap-1">
                          <MapPin size={11} className="text-gray-400 flex-shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                        {formatDate(item.created_at)}
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <StatusBadge status={item.status} type="feedback" />
                      </td>

                      <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        <Link
                          to={`/admin/feedback/${item.id}`}
                          className="btn btn-outline btn-xs inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 border-teal-300 hover:bg-teal-50"
                        >
                          Review & Respond <ChevronRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
