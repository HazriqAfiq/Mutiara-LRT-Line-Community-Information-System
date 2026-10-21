/**
 * pages/user/SubmitFeedbackPage.jsx
 * Route: /feedback/new
 *
 * Resident & Commuter Community Feedback Submission Form.
 * Features:
 *   - Complaint title (max 150 chars with counter)
 *   - Category selection (Construction Noise, Road Access, etc.)
 *   - Affected Penang location with quick selector and custom entry
 *   - Full description (min 20 chars, max 2000 chars with counter)
 *   - Optional image attachment with client preview & size validation (<= 5MB)
 *   - Validates all fields inline
 *   - Generates unique sequential reference number (FB-XXXX)
 *   - On success: navigates to /my-feedback/:id with success notification
 */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Send,
  ArrowLeft,
  UploadCloud,
  X,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  HelpCircle,
  MapPin,
  Tag,
  FileText,
  Info,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { createFeedback } from '../../services/feedbackService';
import PageHeader from '../../components/common/PageHeader';

const CATEGORIES = [
  'Construction Noise',
  'Road Access',
  'Pedestrian Safety',
  'Traffic Disruption',
  'Business Access',
  'Other',
];

const PENANG_LOCATION_SUGGESTIONS = [
  'George Town (Lebuh Farquhar / Station Site)',
  'George Town (Komtar / Jalan Dr Lim Chwee Leong)',
  'George Town (Jalan Penang / Chulia St)',
  'Jelutong (Near Jelutong Market)',
  'Jelutong (Expressway Alignment)',
  'Gelugor / USM Corridor',
  'Bayan Baru (Jalan Utama / Sunway Carnival)',
  'Bayan Lepas (Free Trade Zone)',
  'Bayan Lepas (Airport Access Link)',
];

