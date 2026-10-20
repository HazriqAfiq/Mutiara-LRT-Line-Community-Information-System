/**
 * components/common/ScrollToTop.jsx
 *
 * Automatically scrolls the browser window to the top (0, 0)
 * whenever the user navigates to a new page/route.
 *
 * Placed inside <BrowserRouter> in App.jsx so it runs on every
 * pathname change across all public, user, and admin routes.
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If a hash anchor exists (e.g. #section-id), scroll to that element
    if (hash) {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Otherwise, immediately snap to the very top of the page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname, hash]);

  return null;
}
