/**
 * context/AuthContext.jsx
 *
 * Provides authentication state and actions to the entire application.
 *
 * What this does:
 * - Holds the current user object (or null if not logged in).
 * - Exposes login(), register(), logout(), and updateUser() actions.
 * - Reads persisted session from localStorage on startup.
 * - Provides helper booleans: isAuthenticated, isAdmin.
 *
 * Usage in any component:
 *   import { useAuth } from '../context/AuthContext';
 *   const { user, login, logout, isAdmin, updateUser } = useAuth();
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  getCurrentUser,
} from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on first mount
  useEffect(() => {
    const stored = getCurrentUser();
    setUser(stored);
    setLoading(false);
  }, []);

  /**
   * Log in with email and password.
   * Updates state and returns user object.
   */
  const login = useCallback(async (credentials) => {
    const response = await loginService(credentials);
    setUser(response.data);
    return response.data;
  }, []);

  /**
   * Register a new account.
   * Does NOT auto-login so the user can be routed to /login to sign in.
   */
  const register = useCallback(async (data) => {
    const response = await registerService(data);
    return response.data;
  }, []);

  /**
   * Log out — clears state and localStorage session.
   */
  const logout = useCallback(async () => {
    await logoutService();
    setUser(null);
  }, []);

  /**
   * Synchronize updated user profile across components (e.g. after profile edit).
   */
  const updateUser = useCallback((updatedData) => {
    setUser((prev) => (prev ? { ...prev, ...updatedData } : null));
  }, []);

  const isAuthenticated = Boolean(user);
  const isAdmin         = user?.role === 'admin';

  const value = {
    user,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to consume the AuthContext safely.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an <AuthProvider>. Check main.jsx.');
  }
  return context;
}
