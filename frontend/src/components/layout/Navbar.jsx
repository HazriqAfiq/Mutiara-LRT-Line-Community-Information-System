/**
 * components/layout/Navbar.jsx
 *
 * Redesigned to match the official Laluan Mutiara reference site layout:
 * - Top utility bar: phone, email on left; language on right
 * - Floating rounded-pill dark teal/navy navbar below utility bar
 * - Active nav link has golden-amber underline indicator
 * - Responsive mobile drawer
 */
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  ChevronDown,
  LogOut,
  User,
  LayoutDashboard,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PenangLRTLogo from '../common/PenangLRTLogo';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/announcements?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* ── Fixed Header ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300">
        {/* ── Civic Navbar Container ────────────────────────── */}
        <div
          className="px-3 sm:px-5 pointer-events-none pt-3 transition-all duration-300"
          style={{ background: 'transparent' }}
        >
          <nav
            className="max-w-[1200px] mx-auto rounded-lg px-4 sm:px-6 pointer-events-auto transition-all duration-200"
            style={{
              backgroundColor: '#12375B',
              boxShadow: scrolled
                ? '0 4px 12px 0 rgba(0,0,0,0.2)'
                : '0 2px 6px 0 rgba(0,0,0,0.12)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
          <div className="flex items-center justify-between h-[56px]">

            {/* Left: Project Branding */}
            <Link to="/" className="flex items-center flex-shrink-0 group">
              <PenangLRTLogo variant="light" />
            </Link>

            {/* Center Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-6">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors pb-0.5 ${
                    isActive
                      ? 'text-[#F4B942] border-b-2 border-[#F4B942]'
                      : 'text-white/90 hover:text-white'
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors pb-0.5 ${
                    isActive
                      ? 'text-[#F4B942] border-b-2 border-[#F4B942]'
                      : 'text-white/90 hover:text-white'
                  }`
                }
              >
                About
              </NavLink>

              <NavLink
                to="/announcements"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors pb-0.5 ${
                    isActive
                      ? 'text-[#F4B942] border-b-2 border-[#F4B942]'
                      : 'text-white/90 hover:text-white'
                  }`
                }
              >
                Construction Updates
              </NavLink>

              <NavLink
                to="/road-closures"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors pb-0.5 ${
                    isActive
                      ? 'text-[#F4B942] border-b-2 border-[#F4B942]'
                      : 'text-white/90 hover:text-white'
                  }`
                }
              >
                Traffic Advisories
              </NavLink>

              <NavLink
                to={isAuthenticated ? (isAdmin ? '/admin/feedback' : '/feedback/new') : '/feedback/new'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors pb-0.5 ${
                    isActive
                      ? 'text-[#F4B942] border-b-2 border-[#F4B942]'
                      : 'text-white/90 hover:text-white'
                  }`
                }
              >
                Submit Feedback
              </NavLink>
            </div>

            {/* Right Controls */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => setSearchOpen((prev) => !prev)}
                  className="p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
                  aria-label="Search portal"
                >
                  <Search size={17} />
                </button>
                {searchOpen && (
                  <form
                    onSubmit={handleSearchSubmit}
                    className="absolute right-0 top-11 w-72 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-50 flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search updates or locations..."
                      className="w-full text-xs px-3 py-1.5 outline-none rounded-md border border-gray-200 focus:border-[#009688]"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-[#009688] text-white text-xs px-3 py-1.5 rounded-md font-semibold hover:bg-teal-700 flex-shrink-0"
                    >
                      Go
                    </button>
                  </form>
                )}
              </div>

              {/* Auth */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className="flex items-center gap-2 text-white/90 hover:text-white text-xs font-semibold transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md border border-white/20"
                    id="user-menu-button"
                    aria-haspopup="true"
                    aria-expanded={userMenuOpen}
                  >
                    <div className="w-5 h-5 rounded bg-[#F4B942] text-[#12375B] text-[10px] font-bold flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown size={13} className="text-white/50" />
                  </button>

                  {userMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
                      onMouseLeave={() => setUserMenuOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-bold text-gray-800 truncate">{user.name}</p>
                        <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                      </div>

                      {isAdmin ? (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <LayoutDashboard size={14} className="text-[#16A6A1]" /> Administrator Panel
                        </Link>
                      ) : (
                        <>
                          <Link
                            to="/dashboard"
                            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <LayoutDashboard size={14} className="text-[#16A6A1]" /> My Dashboard
                          </Link>
                          <Link
                            to="/my-feedback"
                            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <MessageSquare size={14} className="text-[#16A6A1]" /> My Feedback
                          </Link>
                          <Link
                            to="/profile"
                            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <User size={14} className="text-[#16A6A1]" /> Profile
                          </Link>
                        </>
                      )}

                      <div className="border-t border-gray-100 mt-1">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            handleLogout();
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold w-full text-left text-red-600 hover:bg-red-50"
                        >
                          <LogOut size={14} /> Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3 py-1.5 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-md transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-1.5 text-xs font-bold text-[#12375B] bg-[#F4B942] hover:bg-[#d9992a] rounded-md shadow-sm transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="p-1.5 text-white/80 hover:text-white transition-colors rounded-md"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileOpen && (
            <div className="lg:hidden border-t border-white/10 py-4 space-y-1 px-1">
              <NavLink
                to="/"
                end
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-semibold ${
                    isActive ? 'bg-white/15 text-[#F4B942]' : 'text-white/80 hover:bg-white/10'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-semibold ${
                    isActive ? 'bg-white/15 text-[#F4B942]' : 'text-white/80 hover:bg-white/10'
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/announcements"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-semibold ${
                    isActive ? 'bg-white/15 text-[#F4B942]' : 'text-white/80 hover:bg-white/10'
                  }`
                }
              >
                Construction Updates
              </NavLink>
              <NavLink
                to="/road-closures"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-semibold ${
                    isActive ? 'bg-white/15 text-[#F4B942]' : 'text-white/80 hover:bg-white/10'
                  }`
                }
              >
                Traffic Advisories
              </NavLink>
              <NavLink
                to={isAuthenticated ? (isAdmin ? '/admin/feedback' : '/feedback/new') : '/feedback/new'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-semibold ${
                    isActive ? 'bg-white/15 text-[#F4B942]' : 'text-white/80 hover:bg-white/10'
                  }`
                }
              >
                Submit Feedback
              </NavLink>

              {/* Mobile Auth */}
              <div className="pt-3 border-t border-white/10 mt-2 flex gap-2 px-1">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-center px-4 py-2 text-sm font-semibold text-red-400 bg-red-900/20 rounded-lg"
                  >
                    Sign Out ({user.name})
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 text-center px-4 py-2 text-sm font-semibold text-white/80 border border-white/20 rounded-full"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 text-center px-4 py-2 text-sm font-semibold text-[#0F2C59] bg-[#F4B942] rounded-full"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>

    {/* Spacer so page content starts cleanly below the fixed header */}
    <div className="h-[76px] pointer-events-none" aria-hidden="true" />
  </>
  );
}
