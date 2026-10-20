/**
 * pages/auth/RegisterPage.jsx
 * Route: /register
 *
 * Community member registration page.
 * Features:
 *   - Fields: Full Name, Email, Phone (optional), Password, Confirm Password.
 *   - Client-side validation:
 *       * Name cannot be empty
 *       * Email format regex check
 *       * Duplicate email check (handled by authService)
 *       * Password minimum length (min 6 characters)
 *       * Confirm password exact match
 *   - On success: navigates to /login with prefilled email and success message.
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Train,
  Eye,
  EyeOff,
  UserPlus,
  ArrowLeft,
  AlertCircle,
  User,
  Mail,
  Phone,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

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

  const [showPassword, setShowPassword]       = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);
  const [errors, setErrors]                   = useState({});
  const [loading, setLoading]                 = useState(false);
  const [generalError, setGeneralError]       = useState(null);

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
      newErrors.email = 'Please provide a valid email format (e.g. user@example.com).';
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
            'Registration successful! Your simulated community account is ready. Please log in below.',
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
          Create a community account
        </h2>
        <p className="mt-1 text-center text-sm text-gray-600">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-teal-600 hover:text-teal-700 underline">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card bg-white py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10 border border-gray-100">
          {generalError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-red-800 leading-relaxed font-medium">{generalError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
            <div>
              <label
                htmlFor="reg-name"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />
                <input
                  id="reg-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: null });
                  }}
                  className={`form-input pl-9 ${errors.name ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                  placeholder="e.g. Ahmad Rahman"
                  autoComplete="name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.name}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="reg-email"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />
                <input
                  id="reg-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: null });
                  }}
                  className={`form-input pl-9 ${errors.email ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                  placeholder="name@example.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Phone Number (Optional) */}
            <div>
              <label
                htmlFor="reg-phone"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Phone Number <span className="text-xs text-gray-400 font-normal lowercase">(optional)</span>
              </label>
              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />
                <input
                  id="reg-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input pl-9"
                  placeholder="e.g. 012-3456789"
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="reg-password"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password) setErrors({ ...errors, password: null });
                  }}
                  className={`form-input pl-9 pr-10 ${errors.password ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
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
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="reg-confirm"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />
                <input
                  id="reg-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value });
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                  }}
                  className={`form-input pl-9 pr-10 ${errors.confirmPassword ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full py-2.5 flex items-center justify-center gap-2 font-bold shadow-md"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus size={16} />
                    Create Account
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Academic notice */}
          <p className="text-[11px] text-gray-400 text-center mt-5 italic">
            This registration is an academic simulation for USM CMT322. Registered accounts are stored in browser session storage for testing.
          </p>

          {/* Return link */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
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
