/**
 * services/userService.js
 *
 * User directory and profile management service for administration.
 *
 * Part A:
 *   - Synchronized with 'mutiara_users_store' in localStorage (same store as authService).
 *   - Computes feedback counts per user from 'mutiara_feedback_store'.
 *   - Allows admin to view user profiles and toggle active status.
 *
 * Part B:
 *   - Replace with Axios calls to:
 *     GET  /api/users
 *     GET  /api/users/{id}
 *     PUT  /api/users/{id}
 */
import { MOCK_USERS } from '../mocks/users';

const USERS_STORE_KEY    = 'mutiara_users_store';
const FEEDBACK_STORE_KEY = 'mutiara_feedback_store';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

function getStoredUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse users store:', err);
  }
  const initial = [...MOCK_USERS];
  localStorage.setItem(USERS_STORE_KEY, JSON.stringify(initial));
  return initial;
}

function saveStoredUsers(list) {
  try {
    localStorage.setItem(USERS_STORE_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save users store:', err);
  }
}

/**
 * Get all registered users (admin directory).
 * Strips demo passwords before returning.
 *
 * @returns {Promise<{ data: Array }>}
 */
export async function getUsers() {
  await delay(250);
  const users = getStoredUsers();
  const safeUsers = users.map(({ password: _pw, ...u }) => u);
  return { data: safeUsers };
}

/**
 * Get a specific user by ID.
 *
 * @param {number|string} id
 * @returns {Promise<{ data: object }>}
 */
export async function getUser(id) {
  await delay(200);
  const users = getStoredUsers();
  const found = users.find((u) => u.id === Number(id));

  if (!found) {
    throw { response: { data: { message: 'User account not found.' }, status: 404 } };
  }

  const { password: _pw, ...safeUser } = found;
  return { data: safeUser };
}

/**
 * Backward compatibility alias for getUser.
 */
export async function getProfile(userId) {
  return getUser(userId);
}

/**
 * Update profile/status for a user (admin action).
 *
 * @param {number|string} userId
 * @param {object} data
 * @returns {Promise<{ data: object }>}
 */
export async function updateProfile(userId, data) {
  await delay(350);
  const users = getStoredUsers();
  const idx = users.findIndex((u) => u.id === Number(userId));

  if (idx === -1) {
    throw { response: { data: { message: 'User not found.' }, status: 404 } };
  }

  users[idx] = {
    ...users[idx],
    ...data,
    updated_at: new Date().toISOString(),
  };

  saveStoredUsers(users);
  const { password: _pw, ...safeUser } = users[idx];
  return { data: safeUser };
}

/**
 * Assign or reassign a user's role (admin action).
 * Directly implements UML Class Diagram: Role.assignRole()
 *
 * @param {number|string} userId
 * @param {'admin'|'user'} newRole
 * @returns {Promise<{ data: object }>}
 */
export async function assignRole(userId, newRole) {
  await delay(350);
  const users = getStoredUsers();
  const idx = users.findIndex((u) => u.id === Number(userId));

  if (idx === -1) {
    throw { response: { data: { message: 'User not found.' }, status: 404 } };
  }

  const roleName = newRole === 'admin' ? 'Administrator' : 'Community User';
  const roleId = newRole === 'admin' ? 1 : 2;

  users[idx] = {
    ...users[idx],
    role: newRole,
    roleId,
    roleName,
    adminRole: newRole === 'admin' ? 'Project Liaison Officer' : null,
    updated_at: new Date().toISOString(),
  };

  saveStoredUsers(users);
  const { password: _pw, ...safeUser } = users[idx];
  return { data: safeUser };
}

/**
 * Get the total number of feedback complaints logged by a specific user.
 *
 * @param {number|string} userId
 * @returns {Promise<{ count: number }>}
 */
export async function getUserFeedbackCount(userId) {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORE_KEY);
    if (raw) {
      const feedback = JSON.parse(raw);
      if (Array.isArray(feedback)) {
        return { count: feedback.filter((f) => f.user_id === Number(userId)).length };
      }
    }
  } catch (err) {
    console.warn('Error computing user feedback count:', err);
  }
  return { count: 0 };
}
