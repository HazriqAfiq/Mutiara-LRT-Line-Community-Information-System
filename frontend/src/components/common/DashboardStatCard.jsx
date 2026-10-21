/**
 * components/common/DashboardStatCard.jsx
 *
 * KPI card for user & admin dashboards.
 * Displays metric count, title, status indicator, and icon.
 */
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const COLOR_MAP = {
  navy: {
    bg: 'rgba(18, 55, 91, 0.08)',
    text: 'var(--color-navy)',
    border: 'border-slate-200',
  },
  warning: {
    bg: 'rgba(245, 158, 11, 0.1)',
    text: '#B45309',
    border: 'border-amber-200',
  },
  info: {
    bg: 'rgba(59, 130, 246, 0.1)',
    text: '#1D4ED8',
    border: 'border-blue-200',
  },
  success: {
    bg: 'rgba(16, 185, 129, 0.1)',
    text: '#047857',
    border: 'border-emerald-200',
  },
  teal: {
    bg: 'rgba(22, 166, 161, 0.1)',
    text: 'var(--color-teal)',
    border: 'border-teal-200',
  },
};

export default function DashboardStatCard({
  title,
  value = 0,
  icon,
  color = 'navy',
  subtitle,
  link,
}) {
  const scheme = COLOR_MAP[color] || COLOR_MAP.navy;

  const CardContent = (
    <div
      className={`card p-5 bg-white border ${scheme.border} shadow-sm rounded-lg flex flex-col justify-between h-full hover:border-gray-300 transition-colors group`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
          {title}
        </span>
        <div
          className="w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: scheme.bg, color: scheme.text }}
        >
          {icon}
        </div>
      </div>

      <div className="flex items-baseline justify-between mt-auto">
        <div>
          <p className="text-3xl font-extrabold" style={{ color: 'var(--color-navy)' }}>
            {value}
          </p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>

        {link && (
          <span
            className="text-xs font-semibold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: 'var(--color-teal)' }}
          >
            View <ArrowUpRight size={13} />
          </span>
        )}
      </div>
    </div>
  );

  if (link) {
    return <Link to={link}>{CardContent}</Link>;
  }

  return CardContent;
}
