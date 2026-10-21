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
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
      {/* ── Fixed Full-Screen LRT Background Image ─────────────────── */}
      <img
        src="/images/hero_lrt.jpg"
        alt="Penang LRT Mutiara Line elevated train"
        className="fixed inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* ── Subtle Dark Gradient Overlay ────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(10, 31, 56, 0.72) 0%, rgba(18, 55, 91, 0.62) 50%, rgba(10, 31, 56, 0.80) 100%)',
        }}
      />

      {/* ── Centered Glassmorphic Form Card ─────────────────────────── */}
      <div className="relative z-10 w-full max-w-[430px] my-auto animate-in fade-in zoom-in-95 duration-200">
        <div
          className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40"
          style={{
            boxShadow:
              '0 20px 45px -10px rgba(10, 31, 56, 0.45), 0 10px 20px -5px rgba(0, 0, 0, 0.20)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
