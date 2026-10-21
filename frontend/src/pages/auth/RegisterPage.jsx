/**
 * pages/auth/RegisterPage.jsx
 * Route: /register
 *
 * Minimalist, modern LRT-themed registration page:
 * - Centered glassmorphic card over full-screen LRT background.
 * - Simple, distraction-free interface displaying only required registration fields.
 * - Retains full functionality: input validation, error alerts, redirect to login with prefill.
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  UserPlus,
  ArrowLeft,
  AlertCircle,
  User,
  Mail,
  Phone,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from '../../components/auth/AuthLayout';
import PenangLRTLogo from '../../components/common/PenangLRTLogo';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate     = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [errors, setErrors]             = useState({});
  const [loading, setLoading]           = useState(false);
  const [generalError, setGeneralError] = useState(null);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Name
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters.';
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format.';
    }

    // Password
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
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
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      // Navigate to login with success message & prefilled email
      navigate('/login', {
        replace: true,
        state: {
          registeredMessage:
            'Registration successful! Please sign in with your credentials below.',
          prefillEmail: formData.email,
        },
      });
    } catch (err) {
      console.error('Registration error:', err);
      const apiErrors = err.response?.data?.errors;
      if (apiErrors?.email) {
        setErrors((prev) => ({ ...prev, email: apiErrors.email[0] }));
      } else {
        setGeneralError(
          err.response?.data?.message || 'Unable to register account. Please try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* ── Brand Header (Logo & Title Only) ────────────────────────── */}
      <div className="flex flex-col items-center text-center mb-5">
        <Link
          to="/"
          className="inline-block mb-2.5 hover:opacity-90 transition-opacity"
          title="Return to Homepage"
        >
          <PenangLRTLogo variant="dark" />
        </Link>
        <h1 className="text-xl font-bold text-[#12375B] tracking-tight">
          Create Account
        </h1>
      </div>

      {/* General Registration Error */}
      {generalError && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-red-800">
          <AlertCircle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        {/* Full Name */}
        <div>
          <label
            htmlFor="reg-name"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
            />
            <input
              id="reg-name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: null });
              }}
              className={`form-input pl-10 ${
                errors.name
                  ? 'border-red-500 ring-2 ring-red-500/20'
                  : 'focus:border-[#16A6A1] focus:ring-2 focus:ring-[#16A6A1]/20'
              }`}
              placeholder="Full name"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
              <AlertCircle size={12} />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label
            htmlFor="reg-email"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
            />
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
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

        {/* Phone Number */}
        <div>
          <label
            htmlFor="reg-phone"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
          >
            Phone Number <span className="text-[11px] text-slate-400 font-normal lowercase">(optional)</span>
          </label>
          <div className="relative">
            <Phone
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
            />
            <input
              id="reg-phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="form-input pl-10 focus:border-[#16A6A1] focus:ring-2 focus:ring-[#16A6A1]/20"
              placeholder="e.g. 012-3456789"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="reg-password"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
            />
            <input
              id="reg-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              className={`form-input pl-10 pr-10 ${
                errors.password
                  ? 'border-red-500 ring-2 ring-red-500/20'
                  : 'focus:border-[#16A6A1] focus:ring-2 focus:ring-[#16A6A1]/20'
              }`}
              placeholder="At least 6 characters"
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

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="reg-confirm"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1"
          >
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
            />
            <input
              id="reg-confirm"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
              }}
              className={`form-input pl-10 pr-10 ${
                errors.confirmPassword
                  ? 'border-red-500 ring-2 ring-red-500/20'
                  : 'focus:border-[#16A6A1] focus:ring-2 focus:ring-[#16A6A1]/20'
              }`}
              placeholder="Re-enter password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
              <AlertCircle size={12} />
              <span>{errors.confirmPassword}</span>
            </p>
          )}
        </div>

        {/* Create Account Button */}
        <div className="pt-1.5">
          <button
            type="submit"
            disabled={loading}
            id="register-submit-button"
            className="w-full py-2.5 px-4 rounded-xl bg-[#12375B] hover:bg-[#1a4e7a] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <UserPlus size={16} />
                <span>Create Account</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Sign In Link */}
      <div className="mt-5 pt-3.5 border-t border-slate-200/80 text-center">
        <p className="text-xs text-slate-600">
          Already have an account?{' '}
          <Link
            to="/login"
            id="go-to-login-link"
            className="font-bold text-[#16A6A1] hover:text-[#0f7a76] hover:underline transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Back to Homepage */}
      <div className="mt-2.5 text-center">
        <Link
          to="/"
          id="register-back-home-link"
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </AuthLayout>
  );
}
