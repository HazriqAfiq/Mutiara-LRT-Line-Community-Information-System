/**
 * pages/public/AnnouncementsPage.jsx
 * Route: /announcements
 *
 * Public listing of published construction announcements with
 * real-time search (by title, description, location) and category filter.
 */
import { useState, useEffect } from 'react';
import { Tag, RefreshCw } from 'lucide-react';
import { getAnnouncements } from '../../services/announcementService';
import PageHeader from '../../components/common/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import FilterSelect from '../../components/common/FilterSelect';
import AnnouncementCard from '../../components/common/AnnouncementCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories' },
  { value: 'General Update', label: 'General Update' },
  { value: 'Construction Progress', label: 'Construction Progress' },
  { value: 'Public Notice', label: 'Public Notice' },
  { value: 'Safety Advisory', label: 'Safety Advisory' },
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  // Fetch announcements whenever search or category changes
  useEffect(() => {
    let isMounted = true;

    async function fetchAnnouncements() {
      setLoading(true);
      setError(null);
      try {
        const filters = {
          status: 'published', // Never display draft or archived on public routes
        };
        if (search.trim()) filters.search = search.trim();
        if (category) filters.category = category;

        const res = await getAnnouncements(filters);
        if (isMounted) {
          setAnnouncements(res.data);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching announcements:', err);
          setError('Failed to load announcements. Please check your connection and try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    // Debounce slightly if user is typing
    const timer = setTimeout(() => {
      fetchAnnouncements();
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [search, category]);

  const handleResetFilters = () => {
    setSearch('');
    setCategory('');
  };

  const hasActiveFilters = Boolean(search || category);

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <PageHeader
        title="Construction Updates"
        subtitle="Stay updated on civil works, station progress, and safety notices across all Penang LRT sectors."
      />

      <div className="container mt-8">
        {/* Filter & Search Bar */}
        <div className="card p-4 sm:p-5 mb-8 border border-gray-100 shadow-sm bg-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-8">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search by keyword, location, or work description..."
                id="announcements-search"
              />
            </div>

            {/* Category Filter */}
            <div className="md:col-span-4 flex items-center gap-3">
              <div className="w-full">
                <FilterSelect
                  value={category}
                  onChange={setCategory}
                  options={CATEGORY_OPTIONS}
                  id="announcements-category"
                  label="Filter by Category"
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

          {/* Results count indicator */}
          {!loading && !error && (
            <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
              <span>
                Showing <strong>{announcements.length}</strong>{' '}
                {announcements.length === 1 ? 'announcement' : 'announcements'}
                {hasActiveFilters && ' (filtered)'}
              </span>
              {category && (
                <span className="inline-flex items-center gap-1 font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">
                  <Tag size={10} /> {category}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner message="Loading construction announcements..." />
          </div>
        ) : error ? (
          <div className="card p-8 text-center bg-white border border-red-200 max-w-lg mx-auto">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={handleResetFilters} className="btn btn-outline text-xs">
              Reset & Try Again
            </button>
          </div>
        ) : announcements.length === 0 ? (
          <div className="card p-8 bg-white border border-gray-100">
            <EmptyState
              title="No announcements found"
              message={
                hasActiveFilters
                  ? "We couldn't find any announcements matching your search criteria. Try modifying your filters or search keywords."
                  : 'There are currently no active public announcements posted for this section.'
              }
              actionLabel={hasActiveFilters ? 'Clear All Filters' : undefined}
              onAction={hasActiveFilters ? handleResetFilters : undefined}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                compact={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
