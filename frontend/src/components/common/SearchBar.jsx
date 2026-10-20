/**
 * components/common/SearchBar.jsx
 *
 * A controlled text input for searching lists.
 * The parent component owns the `value` state and handles `onChange`.
 *
 * Props:
 *   value        {string}    - Current input value (controlled)
 *   onChange     {function}  - Called with the new string on every keystroke
 *   placeholder  {string}    - Input placeholder text
 *   id           {string}    - HTML id for the input (for accessibility)
 */
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  id = 'search-input',
}) {
  return (
    <div className="relative">
      {/* Left search icon */}
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'var(--color-gray-400)' }}
      />

      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-input pl-9 pr-9"
        autoComplete="off"
      />

      {/* Clear button — only shown when there's text */}
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
