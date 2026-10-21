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
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Official Mutiara Line Emblem */}
      <img
        src="/images/mutiara_lrt_logo.png"
        alt="Penang LRT Mutiara Line"
        className="h-10 w-auto object-contain flex-shrink-0 rounded-sm"
      />

      {/* Wordmark */}
      <div className="flex flex-col text-left">
        <span
          className={`text-[16px] font-black tracking-tight leading-none ${textColor}`}
        >
          MutiaraLine
        </span>
        <div
          className={`flex justify-between w-full text-[9px] font-black leading-tight uppercase ${
            isLight ? 'text-[#F4B942]' : 'text-[#16A6A1]'
          } mt-0.5 select-none`}
          aria-label="UPDATE"
        >
          <span>U</span>
          <span>P</span>
          <span>D</span>
          <span>A</span>
          <span>T</span>
          <span>E</span>
        </div>
      </div>
    </div>
  );
}
