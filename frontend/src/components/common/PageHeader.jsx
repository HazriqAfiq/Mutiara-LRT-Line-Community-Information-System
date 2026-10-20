/**
 * components/common/PageHeader.jsx
 *
 * Consistent navy header used at the top of every listing page.
 *
 * Props:
 *   title       {string}    - Main heading (required)
 *   subtitle    {string}    - Descriptive sub-text (optional)
 *   children    {ReactNode} - Optional right-side actions / breadcrumbs
 */
export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="page-header">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '0.35rem' }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ color: 'rgba(255,255,255,0.72)', margin: 0, fontSize: '0.95rem' }}>
                {subtitle}
              </p>
            )}
          </div>
          {children && <div className="flex-shrink-0">{children}</div>}
        </div>
      </div>
    </div>
  );
}
