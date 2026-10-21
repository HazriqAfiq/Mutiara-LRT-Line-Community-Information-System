/**
 * pages/public/RoadClosuresPage.jsx
 * Route: /road-closures
 *
 * Public directory of road closures and traffic advisories with
 * real-time search (road name, location, title), status filtering,
 * and location area filtering.
 */
import { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw, MapPin, Navigation } from 'lucide-react';
import { getRoadClosures } from '../../services/roadClosureService';
import PageHeader from '../../components/common/PageHeader';
import SearchBar from '../../components/common/SearchBar';
import FilterSelect from '../../components/common/FilterSelect';
import RoadClosureCard from '../../components/common/RoadClosureCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'active', label: 'Active Closures' },
  { value: 'scheduled', label: 'Scheduled Closures' },
  { value: 'completed', label: 'Completed Works' },
];

const LOCATION_OPTIONS = [
  { value: '', label: 'All Areas' },
  { value: 'George Town', label: 'George Town' },
  { value: 'Jelutong', label: 'Jelutong' },
  { value: 'Bayan Baru', label: 'Bayan Baru' },
  { value: 'Bayan Lepas', label: 'Bayan Lepas' },
];

export default function RoadClosuresPage() {
  const [closures, setClosures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchClosures() {
      setLoading(true);
      setError(null);
      try {
        const filters = {};
        if (search.trim()) filters.search = search.trim();
        if (status) filters.status = status;
        if (location) filters.location = location;

        const res = await getRoadClosures(filters);
        if (isMounted) {
          setClosures(res.data);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching road closures:', err);
          setError('Failed to load road closures. Please check your network and try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    const timer = setTimeout(() => {
      fetchClosures();
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [search, status, location]);

  const handleResetFilters = () => {
    setSearch('');
    setStatus('');
    setLocation('');
  };

  const hasActiveFilters = Boolean(search || status || location);

  // Status counts for quick dashboard badges
  const activeCount = closures.filter((c) => c.status === 'active').length;
  const scheduledCount = closures.filter((c) => c.status === 'scheduled').length;

  return (
    <div className="min-h-screen pb-16">
      {/* Header */}
      <PageHeader
        title="Road Closures & Traffic Advisories"
        subtitle="Up-to-date traffic diversions, lane closures, and recommended detour routes along the LRT route."
      />

      <div className="container mt-8">
        {/* Quick summary alert bar */}
        <div className="card p-4 mb-6 flex flex-wrap items-center justify-between gap-4 bg-gray-50 border border-gray-200">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
            <AlertTriangle size={16} className="text-amber-600 flex-shrink-0" />
            <span>
              Always exercise caution near heavy construction machinery and obey traffic flaggers.
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="badge badge-active font-semibold">
              {activeCount} Active Now
            </span>
            <span className="badge badge-scheduled font-semibold">
              {scheduledCount} Scheduled
            </span>
          </div>
        </div>

        {/* Filters Card */}
        <div className="card p-4 sm:p-5 mb-8 border border-gray-100 shadow-sm bg-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search by road name, area, or description..."
                id="road-closure-search"
              />
            </div>

            {/* Status Filter */}
            <div className="md:col-span-3">
              <FilterSelect
                value={status}
                onChange={setStatus}
                options={STATUS_OPTIONS}
                id="road-closure-status"
                label="Filter by Status"
              />
            </div>

            {/* Location Area Filter */}
            <div className="md:col-span-3 flex items-center gap-2">
              <div className="w-full">
                <FilterSelect
                  value={location}
                  onChange={setLocation}
                  options={LOCATION_OPTIONS}
                  id="road-closure-location"
                  label="Filter by Area"
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
                Showing <strong>{closures.length}</strong>{' '}
                {closures.length === 1 ? 'advisory' : 'advisories'}
                {hasActiveFilters && ' (filtered)'}
              </span>
              <span className="text-gray-500">
                Sorted by status priority (Active, Scheduled, Completed)
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <LoadingSpinner message="Loading traffic advisories..." />
          </div>
        ) : error ? (
          <div className="card p-8 text-center bg-white border border-red-200 max-w-lg mx-auto">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={handleResetFilters} className="btn btn-outline text-xs">
              Reset & Try Again
            </button>
          </div>
        ) : closures.length === 0 ? (
          <div className="card p-8 bg-white border border-gray-100">
            <EmptyState
              title="No road closures found"
              message={
                hasActiveFilters
                  ? "We couldn't find any road closure notices matching your criteria. Try adjusting your search or resetting filters."
                  : 'There are currently no road closure notices reported for the selected corridor.'
              }
              actionLabel={hasActiveFilters ? 'Clear All Filters' : undefined}
              onAction={hasActiveFilters ? handleResetFilters : undefined}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {closures.map((closure) => (
              <RoadClosureCard
                key={closure.id}
                closure={closure}
                compact={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
