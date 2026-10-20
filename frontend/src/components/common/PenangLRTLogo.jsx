/**
 * components/common/PenangLRTLogo.jsx
 *
 * Official Penang LRT Mutiara Line emblem and wordmark
 * featuring the stylized Penang Bridge suspension cables and rapid rail deck.
 * Supports light (for white navbar) and dark (for navy footer) variants.
 */
export default function PenangLRTLogo({ variant = 'dark', className = '' }) {
  const isLight = variant === 'light'; // Light text for dark navy backgrounds
  const textColor = isLight ? 'text-white' : 'text-[#0F2C59]';
  const strokeColor = '#009688'; // Vibrant Penang transit teal

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Penang Bridge Cable-Stayed & Transit Track Emblem */}
      <svg
        className="h-9 w-auto flex-shrink-0"
        viewBox="0 0 54 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Penang LRT Mutiara Line Logo"
      >
        {/* Main bridge deck line */}
        <line x1="2" y1="26" x2="52" y2="26" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />

        {/* Central main pylons */}
        <line x1="27" y1="4" x2="27" y2="26" stroke={strokeColor} strokeWidth="2.2" />

        {/* Stay cables - outer set */}
        <path d="M7 26L27 6L47 26" stroke={strokeColor} strokeWidth="1.6" strokeLinejoin="round" />

        {/* Stay cables - mid set */}
        <path d="M14 26L27 11L40 26" stroke={strokeColor} strokeWidth="1.4" strokeLinejoin="round" />

        {/* Stay cables - inner set */}
        <path d="M20 26L27 16L34 26" stroke={strokeColor} strokeWidth="1.2" strokeLinejoin="round" />

        {/* Transit railway track indicator */}
        <line x1="6" y1="31" x2="48" y2="31" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeDasharray="3.5 2" />

        {/* Pier foundations */}
        <line x1="16" y1="26" x2="16" y2="34" stroke={strokeColor} strokeWidth="1.8" />
        <line x1="38" y1="26" x2="38" y2="34" stroke={strokeColor} strokeWidth="1.8" />
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col text-left">
        <span
          className={`text-[12px] font-black tracking-wider leading-none uppercase ${textColor}`}
          style={{ letterSpacing: '0.08em' }}
        >
          PENANG LRT
        </span>
        <span
          className={`text-[15px] font-black tracking-tight leading-tight uppercase ${textColor} mt-0.5`}
          style={{ letterSpacing: '0.02em' }}
        >
          MUTIARA LINE
        </span>
      </div>
    </div>
  );
}
