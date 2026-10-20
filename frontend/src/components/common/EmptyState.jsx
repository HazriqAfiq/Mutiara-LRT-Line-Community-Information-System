/**
 * components/common/EmptyState.jsx
 *
 * Displayed when a list or search returns no results.
 *
 * Props:
 *   icon     {ReactNode}  - Lucide icon element (optional)
 *   title    {string}     - Main heading
 *   message  {string}     - Descriptive sub-text
 *   action   {ReactNode}  - Optional button or link
 */
export default function EmptyState({ icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && (
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: 'var(--color-gray-100)' }}
        >
          <span style={{ color: 'var(--color-gray-400)' }}>{icon}</span>
        </div>
      )}
      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: 'var(--color-gray-700)' }}
      >
        {title}
      </h3>
      {message && (
        <p className="text-sm max-w-sm mb-6" style={{ color: 'var(--color-gray-500)' }}>
          {message}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
