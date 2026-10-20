/**
 * pages/admin/RoadClosureFormPage.jsx
 * Routes:
 *   /admin/road-closures/new       (Create mode)
 *   /admin/road-closures/:id/edit  (Edit mode)
 *
 * Unified road closure form component.
 * Validates:
 *   - Title, Road Name, Location, Description, Alternative Route (all required)
 *   - Start date and End date required
 *   - Start date cannot be later than end date
 * Saves via roadClosureService.createRoadClosure() or updateRoadClosure()
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  Navigation,
  MapPin,
  Calendar,
  Eye,
  Route,
  Footprints,
  FileText,
} from 'lucide-react';
import {
  getRoadClosure,
  createRoadClosure,
  updateRoadClosure,
} from '../../services/roadClosureService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const STATUSES = [
  { value: 'active',    label: 'Active (Currently in effect)' },
  { value: 'scheduled', label: 'Scheduled (Upcoming diversion)' },
  { value: 'completed', label: 'Completed (Works concluded & reopened)' },
];

export default function RoadClosureFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    road_name: '',
    location: '',
    status: 'scheduled',
    start_date: '',
    end_date: '',
    description: '',
    alternative_route: '',
    pedestrian_access: '',
  });

  const [loadingInitial, setLoadingInitial] = useState(isEditMode);
  const [submitting, setSubmitting]         = useState(false);
  const [errors, setErrors]                 = useState({});
  const [generalError, setGeneralError]     = useState(null);

  // Load existing road closure if in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    let isMounted = true;
    async function loadRecord() {
      try {
        const res = await getRoadClosure(id);
        const data = res.data;
        if (isMounted) {
          setFormData({
            title: data.title || '',
            road_name: data.road_name || '',
            location: data.location || '',
            status: data.status || 'scheduled',
            start_date: data.start_date || '',
            end_date: data.end_date || '',
            description: data.description || '',
            alternative_route: data.alternative_route || '',
            pedestrian_access: data.pedestrian_access || '',
          });
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load road closure:', err);
          setGeneralError('Road closure notice not found or failed to load.');
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
      newErrors.title = 'Notice title is required.';
    }

    if (!formData.road_name.trim()) {
      newErrors.road_name = 'Primary affected road name is required.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location area details are required.';
    }

    if (!formData.start_date) {
      newErrors.start_date = 'Closure start date is required.';
    }

    if (!formData.end_date) {
      newErrors.end_date = 'Estimated reopening date is required.';
    } else if (formData.start_date && new Date(formData.start_date) > new Date(formData.end_date)) {
      newErrors.end_date = 'Reopening date cannot be earlier than start date.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Notice description and scope of works is required.';
    }

    if (!formData.alternative_route.trim()) {
      newErrors.alternative_route = 'Recommended alternative detour route is required.';
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
        road_name: formData.road_name.trim(),
        location: formData.location.trim(),
        status: formData.status,
        start_date: formData.start_date,
        end_date: formData.end_date,
        description: formData.description.trim(),
        alternative_route: formData.alternative_route.trim(),
        pedestrian_access: formData.pedestrian_access.trim() || 'Pedestrian walkways remain operational.',
      };

      if (isEditMode) {
        await updateRoadClosure(id, payload);
        navigate('/admin/road-closures', {
          replace: true,
          state: { successMessage: `Road closure "${payload.title}" updated successfully.` },
        });
      } else {
        await createRoadClosure(payload);
        navigate('/admin/road-closures', {
          replace: true,
          state: { successMessage: `Road closure "${payload.title}" published successfully.` },
        });
      }
    } catch (err) {
      console.error('Save failed:', err);
      setGeneralError(err.response?.data?.message || 'Failed to save road closure. Please review form inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingInitial) {
    return (
      <div className="py-24 flex justify-center">
        <LoadingSpinner message="Loading traffic advisory details..." />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/road-closures"
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            title="Return to road closures list"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--color-navy)' }}>
              {isEditMode ? `Edit Road Closure #${id}` : 'Create Road Closure Notice'}
            </h2>
            <p className="text-xs text-gray-500">
              {isEditMode
                ? 'Update diversion details, active dates, or pedestrian access conditions'
                : 'Publish road diversion advisories and detour paths for commuters'}
            </p>
          </div>
        </div>

        {isEditMode && (
          <Link
            to={`/road-closures/${id}`}
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
              htmlFor="rc-title"
              className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
            >
              Notice Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FileText
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
              />
              <input
                id="rc-title"
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (errors.title) setErrors({ ...errors, title: null });
                }}
                className={`form-input pl-9 ${errors.title ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                placeholder="e.g. Partial Closure – Jalan Penang (Lebuh Chulia to Lebuh Kimberley)"
              />
            </div>
            {errors.title && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.title}</p>
            )}
          </div>

          {/* Road Name & Location Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Road Name */}
            <div>
              <label
                htmlFor="rc-road"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Affected Road Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Navigation
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />
                <input
                  id="rc-road"
                  type="text"
                  value={formData.road_name}
                  onChange={(e) => {
                    setFormData({ ...formData, road_name: e.target.value });
                    if (errors.road_name) setErrors({ ...errors, road_name: null });
                  }}
                  className={`form-input pl-9 ${errors.road_name ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                  placeholder="e.g. Jalan Penang"
                />
              </div>
              {errors.road_name && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.road_name}</p>
              )}
            </div>

            {/* Location Area */}
            <div>
              <label
                htmlFor="rc-location"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Specific Location Details <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />
                <input
                  id="rc-location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => {
                    setFormData({ ...formData, location: e.target.value });
                    if (errors.location) setErrors({ ...errors, location: null });
                  }}
                  className={`form-input pl-9 ${errors.location ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                  placeholder="e.g. Between Lebuh Chulia and Lebuh Kimberley, George Town"
                />
              </div>
              {errors.location && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.location}</p>
              )}
            </div>
          </div>

          {/* Status & Schedule Dates Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Status */}
            <div>
              <label
                htmlFor="rc-status"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Current Status <span className="text-red-500">*</span>
              </label>
              <select
                id="rc-status"
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

            {/* Start Date */}
            <div>
              <label
                htmlFor="rc-start-date"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />
                <input
                  id="rc-start-date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => {
                    setFormData({ ...formData, start_date: e.target.value });
                    if (errors.start_date) setErrors({ ...errors, start_date: null });
                  }}
                  className={`form-input pl-9 ${errors.start_date ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                />
              </div>
              {errors.start_date && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.start_date}</p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label
                htmlFor="rc-end-date"
                className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
              >
                Estimated End Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />
                <input
                  id="rc-end-date"
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
              htmlFor="rc-description"
              className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
            >
              Notice Description & Work Details <span className="text-red-500">*</span>
            </label>
            <textarea
              id="rc-description"
              rows={4}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: null });
              }}
              className={`form-input resize-y ${errors.description ? 'border-red-500 ring-1 ring-red-500' : ''}`}
              placeholder="Explain the scope of civil works, lane reductions, operating machinery, and affected access points..."
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.description}</p>
            )}
          </div>

          {/* Alternative Route / Detour */}
          <div>
            <label
              htmlFor="rc-alternative-route"
              className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
            >
              Recommended Alternative Routes & Detours <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                id="rc-alternative-route"
                rows={3}
                value={formData.alternative_route}
                onChange={(e) => {
                  setFormData({ ...formData, alternative_route: e.target.value });
                  if (errors.alternative_route) setErrors({ ...errors, alternative_route: null });
                }}
                className={`form-input resize-y ${errors.alternative_route ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                placeholder="Detail the diversion routes for northbound and southbound motorists, feeder bus detours, and peak hour recommendations..."
              />
            </div>
            {errors.alternative_route && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.alternative_route}</p>
            )}
          </div>

          {/* Pedestrian Access */}
          <div>
            <label
              htmlFor="rc-pedestrian-access"
              className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
            >
              Pedestrian Access Provisions <span className="text-xs text-gray-400 font-normal lowercase">(optional)</span>
            </label>
            <textarea
              id="rc-pedestrian-access"
              rows={2}
              value={formData.pedestrian_access}
              onChange={(e) => setFormData({ ...formData, pedestrian_access: e.target.value })}
              className="form-input resize-y"
              placeholder="e.g. Pedestrian walkway remains open on the eastern footpath. Temporary covered walkway provided."
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
            <Link
              to="/admin/road-closures"
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
                  Saving Notice...
                </>
              ) : (
                <>
                  <Save size={15} />
                  {isEditMode ? 'Update Road Closure' : 'Publish Road Closure'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
