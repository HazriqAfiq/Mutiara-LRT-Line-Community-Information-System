/**
 * pages/auth/LoginPage.jsx
 * Route: /login
 *
 * Simulated authentication login page.
 * Features:
 *   - Email & password inputs with show/hide password toggle.
 *   - Client-side validation (required fields, email format).
 *   - One-click demo credentials autofill helper.
 *   - Role-based redirect (admin -> /admin/dashboard, user -> /dashboard or return path).
 *   - Displays success alert if redirected from registration.
 */
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Train,
  Eye,
  EyeOff,
  LogIn,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  // Success message passed from registration
  const successMessage = location.state?.registeredMessage || null;
  const returnPath     = location.state?.from?.pathname || null;

  const [formData, setFormData] = useState({
    email: location.state?.prefillEmail || '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors]             = useState({});
  const [loading, setLoading]           = useState(false);
  const [generalError, setGeneralError] = useState(null);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const user = await login({
        email: formData.email,
        password: formData.password,
      });

      // Role-aware redirection
      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(returnPath || '/dashboard', { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg =
        err.response?.data?.message ||
        'These credentials do not match our demonstration records.';
      setGeneralError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Quick fill helper for demonstrator convenience
  const fillDemoAccount = (role) => {
    if (role === 'user') {
      setFormData({
        email: 'user@demo.test',
        password: 'Demo12345!',
      });
    } else if (role === 'admin') {
      setFormData({
        email: 'admin@demo.test',
        password: 'Demo12345!',
      });
    }
    setErrors({});
    setGeneralError(null);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand header */}
        <div className="flex justify-center mb-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
              style={{ backgroundColor: 'var(--color-teal)' }}
            >
              <Train size={22} color="white" />
            </div>
            <div>
              <p className="font-bold text-lg leading-tight" style={{ color: 'var(--color-navy)' }}>
                Mutiara LRT Line
              </p>
              <p className="text-xs text-gray-500 leading-tight">Community Platform</p>
            </div>
          </Link>
        </div>

        <h2 className="text-center text-2xl font-black" style={{ color: 'var(--color-navy)' }}>
          Sign in to your account
        </h2>
        <p className="mt-1 text-center text-sm text-gray-600">
          Or{' '}
          <Link
            to="/register"
            className="font-semibold text-teal-600 hover:text-teal-700 underline"
          >
            register for a community account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card bg-white py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10 border border-gray-100">
          {/* Registration Success Banner */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                {successMessage}
              </p>
            </div>
          )}

          {/* General Login Error */}
          {generalError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-red-800 leading-relaxed font-medium">{generalError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  className={`form-input pl-9 ${errors.email ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) setErrors({ ...errors, password: null });
                  }}
                  className={`form-input pl-9 pr-10 ${errors.password ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full py-2.5 flex items-center justify-center gap-2 font-bold shadow-md"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={16} />
                    Sign In
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Autofill Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 text-center">
              Academic Demo Accounts (Click to test)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoAccount('user')}
                className="p-2 text-xs text-left rounded-lg border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-colors"
              >
                <p className="font-bold text-gray-800 flex items-center gap-1">
                  <UserCheck size={12} className="text-teal-600" />
                  Resident User
                </p>
                <p className="text-gray-500 text-[10px] truncate">user@demo.test</p>
                <p className="text-gray-400 text-[10px]">Demo12345!</p>
              </button>

              <button
                type="button"
                onClick={() => fillDemoAccount('admin')}
                className="p-2 text-xs text-left rounded-lg border border-gray-200 hover:border-navy-500 hover:bg-slate-50 transition-colors"
              >
                <p className="font-bold text-gray-800 flex items-center gap-1">
                  <UserCheck size={12} className="text-blue-600" />
                  Project Officer
                </p>
                <p className="text-gray-500 text-[10px] truncate">admin@demo.test</p>
                <p className="text-gray-400 text-[10px]">Demo12345!</p>
              </button>
            </div>
          </div>

          {/* Return link */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors font-medium"
            >
              <ArrowLeft size={13} /> Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
