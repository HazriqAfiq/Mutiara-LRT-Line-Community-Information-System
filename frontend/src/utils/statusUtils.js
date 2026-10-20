/**
 * statusUtils.js
 *
 * Maps raw status strings (as returned by the API) to display
 * labels and CSS badge classes defined in index.css.
 *
 * Keep this file in sync with the allowed status values in the spec.
 */

/* ── Announcement ──────────────────────────────────────── */
export const ANNOUNCEMENT_STATUSES = {
  draft:     { label: 'Draft',     badgeClass: 'badge-draft' },
  published: { label: 'Published', badgeClass: 'badge-published' },
  archived:  { label: 'Archived',  badgeClass: 'badge-archived' },
};

export const ANNOUNCEMENT_CATEGORIES = [
  'General Update',
  'Construction Progress',
  'Public Notice',
  'Safety Advisory',
];

/* ── Road Closure ──────────────────────────────────────── */
export const ROAD_CLOSURE_STATUSES = {
  scheduled: { label: 'Scheduled', badgeClass: 'badge-scheduled' },
  active:    { label: 'Active',    badgeClass: 'badge-active' },
  completed: { label: 'Completed', badgeClass: 'badge-completed' },
};

/* ── Feedback ──────────────────────────────────────────── */
export const FEEDBACK_STATUSES = {
  pending:     { label: 'Pending',     badgeClass: 'badge-pending' },
  in_progress: { label: 'In Progress', badgeClass: 'badge-in_progress' },
  resolved:    { label: 'Resolved',    badgeClass: 'badge-resolved' },
};

export const FEEDBACK_CATEGORIES = [
  'Construction Noise',
  'Road Access',
  'Pedestrian Safety',
  'Traffic Disruption',
  'Business Access',
  'Other',
];

/* ── User Roles ────────────────────────────────────────── */
export const USER_ROLES = {
  admin: { label: 'Administrator', badgeClass: 'badge-admin' },
  user:  { label: 'User',          badgeClass: 'badge-user' },
};

/* ── Helpers ───────────────────────────────────────────── */

/**
 * Returns { label, badgeClass } for a given status string and type.
 * Falls back gracefully if status is unknown.
 *
 * @param {string} status  - e.g. "pending"
 * @param {string} type    - "announcement" | "roadClosure" | "feedback" | "user"
 */
export function getStatusInfo(status, type) {
  const maps = {
    announcement: ANNOUNCEMENT_STATUSES,
    roadClosure:  ROAD_CLOSURE_STATUSES,
    feedback:     FEEDBACK_STATUSES,
    user:         USER_ROLES,
  };
  const map = maps[type] || {};
  return map[status] || { label: status ?? 'Unknown', badgeClass: 'badge-draft' };
}
