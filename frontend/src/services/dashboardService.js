/**
 * services/dashboardService.js
 *
 * Computes live metric statistics for both Registered User and Administrator dashboards.
 * All calculations pull directly from shared persistent service stores:
 *   - feedbackService
 *   - announcementService
 *   - roadClosureService
 *   - userService
 *
 * This guarantees zero hardcoded statistics and full cross-role consistency.
 *
 * Part B:
 *   - Replace with GET /api/admin/dashboard and GET /api/dashboard.
 */
import { getAllFeedback, getMyFeedback } from './feedbackService';
import { getAnnouncements } from './announcementService';
import { getRoadClosures } from './roadClosureService';
import { getUsers } from './userService';

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

/**
 * Administrator dashboard statistics.
 * Dynamically aggregates metrics across all entities in the system.
 *
 * @returns {Promise<{ data: object }>}
 */
export async function getAdminDashboardStats() {
  await delay(250);

  const [feedbackRes, announcementsRes, closuresRes, usersRes] = await Promise.all([
    getAllFeedback(),
    getAnnouncements(),
    getRoadClosures(),
    getUsers(),
  ]);

  const feedback      = feedbackRes.data;
  const announcements = announcementsRes.data;
  const roadClosures  = closuresRes.data;
  const users         = usersRes.data;

  // 1. Complaint statistics
  const totalComplaints      = feedback.length;
  const pendingComplaints    = feedback.filter((f) => f.status === 'pending').length;
  const inProgressComplaints = feedback.filter((f) => f.status === 'in_progress').length;
  const resolvedComplaints   = feedback.filter((f) => f.status === 'resolved').length;

  // 2. Announcements & Closures statistics
  const totalAnnouncements     = announcements.length;
  const publishedAnnouncements = announcements.filter((a) => a.status === 'published').length;
  const activeRoadClosures     = roadClosures.filter((r) => r.status === 'active').length;

  // 3. User counts
  const totalUsers = users.length;

  // 4. Feedback status chart distribution (Recharts ready)
  const complaintsByStatus = [
    { name: 'Pending',     value: pendingComplaints,    color: '#F59E0B' },
    { name: 'In Progress', value: inProgressComplaints, color: '#3B82F6' },
    { name: 'Resolved',    value: resolvedComplaints,   color: '#10B981' },
  ];

  // 5. Feedback category chart distribution (Recharts ready)
  const categoryOrder = [
    'Construction Noise',
    'Road Access',
    'Pedestrian Safety',
    'Traffic Disruption',
    'Business Access',
    'Other',
  ];

  const categoryCountMap = {};
  categoryOrder.forEach((cat) => {
    categoryCountMap[cat] = 0;
  });

  feedback.forEach((f) => {
    if (categoryCountMap[f.category] !== undefined) {
      categoryCountMap[f.category] += 1;
    } else {
      categoryCountMap[f.category] = (categoryCountMap[f.category] || 0) + 1;
    }
  });

  const complaintsByCategory = Object.entries(categoryCountMap).map(([name, count]) => ({
    name,
    count,
  }));

  // 6. Recent records for dashboard preview tables (latest 5)
  const recentFeedback = [...feedback]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  const recentAnnouncements = [...announcements]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return {
    data: {
      totalComplaints,
      pendingComplaints,
      inProgressComplaints,
      resolvedComplaints,
      totalAnnouncements,
      publishedAnnouncements,
      activeRoadClosures,
      totalUsers,
      complaintsByStatus,
      complaintsByCategory,
      recentFeedback,
      recentAnnouncements,
    },
  };
}

/**
 * Registered user dashboard statistics (scoped to a specific user).
 * Calculates metrics dynamically from the live feedback store.
 *
 * @param {number} userId
 * @returns {Promise<{ data: object }>}
 */
export async function getUserDashboardStats(userId) {
  const { data: myFeedback } = await getMyFeedback(userId);

  const total      = myFeedback.length;
  const pending    = myFeedback.filter((f) => f.status === 'pending').length;
  const inProgress = myFeedback.filter((f) => f.status === 'in_progress').length;
  const resolved   = myFeedback.filter((f) => f.status === 'resolved').length;

  const recent = [...myFeedback]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3);

  return {
    data: {
      total,
      pending,
      inProgress,
      resolved,
      recent,
    },
  };
}
