/**
 * pages/admin/ManageRoadClosuresPage.jsx
 * Route: /admin/road-closures
 *
 * Administrator Road Closure & Traffic Advisory Management Portal.
 * Features:
 *   - Comprehensive table with ID, Title, Road Name, Location, Schedule Dates, Status, Actions
 *   - Search by keyword, title, road name, location
 *   - Status filter (Active, Scheduled, Completed)
 *   - Delete action guarded by ConfirmDialog modal
 *   - Action links to Create, Edit, and View public detour advisory
 *   - Integrated with shared persistent roadClosureService
 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Calendar,
  Navigation,
  AlertTriangle,
} from 'lucide-react';
import { getRoadClosures, deleteRoadClosure } from '../../services/roadClosureService';
import { formatDate } from '../../utils/dateUtils';
import SearchBar from '../../components/common/SearchBar';
import FilterSelect from '../../components/common/FilterSelect';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'active', label: 'Active Now' },
  { value: 'scheduled', label: 'Scheduled Ahead' },
  { value: 'completed', label: 'Completed Works' },
];

export default function ManageRoadClosuresPage() {
  const location = useLocation();
  const alertFromRedirect = location.state?.successMessage || null;

  const [closures, setClosures]           = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [successBanner, setSuccessBanner] = useState(alertFromRedirect);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting]     = useState(false);

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    try {
      const filters = {};
      if (search.trim()) filters.search = search.trim();
      if (status) filters.status = status;

      const res = await getRoadClosures(filters);
      setClosures(res.data);
    } catch (err) {
      console.error('Failed to load road closures:', err);
      setError('Unable to load road closure records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchList();
    }, 200);
    return () => clearTimeout(timer);
  }, [search, status]);

  const handleResetFilters = () => {
    setSearch('');
    setStatus('');
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteRoadClosure(deleteTarget.id);
      setSuccessBanner(`Road closure notice "${deleteTarget.title}" was deleted successfully.`);
      setDeleteTarget(null);
      await fetchList();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete road closure notice. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const hasActiveFilters = Boolean(search || status);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--color-navy)' }}>
            Manage Road Closures & Traffic Advisories
          </h2>
          <p className="text-xs text-gray-500">
            Maintain public detour notices, lane restrictions, and temporary traffic control measures.
          </p>
        </div>

        <Link
          to="/admin/road-closures/new"
          className="btn btn-primary btn-sm flex items-center gap-1.5 self-start sm:self-auto font-bold shadow-xs text-xs"
        >
          <PlusCircle size={15} /> Add Road Closure
        </Link>
      </div>

      {/* Success Notification Banner */}
      {successBanner && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5 text-xs text-emerald-900 font-medium">
            <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
            <span>{successBanner}</span>
          </div>
          <button
            onClick={() => setSuccessBanner(null)}
            className="text-emerald-600 hover:text-emerald-800 text-xs font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Filters Card */}
      <div className="card p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-8">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search title, road name, location or detour routes..."
              id="admin-road-closures-search"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <div className="w-full">
              <FilterSelect
                value={status}
                onChange={setStatus}
                options={STATUS_OPTIONS}
                id="admin-road-closures-status"
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
              Showing <strong>{closures.length}</strong> traffic advisories
              {hasActiveFilters && ' (filtered)'}
            </span>
            <span className="text-gray-400">
              Active and Scheduled notices are immediately visible on the public portal.
            </span>
          </div>
        )}
      </div>

      {/* Main Table */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner message="Loading traffic advisories..." />
        </div>
      ) : error ? (
        <div className="card p-8 bg-white border border-red-200 text-center max-w-lg mx-auto">
          <p className="text-sm text-red-600 mb-3">{error}</p>
          <button onClick={fetchList} className="btn btn-outline text-xs">
            Retry
          </button>
        </div>
      ) : closures.length === 0 ? (
        <div className="card p-8 bg-white border border-gray-100">
          <EmptyState
            title="No road closures found"
            message={
              hasActiveFilters
                ? 'No traffic notices match your active search and filter settings.'
                : 'No road closures have been scheduled yet. Click Add Road Closure to publish a traffic notice.'
            }
            actionLabel={hasActiveFilters ? 'Reset Filters' : 'Add Road Closure'}
            onAction={hasActiveFilters ? handleResetFilters : '/admin/road-closures/new'}
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
                  <th className="px-5 py-3.5">ID</th>
                  <th className="px-5 py-3.5">Title & Affected Road</th>
                  <th className="px-5 py-3.5">Location Area</th>
                  <th className="px-5 py-3.5">Closure Schedule</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {closures.map((item) => (
                  <tr key={item.id} className="hover:bg-teal-50/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-gray-500 font-bold">
                      #{item.id}
                    </td>

                    <td className="px-5 py-3.5 max-w-xs sm:max-w-sm">
                      <p className="font-bold text-gray-900 truncate">{item.title}</p>
                      <p className="text-[11px] text-teal-700 font-medium flex items-center gap-1 mt-0.5">
                        <Navigation size={10} /> {item.road_name}
                      </p>
                    </td>

                    <td className="px-5 py-3.5 text-gray-600 max-w-[180px] truncate">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} className="text-gray-400 flex-shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar size={12} className="text-gray-400" />
                        <span>
                          {formatDate(item.start_date)} – {formatDate(item.end_date)}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <StatusBadge status={item.status} type="roadClosure" />
                    </td>

                    <td className="px-5 py-3.5 text-right whitespace-nowrap space-x-1">
                      <Link
                        to={`/road-closures/${item.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-gray-500 hover:text-teal-600 hover:bg-teal-50 inline-flex items-center"
                        title="View public page"
                      >
                        <Eye size={14} />
                      </Link>

                      <Link
                        to={`/admin/road-closures/${item.id}/edit`}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 inline-flex items-center"
                        title="Edit road closure"
                      >
                        <Edit size={14} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget(item)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 inline-flex items-center"
                        title="Delete road closure"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Road Closure Notice?"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This traffic advisory will be immediately removed from both administrative records and public detour maps.`}
        confirmLabel="Yes, Delete Notice"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