export default function SubmitFeedbackPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
  });

  const [imageFile, setImageFile]     = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors]           = useState({});
  const [submitting, setSubmitting]   = useState(false);
  const [generalError, setGeneralError] = useState(null);

  // Handle image upload and validation
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: 'Only JPG, PNG, or WebP images are permitted.',
      }));
      return;
    }

    // Validate size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        image: 'File size exceeds 5 MB. Please upload a smaller image.',
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, image: null }));
    setImageFile(file);

    // Create local preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
    setErrors((prev) => ({ ...prev, image: null }));
  };

  const validate = () => {
    const newErrors = {};

    // Title: Required, max 150 chars
    if (!formData.title.trim()) {
      newErrors.title = 'Complaint title is required.';
    } else if (formData.title.trim().length > 150) {
      newErrors.title = 'Title cannot exceed 150 characters.';
    }

    // Category: Required
    if (!formData.category) {
      newErrors.category = 'Please select a complaint category.';
    }

    // Location: Required
    if (!formData.location.trim()) {
      newErrors.location = 'Affected location is required.';
    }

    // Description: Required, min 20 chars, max 2000 chars
    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a detailed description.';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = `Description is too short (${formData.description.trim().length}/20 characters minimum). Please provide more context.`;
    } else if (formData.description.trim().length > 2000) {
      newErrors.description = 'Description cannot exceed 2000 characters.';
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
      const response = await createFeedback({
        title: formData.title,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        attachment_url: imagePreview || null, // Local demo preview URL
        user_id: user?.id,
      });

      const newFeedback = response.data;

      // Navigate to feedback details page with success alert state
      navigate(`/my-feedback/${newFeedback.id}`, {
        replace: true,
        state: {
          submittedSuccess: true,
          referenceNumber: newFeedback.reference_number,
        },
      });
    } catch (err) {
      console.error('Submission failed:', err);
      setGeneralError(
        err.response?.data?.message || 'Failed to submit feedback. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <PageHeader
        title="Submit Community Feedback"
        subtitle="Report noise, dust, safety concerns, or traffic access issues along the Mutiara LRT alignment."
      >
        <Link
          to="/my-feedback"
          className="btn btn-outline-teal btn-sm text-xs flex items-center gap-1.5"
          style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}
        >
          <ArrowLeft size={14} /> Back to My Feedback
        </Link>
      </PageHeader>

      <div className="container max-w-3xl mt-8">
        <div className="card bg-white p-6 sm:p-8 rounded-lg border border-gray-200 shadow-sm">
          {/* Simulation disclaimer banner */}
          <div
            className="mb-6 p-4 rounded-md border flex items-start gap-3 bg-[#EEF2F7] border-gray-200"
          >
            <Info size={18} className="text-[#16A6A1] mt-0.5 flex-shrink-0" />
            <div className="text-xs text-gray-700 leading-relaxed">
              <p className="font-bold text-[#12375B]">Academic Simulation Notice</p>
              <p>
                Feedback logged through this prototype is recorded in your demonstration account session.
                No submissions are dispatched to real-world government agencies or transit contractors.
              </p>
            </div>
          </div>

          {generalError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-red-800 leading-relaxed font-medium">{generalError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Complaint Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="fb-title"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  Complaint Title <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-gray-400">
                  {formData.title.length}/150
                </span>
              </div>
              <div className="relative">
                <FileText
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                />
                <input
                  id="fb-title"
                  type="text"
                  maxLength={150}
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    if (errors.title) setErrors({ ...errors, title: null });
                  }}
                  className={`form-input pl-9 ${errors.title ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                  placeholder="e.g. Excessive piling noise after 10 PM near Jalan Penang"
                />
              </div>
              {errors.title && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.title}</p>
              )}
            </div>

            {/* Category & Location Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label
                  htmlFor="fb-category"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="fb-category"
                  value={formData.category}
                  onChange={(e) => {
                    setFormData({ ...formData, category: e.target.value });
                    if (errors.category) setErrors({ ...errors, category: null });
                  }}
                  className={`form-select ${errors.category ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                >
                  <option value="">Select a category...</option>
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

              {/* Location */}
              <div>
                <label
                  htmlFor="fb-location"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1"
                >
                  Affected Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                  />
                  <input
                    id="fb-location"
                    type="text"
                    list="location-suggestions"
                    value={formData.location}
                    onChange={(e) => {
                      setFormData({ ...formData, location: e.target.value });
                      if (errors.location) setErrors({ ...errors, location: null });
                    }}
                    className={`form-input pl-9 ${errors.location ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                    placeholder="e.g. Lebuh Farquhar, George Town"
                  />
                  <datalist id="location-suggestions">
                    {PENANG_LOCATION_SUGGESTIONS.map((loc) => (
                      <option key={loc} value={loc} />
                    ))}
                  </datalist>
                </div>
                {errors.location && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.location}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="fb-description"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-700"
                >
                  Complaint Description <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-gray-400">
                  {formData.description.length}/2000 (min 20)
                </span>
              </div>
              <textarea
                id="fb-description"
                rows={5}
                maxLength={2000}
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description) setErrors({ ...errors, description: null });
                }}
                className={`form-input resize-y ${errors.description ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                placeholder="Describe the issue in detail. Include dates, times, affected property or driveway, and any prior communication with site workers..."
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.description}</p>
              )}
            </div>

            {/* Supporting Image Upload (Optional) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Supporting Photo <span className="text-xs text-gray-400 font-normal lowercase">(optional)</span>
              </label>

              {!imagePreview ? (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-teal-400 transition-colors bg-gray-50/50">
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                    <div className="flex text-xs text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer font-bold text-teal-600 hover:text-teal-700 focus-within:outline-none"
                      >
                        <span>Upload an image</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-[11px] text-gray-400">
                      PNG, JPG, WebP up to 5 MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-2 p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={imagePreview}
                      alt="Upload Preview"
                      className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-800 truncate max-w-xs">
                        {imageFile?.name || 'Uploaded photo'}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {(imageFile?.size / (1024 * 1024)).toFixed(2)} MB • Preview only (Demo)
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={removeImage}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    title="Remove image"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              {errors.image && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.image}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
              <Link to="/my-feedback" className="btn btn-ghost text-xs text-gray-500 hover:text-gray-800">
                Cancel
              </Link>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary px-6 py-2.5 flex items-center gap-2 font-bold shadow-md"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Submitting feedback...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Complaint
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
