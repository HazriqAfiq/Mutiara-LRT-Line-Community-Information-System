/**
 * components/layout/AdminLayout.jsx
 *
 * Layout wrapper for all /admin/* routes.
 * Features:
 *   - Fixed responsive sidebar on desktop & drawer on mobile
 *   - Top header bar with dynamic page title, administrator badge,
 *     public portal shortcut, and logout button
 *   - Scrollable content viewport
 */
import { useState } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { Menu, Globe, LogOut, ShieldCheck, User } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const PAGE_TITLES = {
  '/admin/dashboard':          'Executive Overview & Analytics',
  '/admin/announcements':      'Construction Announcements',
  '/admin/announcements/new':  'Create Announcement',
  '/admin/road-closures':      'Road Closures & Traffic Advisories',
  '/admin/road-closures/new':  'Add Road Closure Notice',
  '/admin/feedback':           'Community Feedback & Complaints',
  '/admin/users':              'User Management Directory',
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Derive title from current path or fall back
  const currentTitle =
    PAGE_TITLES[location.pathname] ||
    (location.pathname.includes('/edit')
      ? 'Edit Record'
      : location.pathname.includes('/feedback/')
      ? 'Complaint Details & Action'
      : 'Administrator Panel');

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header
          className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between shadow-xs flex-shrink-0 z-10"
        >
          {/* Left: Mobile Toggle & Page Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              id="admin-mobile-menu-toggle"
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                {currentTitle}
              </h1>
              <p className="text-[11px] text-gray-400 hidden sm:block">
                Penang LRT Mutiara Line Administration
              </p>
            </div>
          </div>

          {/* Right: Actions & Admin Profile */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:text-teal-700 hover:bg-teal-50 border border-gray-200 transition-colors"
              title="Visit public portal"
            >
              <Globe size={14} className="text-teal-600" />
              <span>Public Portal</span>
            </Link>

            <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-xs"
                style={{ backgroundColor: 'var(--color-teal)' }}
              >
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-gray-800 leading-tight truncate max-w-[130px]">
                  {user?.name || 'Administrator'}
                </p>
                <p className="text-[10px] text-teal-600 font-semibold leading-tight">
                  Admin Access
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                title="Log out"
                aria-label="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Main Viewport */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
