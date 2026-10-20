/**
 * components/common/FilterSelect.jsx
 *
 * A controlled <select> dropdown for filtering lists.
 *
 * Props:
 *   value     {string}    - Currently selected value
 *   onChange  {function}  - Called with the new value string
 *   options   {Array}     - Array of { value: string, label: string }
 *   id        {string}    - HTML id for accessibility
 *   label     {string}    - Visually hidden aria-label if no visible label
 */
export default function FilterSelect({
  value,
  onChange,
  options = [],
  id = 'filter-select',
  label = 'Filter',
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="form-select"
      aria-label={label}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
