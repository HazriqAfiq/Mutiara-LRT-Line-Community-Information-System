/**
 * components/common/ConfirmDialog.jsx
 *
 * A modal confirmation dialog for destructive actions like deletion.
 *
 * Props:
 *   isOpen    {boolean}   - Whether the dialog is visible
 *   title     {string}    - Dialog heading
 *   message   {string}    - Warning message to display
 *   onConfirm {function}  - Called when the user clicks "Confirm"
 *   onCancel  {function}  - Called when the user dismisses the dialog
 *   confirmLabel {string} - Label for the confirm button (default "Delete")
 *   isLoading {boolean}   - Show spinner on the confirm button
 */
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  title = 'Are you sure?',
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Delete',
  isLoading = false,
}) {
  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      {/* Dialog panel — stop click bubbling to backdrop */}
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#FEE2E2' }}
            >
              <AlertTriangle size={20} style={{ color: 'var(--color-error)' }} />
            </div>
            <h2
              id="confirm-dialog-title"
              className="text-lg font-semibold"
              style={{ color: 'var(--color-gray-900)' }}
            >
              {title}
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="btn btn-ghost btn-sm"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        {message && (
          <p className="text-sm mb-6" style={{ color: 'var(--color-gray-600)' }}>
            {message}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="btn btn-outline"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-danger"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
