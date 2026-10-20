/**
 * services/announcementService.js
 *
 * Provides CRUD operations for construction announcements.
 *
 * Part A:
 *   - Reads/writes to persistent localStorage store ('mutiara_announcements_store').
 *   - Initializes with MOCK_ANNOUNCEMENTS as seed data.
 *   - Changes made by admin immediately reflect across the public portal.
 *
 * Part B:
 *   - Replace each function with Axios calls to:
 *     GET    /api/announcements
 *     POST   /api/announcements
 *     GET    /api/announcements/{id}
 *     PUT    /api/announcements/{id}
 *     DELETE /api/announcements/{id}
 */
import { MOCK_ANNOUNCEMENTS } from '../mocks/announcements';

const ANNOUNCEMENTS_STORE_KEY = 'mutiara_announcements_store';
const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

function getStoredAnnouncements() {
  try {
    const raw = localStorage.getItem(ANNOUNCEMENTS_STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse announcements store:', err);
  }
  const initial = [...MOCK_ANNOUNCEMENTS];
  localStorage.setItem(ANNOUNCEMENTS_STORE_KEY, JSON.stringify(initial));
  return initial;
}

function saveStoredAnnouncements(list) {
  try {
    localStorage.setItem(ANNOUNCEMENTS_STORE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save announcements store:', err);
  }
}

/**
 * Get all announcements, optionally filtered.
 *
 * @param {{ search?: string, category?: string, status?: string }} filters
 * @returns {Promise<{ data: Array }>}
 */
export async function getAnnouncements(filters = {}) {
  await delay(300);

  let result = getStoredAnnouncements();

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.location?.toLowerCase().includes(q),
    );
  }

  if (filters.category) {
    result = result.filter((a) => a.category === filters.category);
  }

  if (filters.status) {
    result = result.filter((a) => a.status === filters.status);
  }

  // Sort newest first
  result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return { data: result };
}

/**
 * Get a single announcement by ID.
 *
 * @param {number|string} id
 * @returns {Promise<{ data: object }>}
 */
export async function getAnnouncement(id) {
  await delay(250);

  const list = getStoredAnnouncements();
  const found = list.find((a) => a.id === Number(id));

  if (!found) {
    throw { response: { data: { message: 'Announcement not found.' }, status: 404 } };
  }
  return { data: found };
}

/**
 * Create a new announcement.
 *
 * @param {object} data
 * @returns {Promise<{ data: object }>}
 */
export async function createAnnouncement(data) {
  await delay(450);

  const list = getStoredAnnouncements();
  const nextId = Math.max(...list.map((a) => a.id), 0) + 1;

  const newRecord = {
    ...data,
    id: nextId,
    status: data.status || 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  list.unshift(newRecord);
  saveStoredAnnouncements(list);

  return { data: newRecord };
}

/**
 * Update an existing announcement.
 *
 * @param {number|string} id
 * @param {object} data
 * @returns {Promise<{ data: object }>}
 */
export async function updateAnnouncement(id, data) {
  await delay(400);

  const list = getStoredAnnouncements();
  const index = list.findIndex((a) => a.id === Number(id));

  if (index === -1) {
    throw { response: { data: { message: 'Announcement not found.' }, status: 404 } };
  }

  list[index] = {
    ...list[index],
    ...data,
    updated_at: new Date().toISOString(),
  };

  saveStoredAnnouncements(list);
  return { data: list[index] };
}

/**
 * Delete an announcement by ID.
 *
 * @param {number|string} id
 * @returns {Promise<{ data: object }>}
 */
export async function deleteAnnouncement(id) {
  await delay(350);

  const list = getStoredAnnouncements();
  const index = list.findIndex((a) => a.id === Number(id));

  if (index === -1) {
    throw { response: { data: { message: 'Announcement not found.' }, status: 404 } };
  }

  list.splice(index, 1);
  saveStoredAnnouncements(list);

  return { data: { message: 'Announcement deleted successfully.' } };
}

/**
 * Reset announcements back to initial seed data.
 */
export function resetDemoAnnouncements() {
  localStorage.removeItem(ANNOUNCEMENTS_STORE_KEY);
}
