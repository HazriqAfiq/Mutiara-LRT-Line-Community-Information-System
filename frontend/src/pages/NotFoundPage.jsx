/**
 * pages/NotFoundPage.jsx
 * Route: * (catch-all)
 */
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Large 404 number */}
      <p
        className="font-black leading-none mb-4"
        style={{ fontSize: '7rem', color: 'var(--color-gray-200)' }}
      >
        404
      </p>

      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: 'var(--color-navy)' }}
      >
        <Search size={28} color="white" />
      </div>

      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-navy)' }}>
        Page Not Found
      </h1>
      <p className="text-sm mb-8 max-w-xs" style={{ color: 'var(--color-gray-500)' }}>
        The page you are looking for does not exist or may have been moved.
      </p>

      <Link to="/" className="btn btn-primary flex items-center gap-2">
        <Home size={16} /> Back to Home
      </Link>
    </div>
  );
}
