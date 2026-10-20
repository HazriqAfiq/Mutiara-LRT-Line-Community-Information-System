/**
 * dateUtils.js
 *
 * Centralised date formatting helpers. Using these functions means
 * that when the backend sends ISO 8601 strings, every component
 * displays them consistently.
 */

/**
 * Format an ISO date string to a human-readable short date.
 * e.g. "2026-10-15T09:30:00+08:00" → "15 Oct 2026"
 */
export function formatDate(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-MY', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format an ISO date string to include time.
 * e.g. "2026-10-15T09:30:00+08:00" → "15 Oct 2026, 9:30 AM"
 */
export function formatDateTime(isoString) {
  if (!isoString) return '—';
  const date = new Date(isoString);
  return date.toLocaleDateString('en-MY', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Returns a relative time label such as "3 days ago" or "just now".
 */
export function timeAgo(isoString) {
  if (!isoString) return '—';
  const now = new Date();
  const then = new Date(isoString);
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr  = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60)  return 'just now';
  if (diffMin < 60)  return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  if (diffHr  < 24)  return `${diffHr} hour${diffHr !== 1 ? 's' : ''} ago`;
  if (diffDay < 30)  return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
  return formatDate(isoString);
}

/**
 * Return true if the given ISO date is in the past.
 */
export function isPast(isoString) {
  if (!isoString) return false;
  return new Date(isoString) < new Date();
}

/**
 * Format a date range for display, e.g. "15 Oct – 20 Nov 2026"
 */
export function formatDateRange(startIso, endIso) {
  if (!startIso) return '—';
  const start = formatDate(startIso);
  const end   = endIso ? formatDate(endIso) : 'Ongoing';
  return `${start} – ${end}`;
}
