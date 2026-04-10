// API utility for frontend
const rawApiUrl = import.meta.env.VITE_API_URL?.trim();
const isLocalhost =
  typeof window !== 'undefined' &&
  ['localhost', '127.0.0.1'].includes(window.location.hostname);

export const API_URL = rawApiUrl
  ? rawApiUrl.replace(/\/+$/, '')
  : isLocalhost
    ? 'http://localhost:5000'
    : '';

export const API_BASE_URL = API_URL ? `${API_URL}/api` : '/api';

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Auth API calls
export const authAPI = {
  register: (userData) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  verifyEmail: (token) =>
    apiCall(`/auth/verify-email/${token}`, { method: 'GET' }),

  forgotPassword: (email) =>
    apiCall('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token, password) =>
    apiCall(`/auth/reset-password/${token}`, {
      method: 'POST',
      body: JSON.stringify({ password }),
    }),
};

// User API calls
export const userAPI = {
  getProfile: () =>
    apiCall('/users/profile', { method: 'GET' }),

  updateProfile: (userData) =>
    apiCall('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),

  getMembers: () =>
    apiCall('/users/members', { method: 'GET' }),
};

// Health check
export const healthCheck = () =>
  apiCall('/health', { method: 'GET' });
