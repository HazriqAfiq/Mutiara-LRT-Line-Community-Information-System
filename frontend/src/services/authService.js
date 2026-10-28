/**
 * services/authService.js
 *
 * Handles simulated authentication for Part A.
 *
 * Part A:
 *   - Compares credentials against MOCK_USERS and persisted registered accounts.
 *   - Uses localStorage for session persistence ('mutiara_auth_user') and
 *     mock registered accounts ('mutiara_users_store').
 *   - Provides updateProfile() to allow users to update their name and phone.
 *
 * Part B:
 *   - Replace mock logic with Axios calls to:
 *     POST /api/login
 *     POST /api/register
 *     POST /api/logout
 *     GET  /api/user
 *     PUT  /api/user/profile
 *
 * IMPORTANT: This is a simulation for Part A. Passwords are for demo verification
 * only. NEVER store real passwords or tokens in plain client storage in production.
 */
import { MOCK_USERS } from '../mocks/users';

const SESSION_KEY = 'mutiara_auth_user';
const USERS_STORE_KEY = 'mutiara_users_store';

/** Simulate network latency so the frontend exercises loading states. */
const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

/** Load users from localStorage or initialize with seed MOCK_USERS */
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
    console.warn('Failed to parse stored users:', err);
  }
  // Initialize storage with clone of MOCK_USERS
  const initial = [...MOCK_USERS];
  localStorage.setItem(USERS_STORE_KEY, JSON.stringify(initial));
  return initial;
}

/** Save updated users array to storage */
function saveStoredUsers(users) {
  try {
    localStorage.setItem(USERS_STORE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save users store:', err);
  }
}

/**
 * Log in with email and password.
 * Returns the safe user object (no password) on success.
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ data: object }>}
 */
export async function login(credentials) {
  await delay(400);

  const email = (credentials.email || '').trim().toLowerCase();
  const password = credentials.password || '';

  const users = getStoredUsers();

  const user = users.find((u) => {
    if (u.email.toLowerCase() !== email) return false;
    // Accept either configured password or fallback demo password
    return u.password === password || (password === 'demo1234' && u.email === 'user@demo.test');
  });

  if (!user) {
    throw {
      response: {
        data: { message: 'These credentials do not match our demonstration records.' },
        status: 401,
      },
    };
  }

  // Strip password before returning and storing in session
  const { password: _pw, ...safeUser } = user;

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
  } catch (err) {
    console.error('Failed to save auth session:', err);
  }

  return { data: safeUser };
}

/**
 * Register a new user account.
 * Assigns role: 'user' strictly.
 * Does NOT auto-login so caller can redirect to /login with success message.
 *
 * @param {{ name: string, email: string, password: string, phone?: string }} data
 * @returns {Promise<{ data: object }>}
 */
export async function register(data) {
  await delay(450);

  const email = (data.email || '').trim().toLowerCase();
  const users = getStoredUsers();

  const exists = users.find((u) => u.email.toLowerCase() === email);
  if (exists) {
    throw {
      response: {
        data: {
          message: 'Validation failed',
          errors: { email: ['This email address is already registered in our demonstration records.'] },
        },
        status: 422,
      },
    };
  }

  const nextId = Math.max(...users.map((u) => u.id || u.userId || 0), 0) + 1;
  const newUser = {
    id: nextId,
    userId: nextId, // UML attribute alignment
    name: data.name.trim(),
    email: data.email.trim(),
    password: data.password, // Demo simulation only
    passwordHash: '$2y$10$hashSimulation_' + Math.random().toString(36).substring(7), // UML attribute alignment
    role: 'user', // Newly registered users are strictly regular users
    roleId: 2, // UML attribute alignment
    roleName: 'Community User', // UML attribute alignment
    communityType: data.communityType || 'Resident', // UML attribute alignment (CommunityUser.communityType)
    phone: data.phone?.trim() || null,
    address: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  users.push(newUser);
  saveStoredUsers(users);

  const { password: _pw, ...safeUser } = newUser;
  return { data: safeUser };
}

/**
 * Log out — clear the simulated session from localStorage.
 */
export async function logout() {
  await delay(150);
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (err) {
    console.error('Error clearing session:', err);
  }
}

/**
 * Get the currently logged-in user from the session.
 * Returns null if no active session.
 *
 * @returns {object|null}
 */
export function getCurrentUser() {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Update the profile information for the current user (Name, Phone).
 * Email remains immutable in Part A.
 *
 * @param {{ name: string, phone?: string }} profileData
 * @returns {Promise<{ data: object }>}
 */
export async function updateProfile(profileData) {
  await delay(350);

  const current = getCurrentUser();
  if (!current) {
    throw {
      response: {
        data: { message: 'Unauthenticated. Please log in again.' },
        status: 401,
      },
    };
  }

  const users = getStoredUsers();
  const idx = users.findIndex((u) => u.id === current.id);

  if (idx === -1) {
    throw {
      response: {
        data: { message: 'User account not found.' },
        status: 404,
      },
    };
  }

  const updatedUser = {
    ...users[idx],
    name: profileData.name.trim(),
    phone: profileData.phone ? profileData.phone.trim() : null,
    communityType: profileData.communityType !== undefined ? profileData.communityType : (users[idx].communityType || 'Resident'),
    updated_at: new Date().toISOString(),
  };

  users[idx] = updatedUser;
  saveStoredUsers(users);

  const { password: _pw, ...safeUser } = updatedUser;
  localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));

  return { data: safeUser };
}

/**
 * Reset demo authentication data back to the default seed users.
 */
export function resetDemoAuth() {
  localStorage.removeItem(USERS_STORE_KEY);
  localStorage.removeItem(SESSION_KEY);
}
