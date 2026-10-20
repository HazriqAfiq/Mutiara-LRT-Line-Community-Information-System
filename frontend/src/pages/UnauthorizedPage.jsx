/**
 * pages/UnauthorizedPage.jsx
 * Route: /unauthorized
 */
import { Link } from 'react-router-dom';
import { ShieldX, Home, LogIn } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: '#FEE2E2' }}
      >
        <ShieldX size={28} style={{ color: 'var(--color-error)' }} />
      </div>

      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
        Access Denied
      </h1>
      <p className="text-sm mb-8 max-w-xs" style={{ color: 'var(--color-gray-500)' }}>
        You do not have permission to access this page. Please log in with the appropriate account.
      </p>

      <div className="flex gap-3">
        <Link to="/" className="btn btn-outline flex items-center gap-2">
          <Home size={16} /> Home
        </Link>
        <Link to="/login" className="btn btn-primary flex items-center gap-2">
          <LogIn size={16} /> Log In
        </Link>
      </div>
    </div>
  );
}
