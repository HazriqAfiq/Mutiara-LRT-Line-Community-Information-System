/**
 * pages/admin/AnnouncementFormPage.jsx
 * Routes:
 *   /admin/announcements/new       (Create mode)
 *   /admin/announcements/:id/edit  (Edit mode)
 *
 * Unified announcement form component.
 * Validates:
 *   - Title, Category, Location, Description (all required)
 *   - Start date cannot be later than end date
 * Saves via announcementService.createAnnouncement() or updateAnnouncement()
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  FileText,
  Tag,
  MapPin,
  Calendar,
  Eye,
} from 'lucide-react';
import {
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
} from '../../services/announcementService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const CATEGORIES = [
  'General Update',
  'Construction Progress',
  'Public Notice',
  'Safety Advisory',
];

const STATUSES = [
  { value: 'published', label: 'Published (Visible to the public)' },
  { value: 'draft',     label: 'Draft (Internal review only)' },
  { value: 'archived',  label: 'Archived (Concluded notice)' },
];

export default function AnnouncementFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Construction Progress',
    location: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'published',
  });

  const [loadingInitial, setLoadingInitial] = useState(isEditMode);
  const [submitting, setSubmitting]         = useState(false);
  const [errors, setErrors]                 = useState({});
  const [generalError, setGeneralError]     = useState(null);

  // Load existing announcement if in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    let isMounted = true;
    async function loadRecord() {
      try {
        const res = await getAnnouncement(id);
        const data = res.data;
        if (isMounted) {
          setFormData({
            title: data.title || '',
            category: data.category || 'Construction Progress',
            location: data.location || '',
            description: data.description || '',
            start_date: data.start_date || '',
            end_date: data.end_date || '',
            status: data.status || 'published',
          });
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load announcement:', err);
          setGeneralError('Announcement not found or failed to load.');
        }
      } finally {
        if (isMounted) {
          setLoadingInitial(false);
        }
      }
    }

    loadRecord();

    return () => {
      isMounted = false;
    };
  }, [id, isEditMode]);

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Announcement title is required.';
    }

    if (!formData.category) {
      newErrors.category = 'Please choose a category.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Notice description is required.';
    }

    // Date range validation: Start date cannot be after end date
    if (formData.start_date && formData.end_date) {
      if (new Date(formData.start_date) > new Date(formData.end_date)) {
        newErrors.end_date = 'Construction end date cannot be earlier than start date.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        title: formData.title.trim(),
        category: formData.category,
        location: formData.location.trim(),
        description: formData.description.trim(),
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
        status: formData.status,
      };

      if (isEditMode) {
        await updateAnnouncement(id, payload);
        navigate('/admin/announcements', {
          replace: true,
          state: { successMessage: `Announcement "${payload.title}" updated successfully.` },
        });
      } else {
        await createAnnouncement(payload);
        navigate('/admin/announcements', {
          replace: true,
          state: { successMessage: `Announcement "${payload.title}" created successfully.` },
        });
      }
    } catch (err) {
      console.error('Save failed:', err);
      setGeneralError(err.response?.data?.message || 'Failed to save announcement. Please check form inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingInitial) {
    return (
      <div className="py-24 flex justify-center">
        <LoadingSpinner message="Loading announcement data..." />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/announcements"
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            title="Return to announcements"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--color-navy)' }}>
              {isEditMode ? `Edit Announcement #${id}` : 'Create New Announcement'}
            </h2>
            <p className="text-xs text-gray-500">
              {isEditMode
                ? 'Update publication content, dates, and active visibility state'
                : 'Publish construction alerts, traffic advisories, or general project milestones'}
            </p>
          </div>
        </div>

        {isEditMode && formData.status === 'published' && (
          <Link
            to={`/announcements/${id}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-sm text-xs flex items-center gap-1.5"
          >
            <Eye size={13} /> View Public Notice
          </Link>
        )}
      </div>

      {generalError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-red-800 font-medium">{generalError}</p>
        </div>
      )}

      {/* Main Form */}
      <div className="card bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Title */}
          <div>
            <label
              htmlFor="ann-title"
              className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
            >
              Announcement Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FileText
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
              />
              <input
                id="ann-title"
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (errors.title) setErrors({ ...errors, title: null });
                }}
                className={`form-input pl-9 ${errors.title ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                placeholder="e.g. Phase 1 Piling Commences at George Town Station"
              />
            </div>
            {errors.title && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.title}</p>
            )}
          </div>

          {/* Category & Status Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label
                htmlFor="ann-category"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="ann-category"
                value={formData.category}
                onChange={(e) => {
                  setFormData({ ...formData, category: e.target.value });
                  if (errors.category) setErrors({ ...errors, category: null });
                }}
                className={`form-select ${errors.category ? 'border-red-500 ring-1 ring-red-500' : ''}`}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.category}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="ann-status"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Publication Status <span className="text-red-500">*</span>
              </label>
              <select
                id="ann-status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="form-select"
              >
                {STATUSES.map((st) => (
                  <option key={st.value} value={st.value}>
                    {st.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="ann-location"
              className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
            >
              Affected Location / Station Corridor <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
              />
              <input
                id="ann-location"
                type="text"
                value={formData.location}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                  if (errors.location) setErrors({ ...errors, location: null });
                }}
                className={`form-input pl-9 ${errors.location ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                placeholder="e.g. George Town Station Site, Lebuh Farquhar"
              />
            </div>
            {errors.location && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.location}</p>
            )}
          </div>

          {/* Date range row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="ann-start-date"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Construction Start Date <span className="text-xs text-gray-400 font-normal lowercase">(optional)</span>
              </label>
              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />
                <input
                  id="ann-start-date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="form-input pl-9"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="ann-end-date"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Construction Estimated End Date <span className="text-xs text-gray-400 font-normal lowercase">(optional)</span>
              </label>
              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />
                <input
                  id="ann-end-date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => {
                    setFormData({ ...formData, end_date: e.target.value });
                    if (errors.end_date) setErrors({ ...errors, end_date: null });
                  }}
                  className={`form-input pl-9 ${errors.end_date ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                />
              </div>
              {errors.end_date && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.end_date}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="ann-description"
              className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
            >
              Notice Description & Operational Details <span className="text-red-500">*</span>
            </label>
            <textarea
              id="ann-description"
              rows={6}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: null });
              }}
              className={`form-input resize-y ${errors.description ? 'border-red-500 ring-1 ring-red-500' : ''}`}
              placeholder="Provide complete details regarding the work scope, operating hours, expected noise or dust conditions, and contractor protocols..."
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.description}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
            <Link
              to="/admin/announcements"
              className="btn btn-ghost text-xs text-gray-600 hover:text-gray-900"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary px-6 py-2.5 flex items-center gap-2 font-bold shadow-md text-xs"
            >
              {submitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Saving Announcement...
                </>
              ) : (
                <>
                  <Save size={15} />
                  {isEditMode ? 'Update Announcement' : 'Publish Announcement'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
