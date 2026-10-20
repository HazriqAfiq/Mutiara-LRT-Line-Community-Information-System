/**
 * pages/user/UserDashboard.jsx
 * Route: /dashboard
 *
 * Personalized resident/commuter dashboard.
 * Displays:
 *   - Welcome header with user's name
 *   - 4 live summary metric cards (Total, Pending, In Progress, Resolved)
 *   - Quick action shortcuts (Submit Feedback, My Feedback, Updates, Closures)
 *   - Recent feedback list (latest 3) or helpful empty state
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Clock,
  RefreshCw,
  CheckCircle2,
  PlusCircle,
  FileText,
  HardHat,
  AlertTriangle,
  ArrowRight,
  Send,
  Calendar,
  MapPin,
  Tag,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserDashboardStats } from '../../services/dashboardService';
import { formatDate } from '../../utils/dateUtils';
import DashboardStatCard from '../../components/common/DashboardStatCard';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

export default function UserDashboard() {
  const { user } = useAuth();

  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      if (!user?.id) return;
      setLoading(true);
      setError(null);
      try {
        const res = await getUserDashboardStats(user.id);
        if (isMounted) {
          setStats(res.data);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error loading user dashboard stats:', err);
          setError('Unable to load your dashboard statistics. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  return (
    <div className="min-h-screen pb-16">
      {/* Top Welcome Banner */}
      <div
        className="text-white py-10 px-4 sm:px-6 shadow-md"
        style={{
          background: 'linear-gradient(135deg, #0c2640 0%, #12375B 70%, #164670 100%)',
        }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-teal-300 border border-white/15 mb-3">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                Community Portal
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white" style={{ color: '#FFFFFF' }}>
                Welcome back, {user?.name || 'Resident'}!
              </h1>
              <p className="text-sm sm:text-base text-white/80 mt-1 max-w-xl">
                Stay informed and manage your construction-related feedback across the Penang LRT Mutiara Line project.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <Link
                to="/feedback/new"
                className="btn btn-amber flex items-center gap-2 px-5 py-2.5 font-bold shadow-lg"
              >
                <PlusCircle size={16} />
                Submit New Feedback
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-8">
        {/* Loading Spinner */}
        {loading && (
          <div className="py-20 flex justify-center">
            <LoadingSpinner message="Loading your dashboard overview..." />
          </div>
        )}

        {/* Error message */}
        {!loading && error && (
          <div className="card p-6 bg-white border border-red-200 text-center max-w-md mx-auto mb-8">
            <p className="text-sm text-red-600 mb-3">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-sm btn-outline text-xs"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && stats && (
          <>
            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
              <DashboardStatCard
                title="Total Submitted"
                value={stats.total}
                icon={<MessageSquare size={20} />}
                color="navy"
                subtitle="All submitted issues"
                link="/my-feedback"
              />

              <DashboardStatCard
                title="Pending Review"
                value={stats.pending}
                icon={<Clock size={20} />}
                color="warning"
                subtitle="Awaiting liaison assessment"
                link="/my-feedback?status=pending"
              />

              <DashboardStatCard
                title="In Progress"
                value={stats.inProgress}
                icon={<RefreshCw size={20} />}
                color="info"
                subtitle="Active on-site mitigation"
                link="/my-feedback?status=in_progress"
              />

              <DashboardStatCard
                title="Resolved"
                value={stats.resolved}
                icon={<CheckCircle2 size={20} />}
                color="success"
                subtitle="Mitigated and closed"
                link="/my-feedback?status=resolved"
              />
            </div>

            {/* Main content grid: Recent Feedback & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Recent Feedback (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="card bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                    <div>
                      <h2 className="text-lg font-bold" style={{ color: 'var(--color-navy)' }}>
                        Recent Feedback Activity
                      </h2>
                      <p className="text-xs text-gray-500">
                        Your latest reported issues and contractor follow-up
                      </p>
                    </div>

                    <Link
                      to="/my-feedback"
                      className="inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                      style={{ color: 'var(--color-teal)' }}
                    >
                      View All ({stats.total}) <ArrowRight size={13} />
                    </Link>
                  </div>

                  {stats.recent.length === 0 ? (
                    <div className="py-8">
                      <EmptyState
                        title="No feedback submitted yet"
                        message="You haven't logged any construction concerns. Have a query regarding local noise, dust, or road diversions?"
                        actionLabel="Submit Feedback"
                        onAction="/feedback/new"
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {stats.recent.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-teal-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs font-bold text-gray-700 bg-gray-200/70 px-2 py-0.5 rounded">
                                {item.reference_number}
                              </span>
                              <span
                                className="inline-flex items-center gap-1 text-xs font-semibold"
                                style={{ color: 'var(--color-teal)' }}
                              >
                                <Tag size={11} /> {item.category}
                              </span>
                              <StatusBadge status={item.status} type="feedback" />
                            </div>

                            <h3 className="text-sm font-bold text-gray-900 truncate">
                              {item.title}
                            </h3>

                            <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                              <span className="flex items-center gap-1">
                                <MapPin size={12} /> {item.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={12} /> {formatDate(item.created_at)}
                              </span>
                            </div>
                          </div>

                          <div className="flex-shrink-0 self-start sm:self-center">
                            <Link
                              to={`/my-feedback/${item.id}`}
                              className="btn btn-outline btn-sm text-xs py-1.5 flex items-center gap-1"
                            >
                              View Details <ArrowRight size={13} />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Quick Actions & Helpful Info (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="card bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h2 className="text-base font-bold mb-4" style={{ color: 'var(--color-navy)' }}>
                    Quick Actions
                  </h2>

                  <div className="space-y-2.5">
                    <Link
                      to="/feedback/new"
                      className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-amber-50 hover:border-amber-300 transition-colors flex items-center gap-3 group text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                        <Send size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-800 group-hover:text-amber-900">
                          Submit New Feedback
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">
                          Report noise, dust, safety, or access issues
                        </p>
                      </div>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-amber-700" />
                    </Link>

                    <Link
                      to="/my-feedback"
                      className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-teal-50 hover:border-teal-300 transition-colors flex items-center gap-3 group text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0">
                        <FileText size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-800 group-hover:text-teal-900">
                          View My Feedback
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">
                          Track status and responses
                        </p>
                      </div>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-teal-700" />
                    </Link>

                    <Link
                      to="/announcements"
                      className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-colors flex items-center gap-3 group text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
                        <HardHat size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-800 group-hover:text-blue-900">
                          Construction Updates
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">
                          Check official station and viaduct notices
                        </p>
                      </div>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-blue-700" />
                    </Link>

                    <Link
                      to="/road-closures"
                      className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-red-50 hover:border-red-300 transition-colors flex items-center gap-3 group text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-100 text-red-800 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-800 group-hover:text-red-900">
                          Check Road Closures
                        </p>
                        <p className="text-[11px] text-gray-500 truncate">
                          Detours and active traffic diversions
                        </p>
                      </div>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-red-700" />
                    </Link>
                  </div>
                </div>

                {/* Account Details Widget */}
                <div
                  className="rounded-2xl p-5 border shadow-sm"
                  style={{
                    backgroundColor: 'rgba(18, 55, 91, 0.03)',
                    borderColor: 'var(--color-gray-200)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Account Profile
                    </span>
                    <Link
                      to="/profile"
                      className="text-xs font-semibold hover:underline"
                      style={{ color: 'var(--color-teal)' }}
                    >
                      Edit Profile
                    </Link>
                  </div>
                  <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  {user?.phone && <p className="text-xs text-gray-500 mt-0.5">{user.phone}</p>}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
