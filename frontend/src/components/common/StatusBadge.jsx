/**
 * components/common/StatusBadge.jsx
 *
 * Renders a coloured pill badge for a status string.
 *
 * Props:
 *   status  {string}  - e.g. "pending", "active", "published"
 *   type    {string}  - "announcement" | "roadClosure" | "feedback"
 */
import { getStatusInfo } from '../../utils/statusUtils';

export default function StatusBadge({ status, type }) {
  const { label, badgeClass } = getStatusInfo(status, type);

  return (
    <span className={`badge ${badgeClass}`}>
      {label}
    </span>
  );
}
