/**
 * services/feedbackService.js
 *
 * Handles community feedback complaints and administrative responses.
 *
 * Part A:
 *   - Reads and writes to persistent localStorage stores:
 *     'mutiara_feedback_store' and 'mutiara_responses_store'.
 *   - Initializes with MOCK_FEEDBACK and MOCK_RESPONSES as seed data.
 *   - Auto-generates unique sequential reference numbers (e.g. FB-0011).
 *
 * Part B:
 *   - Replace each function with Axios calls to:
 *     GET  /api/feedback
 *     POST /api/feedback
 *     GET  /api/feedback/{id}
 *     GET  /api/feedback/{id}/responses
 */
import { MOCK_FEEDBACK } from '../mocks/feedback';
import { MOCK_RESPONSES } from '../mocks/responses';
import { getCurrentUser } from './authService';

const FEEDBACK_STORE_KEY  = 'mutiara_feedback_store';
const RESPONSES_STORE_KEY = 'mutiara_responses_store';

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

/** Load feedback list from storage or seed data */
function getStoredFeedback() {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored feedback:', err);
  }
  const initial = [...MOCK_FEEDBACK];
  localStorage.setItem(FEEDBACK_STORE_KEY, JSON.stringify(initial));
  return initial;
}

/** Save feedback list to storage */
function saveStoredFeedback(list) {
  try {
    localStorage.setItem(FEEDBACK_STORE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save feedback store:', err);
  }
}

/** Load responses list from storage or seed data */
function getStoredResponses() {
  try {
    const raw = localStorage.getItem(RESPONSES_STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored responses:', err);
  }
  const initial = [...MOCK_RESPONSES];
  localStorage.setItem(RESPONSES_STORE_KEY, JSON.stringify(initial));
  return initial;
}

/** Save responses list to storage */
function saveStoredResponses(list) {
  try {
    localStorage.setItem(RESPONSES_STORE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save responses store:', err);
  }
}

/** Generate next sequential reference number e.g. FB-0011 */
function generateRefNumber(list) {
  const max = list.reduce((m, f) => {
    const num = parseInt(f.reference_number?.replace('FB-', '') || '0', 10);
    return num > m ? num : m;
  }, 0);
  return `FB-${String(max + 1).padStart(4, '0')}`;
}

/**
 * Get feedback submitted by a specific user (or currently logged-in user).
 *
 * @param {number} [userId] - Optional; defaults to active session user
 * @returns {Promise<{ data: Array }>}
 */
export async function getMyFeedback(userId) {
  await delay(300);

  const targetId = userId ?? getCurrentUser()?.id;
  const list = getStoredFeedback();

  const userItems = list
    .filter((f) => f.user_id === Number(targetId))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return { data: userItems };
}

/**
 * Get all feedback across the platform (admin use).
 * Supports search, status, and category filtering.
 *
 * @param {{ search?: string, status?: string, category?: string }} filters
 * @returns {Promise<{ data: Array }>}
 */
export async function getAllFeedback(filters = {}) {
  await delay(350);

  let result = getStoredFeedback();

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.reference_number.toLowerCase().includes(q) ||
        f.location.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q),
    );
  }

  if (filters.status) {
    result = result.filter((f) => f.status === filters.status);
  }

  if (filters.category) {
    result = result.filter((f) => f.category === filters.category);
  }

  result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return { data: result };
}

/**
 * Get a single feedback record by ID, attaching associated admin responses.
 *
 * @param {number|string} id
 * @returns {Promise<{ data: object }>}
 */
export async function getFeedback(id) {
  await delay(300);

  const list = getStoredFeedback();
  const found = list.find((f) => f.id === Number(id));

  if (!found) {
    throw { response: { data: { message: 'Complaint record not found.' }, status: 404 } };
  }

  const responses = getStoredResponses()
    .filter((r) => r.feedback_id === found.id)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  return { data: { ...found, responses } };
}

/**
 * Get responses for a specific feedback ticket.
 *
 * @param {number|string} feedbackId
 * @returns {Promise<{ data: Array }>}
 */
export async function getFeedbackResponses(feedbackId) {
  await delay(200);

  const responses = getStoredResponses()
    .filter((r) => r.feedback_id === Number(feedbackId))
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  return { data: responses };
}

/**
 * Submit a new feedback complaint.
 *
 * @param {{
 *   title: string,
 *   category: string,
 *   location: string,
 *   description: string,
 *   attachment_url?: string|null,
 *   user_id?: number
 * }} data
 * @returns {Promise<{ data: object }>}
 */
export async function createFeedback(data) {
  await delay(500);

  const currentUser = getCurrentUser();
  const userId = data.user_id || currentUser?.id;

  if (!userId) {
    throw { response: { data: { message: 'Authentication required to submit feedback.' }, status: 401 } };
  }

  const list = getStoredFeedback();
  const nextId = Math.max(...list.map((f) => f.id), 0) + 1;
  const refNumber = generateRefNumber(list);

  const newRecord = {
    id: nextId,
    reference_number: refNumber,
    user_id: Number(userId),
    title: data.title.trim(),
    category: data.category,
    location: data.location.trim(),
    description: data.description.trim(),
    attachment_url: data.attachment_url || null,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  list.unshift(newRecord);
  saveStoredFeedback(list);

  return { data: newRecord };
}

/**
 * Update feedback status (admin feature).
 *
 * @param {number|string} id
 * @param {'pending'|'in_progress'|'resolved'} status
 * @returns {Promise<{ data: object }>}
 */
export async function updateFeedbackStatus(id, status) {
  await delay(350);

  const list = getStoredFeedback();
  const index = list.findIndex((f) => f.id === Number(id));

  if (index === -1) {
    throw { response: { data: { message: 'Complaint record not found.' }, status: 404 } };
  }

  list[index] = {
    ...list[index],
    status,
    updated_at: new Date().toISOString(),
  };

  saveStoredFeedback(list);
  return { data: list[index] };
}

/**
 * Add an admin response to a complaint.
 *
 * @param {number|string} feedbackId
 * @param {string} message
 * @param {{ id: number, name: string }} admin
 * @returns {Promise<{ data: object }>}
 */
export async function addFeedbackResponse(feedbackId, message, admin) {
  await delay(400);

  const responses = getStoredResponses();
  const nextId = Math.max(...responses.map((r) => r.id), 0) + 1;

  const newResponse = {
    id: nextId,
    feedback_id: Number(feedbackId),
    responder_id: admin.id,
    admin_id: admin.id,
    admin_name: admin.name,
    message: message.trim(),
    created_at: new Date().toISOString(),
  };

  responses.push(newResponse);
  saveStoredResponses(responses);

  return { data: newResponse };
}

/**
 * Reset feedback and response data back to seed state.
 */
export function resetDemoFeedback() {
  localStorage.removeItem(FEEDBACK_STORE_KEY);
  localStorage.removeItem(RESPONSES_STORE_KEY);
}
