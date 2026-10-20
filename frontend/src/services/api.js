/**
 * services/api.js
 *
 * Centralised Axios instance for future Laravel REST API calls (Part B).
 *
 * In Part A, services use mock data and do NOT call this.
 * In Part B, replace the mock implementations in each service
 * with calls to the functions exported from this file.
 *
 * The VITE_API_BASE_URL environment variable is read from .env
 * (see .env.example at the project root).
 */
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // Required for Laravel Sanctum cookie auth in Part B
});

/**
 * Request interceptor — attach the auth token from localStorage.
 * In Part B with Sanctum, the token is stored after login.
 * In Part A, this is a no-op.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Response interceptor — normalise errors.
 * A 401 response means the session has expired; redirect to login.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;
