/**
 * App.jsx
 *
 * Root component. Wraps the app in:
 *   1. BrowserRouter — enables React Router URL-based navigation
 *   2. AuthProvider  — makes auth state available to all components
 *   3. AppRoutes     — renders the correct page for the current URL
 */
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
