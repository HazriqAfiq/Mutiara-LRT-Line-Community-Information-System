/**
 * components/layout/UserLayout.jsx
 *
 * Layout wrapper for authenticated user pages (dashboard, feedback, profile).
 * Uses the same Navbar + Footer as PublicLayout but wraps the main area
 * with a consistent page container.
 */
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1" style={{ backgroundColor: 'var(--color-bg)' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
