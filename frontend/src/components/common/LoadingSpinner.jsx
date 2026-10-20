/**
 * components/common/LoadingSpinner.jsx
 *
 * Displays a centred loading spinner.
 * Used while waiting for mock service Promises to resolve.
 *
 * Props:
 *   message {string}  - Optional text below the spinner.
 *   size    {string}  - "sm" | "md" (default "md")
 */
export default function LoadingSpinner({ message = 'Loading...', size = 'md' }) {
  const spinnerSize = size === 'sm' ? 'w-6 h-6' : 'w-10 h-10';
  const textSize    = size === 'sm' ? 'text-sm'  : 'text-base';

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div
        className={`${spinnerSize} border-4 border-gray-200 rounded-full animate-spin`}
        style={{ borderTopColor: 'var(--color-teal)' }}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className={`${textSize} text-gray-500`}>{message}</p>
      )}
    </div>
  );
}
