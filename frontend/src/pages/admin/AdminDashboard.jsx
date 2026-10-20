/**
 * pages/admin/AdminDashboard.jsx
 * Route: /admin/dashboard
 *
 * Executive Administrator Overview & Analytics.
 * Features:
 *   - 7 live KPI cards (Total Feedback, Pending, In Progress, Resolved, Published Announcements, Active Closures, Registered Users)
 *   - Quick action shortcuts (Create Announcement, Add Road Closure, Manage Feedback)
 *   - Visual Recharts:
 *       1. Status distribution (PieChart / Donut)
 *       2. Category distribution (BarChart)
 *   - Recent 5 complaints table with user lookup and quick actions
 *   - Recent 5 announcements overview with status badges
 *   - All data dynamically aggregated from shared service stores
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Clock,
  RefreshCw,
  CheckCircle2,
  Megaphone,
  AlertTriangle,
  Users,
  PlusCircle,
  ArrowRight,
  Eye,
  ExternalLink,
  PieChart as PieIcon,
  BarChart3,
  Calendar,
  Tag,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { getAdminDashboardStats } from '../../services/dashboardService';
import { getUsers } from '../../services/userService';
import { formatDate } from '../../utils/dateUtils';
import DashboardStatCard from '../../components/common/DashboardStatCard';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const PIE_COLORS = {
  Pending: '#F59E0B',
  'In Progress': '#3B82F6',
  Resolved: '#10B981',
};

export default function AdminDashboard() {
  const [stats, setStats]     = useState(null);
  const [usersMap, setUsersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      setLoading(true);
      setError(null);
      try {
        const [statsRes, usersRes] = await Promise.all([
          getAdminDashboardStats(),
          getUsers(),
        ]);

        if (isMounted) {
          setStats(statsRes.data);

          // Build a quick ID-to-Name map for "Submitted By" lookups
          const map = {};
          usersRes.data.forEach((u) => {
            map[u.id] = u.name;
          });
          setUsersMap(map);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load admin dashboard stats:', err);
          setError('Unable to aggregate administration statistics. Please refresh the page.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Top Banner / Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900" style={{ color: 'var(--color-navy)' }}>
            System Performance & Analytics
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Real-time monitoring across construction notifications, traffic advisories, and community complaints.
          </p>
        </div>

        {/* Quick Actions Shortcuts */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/announcements/new"
            className="btn btn-primary btn-sm flex items-center gap-1.5 font-bold shadow-xs text-xs"
          >
            <PlusCircle size={14} /> Create Announcement
          </Link>
          <Link
            to="/admin/road-closures/new"
            className="btn btn-secondary btn-sm flex items-center gap-1.5 font-bold shadow-xs text-xs"
          >
            <PlusCircle size={14} /> Add Road Closure
          </Link>
          <Link
            to="/admin/feedback"
            className="btn btn-outline btn-sm flex items-center gap-1.5 font-semibold text-xs"
          >
            <MessageSquare size={14} /> View All Feedback
          </Link>
        </div>
      </div>

      {loading && (
        <div className="py-24 flex justify-center">
          <LoadingSpinner message="Calculating real-time analytics..." />
        </div>
      )}

      {!loading && error && (
        <div className="card p-8 bg-white border border-red-200 text-center max-w-lg mx-auto">
          <p className="text-sm text-red-600 mb-3">{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-outline text-xs">
            Retry
          </button>
        </div>
      )}

      {!loading && !error && stats && (
        <>
          {/* Section A: 7 KPI Summary Cards */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Core Operational Indicators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <DashboardStatCard
                title="Total Feedback"
                value={stats.totalComplaints}
                icon={<MessageSquare size={19} />}
                color="navy"
                subtitle="All submitted resident complaints"
                link="/admin/feedback"
              />

              <DashboardStatCard
                title="Pending Review"
                value={stats.pendingComplaints}
                icon={<Clock size={19} />}
                color="warning"
                subtitle="Awaiting liaison assessment"
                link="/admin/feedback"
              />

              <DashboardStatCard
                title="In Progress"
                value={stats.inProgressComplaints}
                icon={<RefreshCw size={19} />}
                color="info"
                subtitle="Active on-site mitigation"
                link="/admin/feedback"
              />

              <DashboardStatCard
                title="Resolved"
                value={stats.resolvedComplaints}
                icon={<CheckCircle2 size={19} />}
                color="success"
                subtitle="Case concluded and mitigated"
                link="/admin/feedback"
              />
            </div>

            {/* Secondary row of 3 KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <DashboardStatCard
                title="Published Announcements"
                value={stats.publishedAnnouncements}
                icon={<Megaphone size={19} />}
                color="teal"
                subtitle={`${stats.totalAnnouncements} total notices logged`}
                link="/admin/announcements"
              />

              <DashboardStatCard
                title="Active Road Closures"
                value={stats.activeRoadClosures}
                icon={<AlertTriangle size={19} />}
                color="warning"
                subtitle="Lane restrictions active now"
                link="/admin/road-closures"
              />

              <DashboardStatCard
                title="Registered Users"
                value={stats.totalUsers}
                icon={<Users size={19} />}
                color="navy"
                subtitle="Community resident accounts"
                link="/admin/users"
              />
            </div>
          </div>

          {/* Section B & C: Recharts Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart 1: Status Distribution (5 cols) */}
            <div className="lg:col-span-5 card bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <PieIcon size={16} className="text-teal-600" />
                  <h3 className="text-sm font-bold text-gray-900">
                    Complaint Status Distribution
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Breakdown of all tickets across the resolution pipeline
                </p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.complaintsByStatus}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {stats.complaintsByStatus.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={PIE_COLORS[entry.name] || 'var(--color-teal)'}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(val, name) => [`${val} complaints`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs pt-3 border-t border-gray-100 flex-wrap">
                <span className="flex items-center gap-1.5 font-medium text-amber-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pending ({stats.pendingComplaints})
                </span>
                <span className="flex items-center gap-1.5 font-medium text-blue-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> In Progress ({stats.inProgressComplaints})
                </span>
                <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Resolved ({stats.resolvedComplaints})
                </span>
              </div>
            </div>

            {/* Chart 2: Category Breakdown Bar Chart (7 cols) */}
            <div className="lg:col-span-7 card bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 size={16} className="text-teal-600" />
                  <h3 className="text-sm font-bold text-gray-900">
                    Complaints by Incident Category
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Frequency of resident reports by environmental and safety factors
                </p>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.complaintsByCategory}
                    margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 10, fill: '#6B7280' }}
                      interval={0}
                      angle={-20}
                      textAnchor="end"
                    />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
                    <RechartsTooltip
                      formatter={(val) => [`${val} complaints`, 'Total']}
                      contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Bar dataKey="count" fill="var(--color-navy)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="text-[11px] text-gray-400 text-center pt-3 border-t border-gray-100">
                Data updates automatically as residents file tickets or admins resolve cases.
              </div>
            </div>
          </div>

          {/* Section D: Recent 5 Complaints Table */}
          <div className="card bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Recent Community Complaints
                </h3>
                <p className="text-xs text-gray-500">
                  Latest 5 submissions awaiting action or recently modified
                </p>
              </div>

              <Link
                to="/admin/feedback"
                className="text-xs font-semibold text-teal-600 hover:text-teal-800 flex items-center gap-1"
              >
                View All ({stats.totalComplaints}) <ArrowRight size={13} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead
                  className="text-[11px] uppercase tracking-wider text-gray-500 border-b border-gray-100 font-bold"
                  style={{ backgroundColor: 'var(--color-gray-50)' }}
                >
                  <tr>
                    <th className="px-5 py-3">Ref No.</th>
                    <th className="px-5 py-3">Title</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">Submitted By</th>
                    <th className="px-5 py-3">Date</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {stats.recentFeedback.map((item) => (
                    <tr key={item.id} className="hover:bg-teal-50/20 transition-colors">
                      <td className="px-5 py-3.5 font-mono font-bold text-gray-800">
                        {item.reference_number}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-gray-900 max-w-xs truncate">
                        {item.title}
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">
                        {item.category}
                      </td>
                      <td className="px-5 py-3.5 text-gray-700">
                        {usersMap[item.user_id] || `User #${item.user_id}`}
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
                          className="btn btn-outline btn-sm text-[11px] py-1 px-2.5 inline-flex items-center gap-1 hover:border-teal-500 hover:text-teal-600"
                        >
                          <Eye size={12} /> View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section E: Recent Announcements Overview */}
          <div className="card bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Latest Announcements Overview
                </h3>
                <p className="text-xs text-gray-500">
                  Recent construction updates and public notices
                </p>
              </div>

              <Link
                to="/admin/announcements"
                className="text-xs font-semibold text-teal-600 hover:text-teal-800 flex items-center gap-1"
              >
                Manage All ({stats.totalAnnouncements}) <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.recentAnnouncements.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-teal-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <StatusBadge status={item.status} type="announcement" />
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 line-clamp-2 mb-2">
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px] text-gray-400">
                    <span>{formatDate(item.created_at)}</span>
                    <Link
                      to={`/admin/announcements/${item.id}/edit`}
                      className="text-teal-600 hover:underline font-semibold"
                    >
                      Edit Notice
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
