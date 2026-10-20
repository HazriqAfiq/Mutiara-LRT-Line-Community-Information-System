/**
 * pages/admin/ManageAnnouncementsPage.jsx
 * Route: /admin/announcements
 *
 * Administrator Announcement Management Portal.
 * Features:
 *   - Comprehensive table with ID, Title, Category, Location, Date, Status, Actions
 *   - Search by keyword, title, location
 *   - Category filter & Status filter (Published, Draft, Archived)
 *   - Delete action guarded by ConfirmDialog modal
 *   - Action links to Create, Edit, and View public notice
 *   - Integrated with shared persistent announcementService
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
  Tag,
  MapPin,
  Calendar,
} from 'lucide-react';
import { getAnnouncements, deleteAnnouncement } from '../../services/announcementService';
import { formatDate } from '../../utils/dateUtils';
import SearchBar from '../../components/common/SearchBar';
import FilterSelect from '../../components/common/FilterSelect';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories' },
  { value: 'General Update', label: 'General Update' },
  { value: 'Construction Progress', label: 'Construction Progress' },
  { value: 'Public Notice', label: 'Public Notice' },
  { value: 'Safety Advisory', label: 'Safety Advisory' },
];

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
];

export default function ManageAnnouncementsPage() {
  const location = useLocation();
  const alertFromRedirect = location.state?.successMessage || null;

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [successBanner, setSuccessBanner] = useState(alertFromRedirect);

  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus]     = useState('');

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting]     = useState(false);

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    try {
      const filters = {};
      if (search.trim()) filters.search = search.trim();
      if (category) filters.category = category;
      if (status) filters.status = status;

      const res = await getAnnouncements(filters);
      setAnnouncements(res.data);
    } catch (err) {
      console.error('Failed to load announcements:', err);
      setError('Unable to load announcements list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchList();
    }, 200);
    return () => clearTimeout(timer);
  }, [search, category, status]);

  const handleResetFilters = () => {
    setSearch('');
    setCategory('');
    setStatus('');
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteAnnouncement(deleteTarget.id);
      setSuccessBanner(`Announcement "${deleteTarget.title}" was deleted successfully.`);
      setDeleteTarget(null);
      await fetchList();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete announcement. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const hasActiveFilters = Boolean(search || category || status);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--color-navy)' }}>
            Manage Construction Announcements
          </h2>
          <p className="text-xs text-gray-500">
            Publish civil works updates, station progress alerts, and public consultations.
          </p>
        </div>

        <Link
          to="/admin/announcements/new"
          className="btn btn-primary btn-sm flex items-center gap-1.5 self-start sm:self-auto font-bold shadow-xs text-xs"
        >
          <PlusCircle size={15} /> Create Announcement
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
          <div className="md:col-span-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search title, location, or content..."
              id="admin-announcements-search"
            />
          </div>

          <div className="md:col-span-3">
            <FilterSelect
              value={category}
              onChange={setCategory}
              options={CATEGORY_OPTIONS}
              id="admin-announcements-category"
              label="Filter Category"
            />
          </div>

          <div className="md:col-span-3 flex items-center gap-2">
            <div className="w-full">
              <FilterSelect
                value={status}
                onChange={setStatus}
                options={STATUS_OPTIONS}
                id="admin-announcements-status"
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
              Showing <strong>{announcements.length}</strong> announcements
              {hasActiveFilters && ' (filtered)'}
            </span>
            <span className="text-gray-400">
              Only Published notices appear publicly. Draft and Archived remain internal.
            </span>
          </div>
        )}
      </div>

      {/* Main Table */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner message="Loading announcements..." />
        </div>
      ) : error ? (
        <div className="card p-8 bg-white border border-red-200 text-center max-w-lg mx-auto">
          <p className="text-sm text-red-600 mb-3">{error}</p>
          <button onClick={fetchList} className="btn btn-outline text-xs">
            Retry
          </button>
        </div>
      ) : announcements.length === 0 ? (
        <div className="card p-8 bg-white border border-gray-100">
          <EmptyState
            title="No announcements found"
            message={
              hasActiveFilters
                ? 'No notices match your active search and filter settings.'
                : 'No announcements have been created yet. Click Create Announcement to publish the first notice.'
            }
            actionLabel={hasActiveFilters ? 'Reset Filters' : 'Create Announcement'}
            onAction={hasActiveFilters ? handleResetFilters : '/admin/announcements/new'}
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
                  <th className="px-5 py-3.5">Title</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Location</th>
                  <th className="px-5 py-3.5">Created Date</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {announcements.map((item) => (
                  <tr key={item.id} className="hover:bg-teal-50/20 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-gray-500 font-bold">
                      #{item.id}
                    </td>
                    <td className="px-5 py-3.5 font-bold text-gray-900 max-w-xs sm:max-w-md truncate">
                      {item.title}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-gray-600">
                      <span className="inline-flex items-center gap-1 font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                        <Tag size={10} /> {item.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 max-w-[180px] truncate">
                      {item.location}
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <StatusBadge status={item.status} type="announcement" />
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap space-x-1">
                      {item.status === 'published' && (
                        <Link
                          to={`/announcements/${item.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-gray-500 hover:text-teal-600 hover:bg-teal-50 inline-flex items-center"
                          title="View public page"
                        >
                          <Eye size={14} />
                        </Link>
                      )}

                      <Link
                        to={`/admin/announcements/${item.id}/edit`}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 inline-flex items-center"
                        title="Edit announcement"
                      >
                        <Edit size={14} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget(item)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 inline-flex items-center"
                        title="Delete announcement"
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
        title="Delete Construction Announcement?"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This notice will be immediately removed from both the administration records and public view.`}
        confirmLabel="Yes, Delete Announcement"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
