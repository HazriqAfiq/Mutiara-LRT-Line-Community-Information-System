/**
 * components/layout/Footer.jsx
 *
 * Site-wide footer for public-facing pages.
 * Contains useful links, disclaimer, and project information.
 */
import { Link } from 'react-router-dom';
import { Train, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--color-navy)', color: 'white' }}>
      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-teal)' }}
              >
                <Train size={18} color="white" />
              </div>
              <div>
                <p className="font-bold text-sm">Mutiara LRT Line</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Community Platform
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              A centralized information portal for residents, commuters, and businesses
              affected by the Penang LRT Mutiara Line construction.
            </p>
            <p className="text-xs mt-3 italic" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Academic simulation project — CMT322, Universiti Sains Malaysia.
              Not affiliated with any official LRT operator.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--color-amber)' }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/',              label: 'Home' },
                { to: '/announcements', label: 'Construction Updates' },
                { to: '/road-closures', label: 'Road Closures' },
                { to: '/feedback/new',  label: 'Submit Feedback' },
                { to: '/login',         label: 'Login' },
                { to: '/register',      label: 'Register' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                    onMouseEnter={(e) => (e.target.style.color = 'white')}
                    onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.6)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--color-amber)' }}>
              Community Resources
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <li>Construction Working Hours</li>
              <li>Traffic Advisory Guidelines</li>
              <li>Business Support Resources</li>
              <li>Noise & Dust Standards</li>
              <li>Safety Requirements</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--color-amber)' }}>
              Project Hotline (Demo)
            </h3>
            <ul className="space-y-3">
              {[
                { icon: <Phone size={14} />, text: '1800-88-5678 (Toll-free)' },
                { icon: <Mail size={14} />,  text: 'info@mutiara-lrt.demo' },
                { icon: <MapPin size={14} />, text: 'Penang LRT Project Office\nGeorge Town, Penang' },
              ].map(({ icon, text }, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-teal)' }}>
                    {icon}
                  </span>
                  <span style={{ whiteSpace: 'pre-line' }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-4"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          <p>© {currentYear} Mutiara LRT Community Platform. Academic project — CMT322 USM.</p>
          <p>This is a simulated platform. All data is fictional.</p>
        </div>
      </div>
    </footer>
  );
}
