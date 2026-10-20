/**
 * components/layout/Navbar.jsx
 *
 * Top navigation bar for public and user-facing pages.
 * Shows different links based on authentication state and role.
 */
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Train, ChevronDown, LogOut, User, LayoutDashboard, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'text-amber-400'
        : 'text-white/80 hover:text-white'
    }`;

  return (
    <header
      className="sticky top-0 z-40 shadow-lg"
      style={{ backgroundColor: 'var(--color-navy)' }}
    >
      <nav className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-teal)' }}
            >
              <Train size={18} color="white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-tight">Mutiara LRT</p>
              <p className="text-white/60 text-xs leading-tight">Community Platform</p>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-5">
            <NavLink to="/"              end className={navLinkClass}>Home</NavLink>
            <NavLink to="/announcements"     className={navLinkClass}>Construction Updates</NavLink>
            <NavLink to="/road-closures"     className={navLinkClass}>Road Closures</NavLink>
            {isAuthenticated && !isAdmin && (
              <>
                <NavLink to="/dashboard"   className={navLinkClass}>Dashboard</NavLink>
                <NavLink to="/my-feedback" className={navLinkClass}>My Feedback</NavLink>
              </>
            )}
            <NavLink
              to={isAuthenticated ? (isAdmin ? "/admin/feedback" : "/feedback/new") : "/login"}
              className={navLinkClass}
            >
              Submit Feedback
            </NavLink>
          </div>

          {/* Desktop auth controls */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
                  id="user-menu-button"
                  aria-haspopup="true"
                  aria-expanded={userMenuOpen}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: 'var(--color-teal)' }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown size={14} />
                </button>

                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50"
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    {isAdmin ? (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard size={15} /> Admin Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <LayoutDashboard size={15} /> My Dashboard
                        </Link>
                        <Link
                          to="/my-feedback"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <MessageSquare size={15} /> My Feedback
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User size={15} /> Profile
                        </Link>
                      </>
                    )}

                    <div className="border-t border-gray-100 mt-1">
                      <button
                        onClick={() => { setUserMenuOpen(false); handleLogout(); }}
                        className="flex items-center gap-2 px-4 py-2 text-sm w-full text-left hover:bg-red-50"
                        style={{ color: 'var(--color-error)' }}
                      >
                        <LogOut size={15} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login"    className="btn btn-ghost btn-sm" style={{ color: 'white' }}>Log In</Link>
                <Link to="/register" className="btn btn-secondary btn-sm">Register</Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle mobile menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 py-4 space-y-2">
            {[
              { to: '/',              label: 'Home',            end: true },
              { to: '/announcements', label: 'Construction Updates' },
              { to: '/road-closures', label: 'Road Closures' },
              ...(isAuthenticated && !isAdmin
                ? [
                    { to: '/dashboard', label: 'Dashboard' },
                    { to: '/my-feedback', label: 'My Feedback' },
                  ]
                : []),
              {
                to: isAuthenticated ? (isAdmin ? '/admin/feedback' : '/feedback/new') : '/login',
                label: 'Submit Feedback',
              },
            ].map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </NavLink>
            ))}

            <div className="border-t border-white/10 pt-3 mt-3">
              {isAuthenticated ? (
                <>
                  <p className="px-3 text-xs text-white/40 mb-2">
                    {user.name} ({user.role})
                  </p>
                  {isAdmin ? (
                    <Link to="/admin/dashboard" className="block px-3 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>
                      Admin Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link to="/dashboard" className="block px-3 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>
                        My Dashboard
                      </Link>
                      <Link to="/profile" className="block px-3 py-2 text-sm text-white/70 hover:text-white" onClick={() => setMobileOpen(false)}>
                        Profile
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => { setMobileOpen(false); handleLogout(); }}
                    className="block w-full text-left px-3 py-2 text-sm mt-1"
                    style={{ color: '#FCA5A5' }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-3 px-3">
                  <Link to="/login"    className="btn btn-outline btn-sm flex-1 text-center" style={{ color:'white', borderColor:'white' }} onClick={() => setMobileOpen(false)}>Log In</Link>
                  <Link to="/register" className="btn btn-secondary btn-sm flex-1 text-center" onClick={() => setMobileOpen(false)}>Register</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
