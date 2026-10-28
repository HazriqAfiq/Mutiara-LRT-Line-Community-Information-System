/**
 * routes/AppRoutes.jsx
 *
 * Central routing configuration for the entire application.
 *
 * Route structure:
 * - Public routes → wrapped in <PublicLayout>
 * - User routes   → wrapped in <UserLayout> + <ProtectedRoute>
 * - Admin routes  → wrapped in <AdminLayout> + <ProtectedRoute requiredRole="admin">
 *
 * Adding a new page:
 * 1. Create the page component in src/pages/.
 * 2. Import it here.
 * 3. Add a <Route> in the appropriate section.
 * That's it — no other files need to change.
 */
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';
import UserLayout   from '../components/layout/UserLayout';
import AdminLayout  from '../components/layout/AdminLayout';

// Route guard
import ProtectedRoute from './ProtectedRoute';

// Public pages
import HomePage                from '../pages/public/HomePage';
import AboutPage               from '../pages/public/AboutPage';
import AnnouncementsPage       from '../pages/public/AnnouncementsPage';
import AnnouncementDetailsPage from '../pages/public/AnnouncementDetailsPage';
import RoadClosuresPage        from '../pages/public/RoadClosuresPage';
import RoadClosureDetailsPage  from '../pages/public/RoadClosureDetailsPage';

// Auth pages
import LoginPage    from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

// User pages
import UserDashboard      from '../pages/user/UserDashboard';
import SubmitFeedbackPage from '../pages/user/SubmitFeedbackPage';
import MyFeedbackPage     from '../pages/user/MyFeedbackPage';
import FeedbackDetailsPage from '../pages/user/FeedbackDetailsPage';
import ProfilePage        from '../pages/user/ProfilePage';

// Admin pages
import AdminDashboard           from '../pages/admin/AdminDashboard';
import ManageAnnouncementsPage  from '../pages/admin/ManageAnnouncementsPage';
import AnnouncementFormPage     from '../pages/admin/AnnouncementFormPage';
import ManageRoadClosuresPage   from '../pages/admin/ManageRoadClosuresPage';
import RoadClosureFormPage      from '../pages/admin/RoadClosureFormPage';
import ManageFeedbackPage       from '../pages/admin/ManageFeedbackPage';
import AdminFeedbackDetailsPage from '../pages/admin/AdminFeedbackDetailsPage';
import ManageUsersPage          from '../pages/admin/ManageUsersPage';

// Utility pages
import NotFoundPage      from '../pages/NotFoundPage';
import UnauthorizedPage  from '../pages/UnauthorizedPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* ── PUBLIC ROUTES ───────────────────────────────────── */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about"             element={<AboutPage />} />
        <Route path="announcements"     element={<AnnouncementsPage />} />
        <Route path="announcements/:id" element={<AnnouncementDetailsPage />} />
        <Route path="road-closures"     element={<RoadClosuresPage />} />
        <Route path="road-closures/:id" element={<RoadClosureDetailsPage />} />
      </Route>

      {/* ── AUTH ROUTES (no layout wrapper needed) ──────────── */}
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ── REGISTERED USER ROUTES ──────────────────────────── */}
      <Route
        element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard"          element={<UserDashboard />} />
        <Route path="/feedback/new"       element={<SubmitFeedbackPage />} />
        <Route path="/my-feedback"        element={<MyFeedbackPage />} />
        <Route path="/my-feedback/:id"    element={<FeedbackDetailsPage />} />
        <Route path="/profile"            element={<ProfilePage />} />
      </Route>

      {/* ── ADMIN ROUTES ────────────────────────────────────── */}
      <Route
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin"                        element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard"              element={<AdminDashboard />} />
        <Route path="/admin/announcements"          element={<ManageAnnouncementsPage />} />
        <Route path="/admin/announcements/new"      element={<AnnouncementFormPage />} />
        <Route path="/admin/announcements/:id/edit" element={<AnnouncementFormPage />} />
        <Route path="/admin/road-closures"          element={<ManageRoadClosuresPage />} />
        <Route path="/admin/road-closures/new"      element={<RoadClosureFormPage />} />
        <Route path="/admin/road-closures/:id/edit" element={<RoadClosureFormPage />} />
        <Route path="/admin/feedback"               element={<ManageFeedbackPage />} />
        <Route path="/admin/feedback/:id"           element={<AdminFeedbackDetailsPage />} />
        <Route path="/admin/users"                  element={<ManageUsersPage />} />
      </Route>

      {/* ── UTILITY ROUTES ──────────────────────────────────── */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*"             element={<NotFoundPage />} />
    </Routes>
  );
}
