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
  Phone,
  Mail,
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
        {/* ── Top Utility Bar ───────────────────────────────────────── */}
        <div
          className={`bg-white border-b border-gray-100 px-4 sm:px-6 pointer-events-auto transition-all duration-300 ${
            scrolled
              ? 'max-h-0 opacity-0 -translate-y-full overflow-hidden'
              : 'max-h-12 opacity-100 translate-y-0'
          }`}
        >
          <div className="max-w-[1200px] mx-auto flex items-center justify-between h-9">
            {/* Left: contact info */}
            <div className="flex items-center gap-4 text-[11px] text-gray-500">
              <a
                href="tel:1800886782"
                className="flex items-center gap-1.5 hover:text-[#009688] transition-colors"
              >
                <Phone size={11} />
                <span>1800-88-6782</span>
              </a>
              <a
                href="mailto:feedback@penanglrt-prototype.my"
                className="hidden sm:flex items-center gap-1.5 hover:text-[#009688] transition-colors"
              >
                <Mail size={11} />
                <span>feedback@penanglrt-prototype.my</span>
              </a>
            </div>
            {/* Right: language */}
            <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-500">
              <span className="text-[#009688]">EN</span>
              <span className="text-gray-300">|</span>
              <span className="hover:text-gray-700 cursor-pointer">BM</span>
            </div>
          </div>
        </div>

        {/* ── Floating Pill Navbar Container ────────────────────────── */}
        {/* Transparent wrapper so content flows behind rounded edges (no rectangular box) */}
        <div
          className="px-3 sm:px-5 pointer-events-none pt-3 transition-all duration-300"
          style={{ background: 'transparent' }}
        >
          <nav
            className="max-w-[1200px] mx-auto rounded-[32px] px-5 sm:px-7 pointer-events-auto transition-all duration-300"
            style={{
              backgroundColor: 'rgba(26, 74, 94, 0.95)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: scrolled
                ? '0 14px 38px 0 rgba(0,0,0,0.32), 0 4px 14px 0 rgba(0,0,0,0.18)'
                : '0 8px 32px 0 rgba(0,0,0,0.26), 0 2px 8px 0 rgba(0,0,0,0.14)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
          <div className="flex items-center justify-between h-[60px]">

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
                    className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-semibold transition-colors bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/20"
                    id="user-menu-button"
                    aria-haspopup="true"
                    aria-expanded={userMenuOpen}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#F4B942] text-[#0F2C59] text-[11px] font-bold flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown size={13} className="text-white/50" />
                  </button>

                  {userMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50"
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
                          <LayoutDashboard size={14} className="text-[#009688]" /> Administrator Panel
                        </Link>
                      ) : (
                        <>
                          <Link
                            to="/dashboard"
                            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <LayoutDashboard size={14} className="text-[#009688]" /> My Dashboard
                          </Link>
                          <Link
                            to="/my-feedback"
                            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <MessageSquare size={14} className="text-[#009688]" /> My Feedback
                          </Link>
                          <Link
                            to="/profile"
                            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <User size={14} className="text-[#009688]" /> Profile
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
                    className="px-4 py-1.5 text-sm font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-full transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-1.5 text-sm font-semibold text-[#0F2C59] bg-[#F4B942] hover:bg-[#e5a82e] rounded-full shadow-sm transition-colors"
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
                className="p-2 text-white/80 hover:text-white transition-colors rounded-lg"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
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
    <div className="h-[108px] pointer-events-none" aria-hidden="true" />
  </>
  );
}
