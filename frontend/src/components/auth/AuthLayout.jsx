/**
 * components/auth/AuthLayout.jsx
 *
 * Minimalist, modern LRT-themed authentication layout:
 * - Full-screen background image of the Penang LRT elevated line.
 * - Subtle dark gradient overlay for photographic depth and high contrast.
 * - Clean, white, slightly transparent centered glassmorphism card.
 * - Fully responsive across mobile, tablet, and desktop viewports.
 * - No promotional clutter or marketing copy — keeps total focus on the form.
 */
export default function AuthLayout({ children }) {
  return (
    <div className="relative h-screen w-full flex items-center justify-center p-3 sm:p-4 overflow-y-auto lg:overflow-hidden">
      {/* ── Fixed Full-Screen LRT Background Image ─────────────────── */}
      <img
        src="/images/hero_lrt.jpg"
        alt="Penang LRT Mutiara Line elevated train"
        className="fixed inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* ── High-Contrast Civic Transit Overlay ─────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(18, 55, 91, 0.88) 0%, rgba(12, 38, 64, 0.94) 100%)',
        }}
      />

      {/* ── Centered Civic Form Container ──────────────────────────── */}
      <div className="relative z-10 w-full max-w-[420px] my-auto">
        <div
          className="bg-white rounded-lg p-5 sm:p-6 shadow-lg border border-gray-200"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
