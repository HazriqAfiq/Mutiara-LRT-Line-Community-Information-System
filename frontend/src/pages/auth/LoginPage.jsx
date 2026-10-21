/**
 * pages/auth/LoginPage.jsx
 * Route: /login
 *
 * Minimalist, modern LRT-themed login page:
 * - Centered glassmorphic card over full-screen LRT background.
 * - Simple, distraction-free interface displaying only required authentication elements.
 * - Retains full functionality: input validation, demo accounts, role-based redirects.
 */
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  LogIn,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from '../../components/auth/AuthLayout';
import DemoAccountSelector from '../../components/auth/DemoAccountSelector';
import PenangLRTLogo from '../../components/common/PenangLRTLogo';

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

  const [showPassword, setShowPassword]       = useState(false);
  const [errors, setErrors]                   = useState({});
  const [loading, setLoading]                 = useState(false);
  const [generalError, setGeneralError]       = useState(null);
  const [selectedDemoRole, setSelectedDemoRole] = useState(
    location.state?.prefillEmail ? null : 'user'
  );

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
    setSelectedDemoRole(role);
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
    <AuthLayout>
      {/* ── Brand Header (Logo & Title Only) ────────────────────────── */}
      <div className="flex flex-col items-center text-center mb-6">
        <Link
          to="/"
          className="inline-block mb-3 hover:opacity-90 transition-opacity"
          title="Return to Homepage"
        >
          <PenangLRTLogo variant="dark" />
        </Link>
        <h1 className="text-xl font-bold text-[#12375B] tracking-tight">
          Sign In
        </h1>
      </div>

      {/* Registration Success Banner */}
      {successMessage && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2 text-xs text-emerald-800">
          <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* General Login Error */}
      {generalError && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-red-800">
          <AlertCircle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
            />
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setSelectedDemoRole(null);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              className={`form-input pl-10 ${
                errors.email
                  ? 'border-red-500 ring-2 ring-red-500/20'
                  : 'focus:border-[#16A6A1] focus:ring-2 focus:ring-[#16A6A1]/20'
              }`}
              placeholder="name@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
              <AlertCircle size={12} />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
            />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setSelectedDemoRole(null);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              className={`form-input pl-10 pr-10 ${
                errors.password
                  ? 'border-red-500 ring-2 ring-red-500/20'
                  : 'focus:border-[#16A6A1] focus:ring-2 focus:ring-[#16A6A1]/20'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
              <AlertCircle size={12} />
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Sign In Button */}
        <div className="pt-1">
          <button
            type="submit"
            disabled={loading}
            id="login-submit-button"
            className="w-full py-2.5 px-4 rounded-xl bg-[#12375B] hover:bg-[#1a4e7a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <LogIn size={16} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Demo Accounts */}
      <div className="mt-5 pt-4 border-t border-slate-200/80">
        <DemoAccountSelector
          selectedRole={selectedDemoRole}
          onSelect={fillDemoAccount}
        />
      </div>

      {/* Registration Link */}
      <div className="mt-5 pt-4 border-t border-slate-200/80 text-center">
        <p className="text-xs text-slate-600">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            id="go-to-register-link"
            className="font-bold text-[#16A6A1] hover:text-[#0f7a76] hover:underline transition-colors"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Back to Homepage */}
      <div className="mt-3 text-center">
        <Link
          to="/"
          id="login-back-home-link"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </AuthLayout>
  );
}
