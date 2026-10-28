/**
 * components/layout/Sidebar.jsx
 *
 * Fixed navigation sidebar for the admin portal.
 * Features:
 *   - Platform branding with academic admin badge
 *   - Active route highlighting (Teal highlight)
 *   - All 5 required admin sections:
 *       1. Dashboard
 *       2. Announcements
 *       3. Road Closures
 *       4. Feedback Management
 *       5. User Management
 *   - "Back to Public Website" link
 *   - Administrator profile snippet & Logout action
 *   - Mobile responsive drawer with backdrop
 */
import { Link, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Megaphone,
  AlertTriangle,
  MessageSquare,
  Users,
  Train,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/admin/dashboard',     label: 'Dashboard',           icon: <LayoutDashboard size={18} /> },
  { to: '/admin/announcements', label: 'Announcements',       icon: <Megaphone size={18} /> },
  { to: '/admin/road-closures', label: 'Road Closures',       icon: <AlertTriangle size={18} /> },
  { to: '/admin/feedback',      label: 'Feedback Management', icon: <MessageSquare size={18} /> },
  { to: '/admin/users',         label: 'User Management',     icon: <Users size={18} /> },
];

export default function Sidebar({ isOpen, onClose }) {
  const sidebarContent = (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--color-navy)' }}>
      {/* Brand header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <Link to="/admin/dashboard" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md flex-shrink-0"
            style={{ backgroundColor: 'var(--color-teal)' }}
          >
            <Train size={17} color="white" />
          </div>
          <div>
            <p className="text-white text-xs font-bold leading-tight">Mutiara LRT</p>
            <p className="text-white/60 text-[11px] leading-tight">Administrator Panel</p>
          </div>
        </Link>

        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="lg:hidden text-white/60 hover:text-white p-1 rounded-lg"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1.5">
          {NAV_ITEMS.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/admin/dashboard'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'text-white/65 hover:text-white hover:bg-white/5'
                  }`
                }
                style={({ isActive }) =>
                  isActive ? { backgroundColor: 'var(--color-teal)' } : {}
                }
              >
                {icon}
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar — fixed */}
      <aside className="hidden lg:block w-64 flex-shrink-0 h-screen sticky top-0 overflow-hidden shadow-xl z-20">
        {sidebarContent}
      </aside>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex" onClick={onClose}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <aside
            className="relative w-64 h-full z-10 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
