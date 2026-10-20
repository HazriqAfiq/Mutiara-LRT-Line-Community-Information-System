/**
 * routes/ProtectedRoute.jsx
 *
 * Guards routes that require authentication or a specific role.
 *
 * How it works:
 * 1. If the auth session is still loading (reading localStorage), show a spinner.
 * 2. If the user is NOT logged in, redirect to /login.
 * 3. If a required role is specified and the user doesn't have it,
 *    redirect to /unauthorized.
 * 4. Otherwise, render the child component.
 *
 * Usage:
 *   <ProtectedRoute>                    // requires any logged-in user
 *   <ProtectedRoute requiredRole="admin"> // requires admin role
 *
 * Note: Frontend role checks are for UX only.
 *       Laravel enforces real authorization in Part B.
 */
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Wait for session to be read from localStorage
  if (loading) {
    return <LoadingSpinner message="Checking session..." />;
  }

  // Not logged in → redirect to login, preserving the intended destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but wrong role → show unauthorized page
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
