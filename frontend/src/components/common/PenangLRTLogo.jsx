/**
 * components/common/PenangLRTLogo.jsx
 *
 * Official Penang LRT Mutiara Line logo with transparent background.
 * Adapts seamlessly across dark navigation bars, footers, and light authentication cards.
 */
export default function PenangLRTLogo({ variant = 'dark', className = '', imgClassName = '' }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/images/mutiara_lrt_logo.png"
        alt="Penang LRT Mutiara Line Update"
        className={`h-7 sm:h-8 w-auto object-contain flex-shrink-0 ${imgClassName}`}
      />
    </div>
  );
}
