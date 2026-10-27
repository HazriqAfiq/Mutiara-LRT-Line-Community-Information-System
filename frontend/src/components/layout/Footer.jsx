/**
 * components/layout/Footer.jsx
 *
 * High-contrast, precise civic infrastructure footer:
 * - Clear visual hierarchy with pure white & amber typography
 * - High WCAG AAA contrast ratio on dark navy background (#0c2640)
 * - Explicit text colors on all links (prevents teal default inheritance)
 * - 4 organized columns: Brand & Info, Navigation, Public Services, Direct Contact
 * - Bottom bar with copyright and CMT322 academic prototype disclaimer
 */
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldAlert,
  ExternalLink,
} from 'lucide-react';
import PenangLRTLogo from '../common/PenangLRTLogo';

export default function Footer() {
  return (
    <footer
      className="text-white border-t border-slate-700/80 relative z-30"
      style={{ backgroundColor: '#0c2640' }}
    >
      {/* ── Main Footer Grid ───────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Column 1: Project Identity & Scope (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block group">
              <PenangLRTLogo variant="light" />
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide">
              Connect . Inform . Engage
            </p>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4B942]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  to="/"
                  className="text-slate-200 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                >
                  <span className="text-[#F4B942] text-[10px]">▸</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-200 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                >
                  <span className="text-[#F4B942] text-[10px]">▸</span>
                  <span>About Project</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/announcements"
                  className="text-slate-200 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                >
                  <span className="text-[#F4B942] text-[10px]">▸</span>
                  <span>Construction Updates</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/road-closures"
                  className="text-slate-200 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                >
                  <span className="text-[#F4B942] text-[10px]">▸</span>
                  <span>Traffic Advisories</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/feedback/new"
                  className="text-slate-200 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                >
                  <span className="text-[#F4B942] text-[10px]">▸</span>
                  <span>Submit Community Feedback</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Community Services & Portals (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4B942]">
              Portals
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  to="/login"
                  className="text-slate-200 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                >
                  <span className="text-[#F4B942] text-[10px]">▸</span>
                  <span>Resident Login</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-slate-200 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                >
                  <span className="text-[#F4B942] text-[10px]">▸</span>
                  <span>Register Account</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/my-feedback"
                  className="text-slate-200 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                >
                  <span className="text-[#F4B942] text-[10px]">▸</span>
                  <span>Track Feedback</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://laluanmutiara.mymrt.com.my/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-[#F4B942] transition-colors inline-flex items-center gap-1"
                >
                  <span>Official MRT Corp</span>
                  <ArrowUpRight size={12} className="text-[#F4B942]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4B942]">
              Contact &amp; Assistance
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="text-[#F4B942] flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="tel:1800886782"
                    className="font-bold text-white hover:text-[#F4B942] transition-colors"
                  >
                    1800-88-6782
                  </a>
                  <p className="text-[11px] text-slate-300">Community Hotline</p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Mail size={16} className="text-[#F4B942] flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="mailto:feedback_pml@mymrt.com.my"
                    className="text-slate-200 hover:text-white transition-colors"
                  >
                    feedback_pml@mymrt.com.my
                  </a>
                  <p className="text-[11px] text-slate-300">General Inquiries</p>
                </div>
              </li>

              <li className="flex items-center gap-2.5">
                <MapPin size={16} className="text-[#F4B942] flex-shrink-0" />
                <span className="text-slate-200 font-medium">Penang, Malaysia</span>
              </li>
            </ul>

            {/* Social media presence */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Follow Updates
              </p>
              <div className="flex items-center gap-2">
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#F4B942] hover:text-[#0F2C59] flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#F4B942] hover:text-[#0F2C59] flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#youtube"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#F4B942] hover:text-[#0F2C59] flex items-center justify-center text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ─────────────────────────────────────────────── */}
      <div className="border-t border-slate-700/80 py-4" style={{ backgroundColor: '#071829' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-300">
          <p className="text-center md:text-left">
            © 2026 Penang LRT Mutiara Line Community Information System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
