/**
 * components/layout/PublicLayout.jsx
 *
 * Layout wrapper for all public-facing pages (home, announcements,
 * road closures, etc.). Renders:
 *   <Navbar />
 *   <main> <Outlet /> </main>   ← child page renders here
 *   <Footer />
 *
 * React Router's <Outlet /> is the placeholder where the matched
 * child route component gets rendered.
 */
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
