// Authentication context helper
export const authHelper = {
  // Save auth data
  saveAuth: (token, user) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Get auth data
  getAuth: () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Update user
  updateUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
};
