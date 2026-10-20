/**
 * services/roadClosureService.js
 *
 * Provides CRUD operations for road closure notices and traffic advisories.
 *
 * Part A:
 *   - Reads/writes to persistent localStorage store ('mutiara_road_closures_store').
 *   - Initializes with MOCK_ROAD_CLOSURES as seed data.
 *   - Changes made by admin immediately reflect across the public portal.
 *
 * Part B:
 *   - Replace each function with Axios calls to:
 *     GET    /api/road-closures
 *     POST   /api/road-closures
 *     GET    /api/road-closures/{id}
 *     PUT    /api/road-closures/{id}
 *     DELETE /api/road-closures/{id}
 */
import { MOCK_ROAD_CLOSURES } from '../mocks/roadClosures';

const ROAD_CLOSURES_STORE_KEY = 'mutiara_road_closures_store';
const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

function getStoredRoadClosures() {
  try {
    const raw = localStorage.getItem(ROAD_CLOSURES_STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse road closures store:', err);
  }
  const initial = [...MOCK_ROAD_CLOSURES];
  localStorage.setItem(ROAD_CLOSURES_STORE_KEY, JSON.stringify(initial));
  return initial;
}

function saveStoredRoadClosures(list) {
  try {
    localStorage.setItem(ROAD_CLOSURES_STORE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save road closures store:', err);
  }
}

/**
 * Get all road closures with optional filters.
 *
 * @param {{ search?: string, status?: string, location?: string }} filters
 * @returns {Promise<{ data: Array }>}
 */
export async function getRoadClosures(filters = {}) {
  await delay(300);

  let result = getStoredRoadClosures();

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.road_name.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q),
    );
  }

  if (filters.status) {
    result = result.filter((r) => r.status === filters.status);
  }

  if (filters.location) {
    const loc = filters.location.toLowerCase();
    result = result.filter((r) => r.location.toLowerCase().includes(loc));
  }

  // Sort: active first, then scheduled, then completed
  const order = { active: 0, scheduled: 1, completed: 2 };
  result.sort((a, b) => (order[a.status] ?? 3) - (order[b.status] ?? 3));

  return { data: result };
}

/**
 * Get a single road closure by ID.
 *
 * @param {number|string} id
 * @returns {Promise<{ data: object }>}
 */
export async function getRoadClosure(id) {
  await delay(250);

  const list = getStoredRoadClosures();
  const found = list.find((r) => r.id === Number(id));

  if (!found) {
    throw { response: { data: { message: 'Road closure not found.' }, status: 404 } };
  }
  return { data: found };
}

/**
 * Create a new road closure notice.
 *
 * @param {object} data
 * @returns {Promise<{ data: object }>}
 */
export async function createRoadClosure(data) {
  await delay(450);

  const list = getStoredRoadClosures();
  const nextId = Math.max(...list.map((r) => r.id), 0) + 1;

  const newRecord = {
    ...data,
    id: nextId,
    status: data.status || 'scheduled',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  list.unshift(newRecord);
  saveStoredRoadClosures(list);

  return { data: newRecord };
}

/**
 * Update an existing road closure.
 *
 * @param {number|string} id
 * @param {object} data
 * @returns {Promise<{ data: object }>}
 */
export async function updateRoadClosure(id, data) {
  await delay(400);

  const list = getStoredRoadClosures();
  const index = list.findIndex((r) => r.id === Number(id));

  if (index === -1) {
    throw { response: { data: { message: 'Road closure not found.' }, status: 404 } };
  }

  list[index] = {
    ...list[index],
    ...data,
    updated_at: new Date().toISOString(),
  };

  saveStoredRoadClosures(list);
  return { data: list[index] };
}

/**
 * Delete a road closure notice.
 *
 * @param {number|string} id
 * @returns {Promise<{ data: object }>}
 */
export async function deleteRoadClosure(id) {
  await delay(350);

  const list = getStoredRoadClosures();
  const index = list.findIndex((r) => r.id === Number(id));

  if (index === -1) {
    throw { response: { data: { message: 'Road closure not found.' }, status: 404 } };
  }

  list.splice(index, 1);
  saveStoredRoadClosures(list);

  return { data: { message: 'Road closure deleted successfully.' } };
}

/**
 * Reset road closures back to seed data.
 */
export function resetDemoRoadClosures() {
  localStorage.removeItem(ROAD_CLOSURES_STORE_KEY);
}
