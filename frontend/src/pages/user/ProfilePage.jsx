/**
 * pages/user/ProfilePage.jsx
 * Route: /profile
 *
 * User profile management page.
 * Displays:
 *   - Account details: Full Name, Email, Phone, Role, Registration Date
 *   - Allows editing: Full Name and Phone Number (Email is read-only)
 *   - Form validation
 *   - Synchronizes updated user state with AuthContext so the Navbar and
 *     Dashboard reflect changes immediately without a page refresh
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Users,
  Mail,
  Phone,
  Shield,
  Calendar,
  Edit2,
  Check,
  X,
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowLeft,
  LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from '../../services/authService';
import { formatDate } from '../../utils/dateUtils';
import PageHeader from '../../components/common/PageHeader';
import StatusBadge from '../../components/common/StatusBadge';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData]   = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    communityType: user?.communityType || 'Resident',
  });

  const [errors, setErrors]             = useState({});
  const [saving, setSaving]             = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleStartEdit = () => {
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      communityType: user?.communityType || 'Resident',
    });
    setErrors({});
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      communityType: user?.communityType || 'Resident',
    });
    setErrors({});
    setIsEditing(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!validate()) return;

    setSaving(true);
    try {
      const res = await updateProfile({
        name: formData.name,
        phone: formData.phone,
        communityType: formData.communityType,
      });

      // Update state in AuthContext so Navbar and Dashboard reflect changes
      updateUser(res.data);

      setSuccessMessage('Profile updated successfully! Changes are now active.');
      setIsEditing(false);
    } catch (err) {
      console.error('Profile update error:', err);
      setErrorMessage(
        err.response?.data?.message || 'Failed to update profile. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <PageHeader
        title="Account Profile"
        subtitle="Manage your community platform credentials, contact telephone, and account information."
      >
        <Link
          to="/dashboard"
          className="btn btn-outline-teal btn-sm text-xs flex items-center gap-1.5"
          style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}
        >
          <LayoutDashboard size={14} /> Back to Dashboard
        </Link>
      </PageHeader>

      <div className="container max-w-3xl mt-8">
        <div className="card bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-md">
          {/* User Avatar & Title row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl text-white shadow-md flex-shrink-0"
                style={{ backgroundColor: 'var(--color-navy)' }}
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold" style={{ color: 'var(--color-navy)' }}>
                    {user?.name}
                  </h2>
                  <span className="capitalize text-xs font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                    {user?.role || 'user'}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>

            {!isEditing && (
              <button
                type="button"
                onClick={handleStartEdit}
                className="btn btn-outline btn-sm text-xs flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Edit2 size={13} /> Edit Profile
              </button>
            )}
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                {successMessage}
              </p>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-red-800 font-medium leading-relaxed">
                {errorMessage}
              </p>
            </div>
          )}

          {/* Form or Read-only details */}
          <form onSubmit={handleSave} className="mt-6 space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="profile-name"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Full Name
              </label>
              {isEditing ? (
                <>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                    />
                    <input
                      id="profile-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: null });
                      }}
                      className={`form-input pl-9 ${errors.name ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                      placeholder="Your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{errors.name}</p>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-800 font-medium">
                  <User size={16} className="text-gray-400" />
                  <span>{user?.name}</span>
                </div>
              )}
            </div>

            {/* Email Address (Read-only) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="profile-email"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  Email Address
                </label>
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <Lock size={11} /> Read-only
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-100/70 border border-gray-200 text-sm text-gray-600 font-mono">
                <Mail size={16} className="text-gray-400" />
                <span>{user?.email}</span>
              </div>
              <p className="mt-1 text-[11px] text-gray-400 italic">
                Email addresses are bound to verification credentials in Part A and cannot be modified.
              </p>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="profile-phone"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Phone Number
              </label>
              {isEditing ? (
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                  />
                  <input
                    id="profile-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input pl-9"
                    placeholder="e.g. 012-3456789"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-800 font-medium">
                  <Phone size={16} className="text-gray-400" />
                  <span>{user?.phone || 'Not provided'}</span>
                </div>
              )}
            </div>

            {/* Account Role & Registration Date Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Account Role
                </label>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm">
                  <Shield size={16} className="text-teal-600" />
                  <span className="font-semibold text-gray-800 capitalize">
                    {user?.role === 'admin' ? 'Project Administrator' : 'Community User'}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-community-type"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
                >
                  Stakeholder Category
                </label>
                {isEditing && user?.role !== 'admin' ? (
                  <div className="relative">
                    <select
                      id="profile-community-type"
                      value={formData.communityType}
                      onChange={(e) => setFormData({ ...formData, communityType: e.target.value })}
                      className="form-select text-xs py-2.5 focus:border-[#16A6A1] focus:ring-2 focus:ring-[#16A6A1]/20 bg-white w-full rounded-xl border-gray-200"
                    >
                      <option value="Resident">Local Resident</option>
                      <option value="Pedestrian">Pedestrian / Transit Commuter</option>
                      <option value="Commuter">Daily Commuter / Motorist</option>
                      <option value="Business Owner">Commercial Business Owner</option>
                    </select>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-teal-50/50 border border-teal-100 text-sm">
                    <Users size={16} className="text-teal-600" />
                    <span className="font-semibold text-teal-900">
                      {user?.communityType || (user?.role === 'admin' ? 'Liaison Official' : 'Local Resident')}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Registration Date
                </label>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm">
                  <Calendar size={16} className="text-teal-600" />
                  <span className="text-gray-700">
                    {formatDate(user?.created_at || new Date().toISOString())}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons during edit */}
            {isEditing && (
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={saving}
                  className="btn btn-ghost text-xs text-gray-600 hover:text-gray-900"
                >
                  <X size={14} /> Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary btn-sm flex items-center gap-1.5 font-bold shadow-md"
                >
                  {saving ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check size={14} /> Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
