/**
 * pages/user/MyFeedbackPage.jsx
 * Route: /my-feedback
 *
 * User complaint history and tracking list.
 * Features:
 *   - Fetches feedback scoped strictly to the logged-in user via feedbackService.getMyFeedback()
 *   - Real-time search by Reference Number, Title, Location
 *   - Status filter (Pending, In Progress, Resolved)
 *   - Responsive presentation: clean desktop table + mobile card stack
 *   - Empty state when no feedback is found or filters yield zero results
 */
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  Filter,
  RefreshCw,
  ArrowRight,
  MapPin,
  Calendar,
  Tag,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getMyFeedback } from '../../services/feedbackService';
import { formatDate } from '../../utils/dateUtils';
import PageHeader from '../../components/common/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import FilterSelect from '../../components/common/FilterSelect';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
];

export default function MyFeedbackPage() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial filter from URL query if present (e.g. ?status=pending)
  const initialStatus = searchParams.get('status') || '';

  const [allFeedback, setAllFeedback] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  const [search, setSearch]   = useState('');
  const [status, setStatus]   = useState(initialStatus);

  // Fetch feedback for the logged-in user
  useEffect(() => {
    let isMounted = true;

    async function fetchUserFeedback() {
      if (!user?.id) return;
      setLoading(true);
      setError(null);
      try {
        const res = await getMyFeedback(user.id);
        if (isMounted) {
          setAllFeedback(res.data);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load user feedback:', err);
          setError('Unable to load your feedback history. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchUserFeedback();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  // Apply client-side search and status filter
  useEffect(() => {
    let result = [...allFeedback];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (f) =>
          f.reference_number?.toLowerCase().includes(q) ||
          f.title?.toLowerCase().includes(q) ||
          f.location?.toLowerCase().includes(q)
      );
    }

    if (status) {
      result = result.filter((f) => f.status === status);
    }

    setFilteredFeedback(result);
  }, [allFeedback, search, status]);

  const handleResetFilters = () => {
    setSearch('');
    setStatus('');
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(search || status);

  return (
    <div className="min-h-screen pb-16">
      <PageHeader
        title="My Feedback History"
        subtitle="Review your submitted construction complaints, view progress status, and read official contractor responses."
      >
        <Link
          to="/feedback/new"
          className="btn btn-amber btn-sm font-bold flex items-center gap-1.5 shadow-md"
        >
          <PlusCircle size={15} /> Submit New Feedback
        </Link>
      </PageHeader>

      <div className="container mt-8">
        {/* Search & Filter Header Card */}
        <div className="card p-4 sm:p-5 mb-8 border border-gray-100 shadow-sm bg-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search */}
            <div className="md:col-span-8">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search by reference number (e.g. FB-0001), title, or location..."
                id="my-feedback-search"
              />
            </div>

            {/* Status Filter */}
            <div className="md:col-span-4 flex items-center gap-3">
              <div className="w-full">
                <FilterSelect
                  value={status}
                  onChange={(val) => {
                    setStatus(val);
                    if (val) {
                      setSearchParams({ status: val });
                    } else {
                      setSearchParams({});
                    }
                  }}
                  options={STATUS_OPTIONS}
                  id="my-feedback-status"
                  label="Filter by Status"
                />
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="btn btn-ghost btn-sm text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 flex-shrink-0"
                  title="Reset filters"
                >
                  <RefreshCw size={13} />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Counts row */}
          {!loading && !error && (
            <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
              <span>
                Showing <strong>{filteredFeedback.length}</strong> of{' '}
                <strong>{allFeedback.length}</strong> complaints
                {hasActiveFilters && ' (filtered)'}
              </span>

              {status && (
                <span className="capitalize font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  Status: {status.replace('_', ' ')}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner message="Retrieving your feedback history..." />
          </div>
        ) : error ? (
          <div className="card p-8 text-center bg-white border border-red-200 max-w-lg mx-auto">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-outline text-xs"
            >
              Retry
            </button>
          </div>
        ) : filteredFeedback.length === 0 ? (
          <div className="card p-8 bg-white border border-gray-100">
            <EmptyState
              title={hasActiveFilters ? 'No matching complaints found' : 'No feedback submitted yet'}
              message={
                hasActiveFilters
                  ? "We couldn't find any complaints matching your active search filters. Try clearing or relaxing your filter."
                  : "You haven't submitted any feedback tickets yet. Have a concern regarding nearby works or traffic detours?"
              }
              actionLabel={hasActiveFilters ? 'Clear Filters' : 'Submit Your First Feedback'}
              onAction={hasActiveFilters ? handleResetFilters : '/feedback/new'}
            />
          </div>
        ) : (
          <>
            {/* Desktop Table View (Hidden on mobile) */}
            <div className="hidden md:block card bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead
                    className="text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100"
                    style={{ backgroundColor: 'var(--color-gray-50)' }}
                  >
                    <tr>
                      <th className="px-6 py-4 font-bold">Ref No.</th>
                      <th className="px-6 py-4 font-bold">Complaint Title</th>
                      <th className="px-6 py-4 font-bold">Category</th>
                      <th className="px-6 py-4 font-bold">Location</th>
                      <th className="px-6 py-4 font-bold">Submitted Date</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredFeedback.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-teal-50/20 transition-colors group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-mono text-xs font-bold text-gray-800 bg-gray-100 px-2.5 py-1 rounded-md">
                            {item.reference_number}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            to={`/my-feedback/${item.id}`}
                            className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors line-clamp-1"
                          >
                            {item.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                          <span className="inline-flex items-center gap-1">
                            <Tag size={12} className="text-teal-600" />
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-600 max-w-[180px] truncate">
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                            {item.location}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                          {formatDate(item.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={item.status} type="feedback" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Link
                            to={`/my-feedback/${item.id}`}
                            className="btn btn-outline btn-sm text-xs py-1 inline-flex items-center gap-1 group-hover:border-teal-500 group-hover:text-teal-600"
                          >
                            <Eye size={13} /> View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card Stack (Hidden on desktop) */}
            <div className="md:hidden space-y-4">
              {filteredFeedback.map((item) => (
                <div
                  key={item.id}
                  className="card p-5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                      {item.reference_number}
                    </span>
                    <StatusBadge status={item.status} type="feedback" />
                  </div>

                  <h3 className="font-bold text-sm text-gray-900 leading-snug">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 pt-1 border-t border-gray-50">
                    <span className="flex items-center gap-1">
                      <Tag size={12} className="text-teal-600" />
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-gray-400" />
                      {item.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-gray-400" />
                      {formatDate(item.created_at)}
                    </span>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`/my-feedback/${item.id}`}
                      className="btn btn-outline btn-sm w-full text-xs flex items-center justify-center gap-1.5"
                    >
                      <Eye size={14} /> View Details & Tracking
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
