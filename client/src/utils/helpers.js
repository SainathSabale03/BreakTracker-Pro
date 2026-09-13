// Utility functions for the application

/**
 * Format time in seconds to readable format (mm:ss)
 */
export const formatTime = (seconds) => {
  if (!seconds) return '00:00';
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

/**
 * Format time to minutes
 */
export const toMinutes = (seconds) => {
  return Math.round((seconds || 0) / 60);
};

/**
 * Format date to readable format
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format date and time
 */
export const formatDateTime = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Get time of day greeting
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return '🌅 Good Morning';
  if (hour < 18) return '☀️ Good Afternoon';
  return '🌙 Good Evening';
};

/**
 * Get status emoji
 */
export const getStatusEmoji = (status) => {
  const emojis = {
    'working': '✅',
    'on-break': '⏸️',
    'offline': '⭕',
    'active': '🟢',
    'completed': '✅',
    'cancelled': '❌'
  };
  return emojis[status] || '❓';
};

/**
 * Get break type emoji and label
 */
export const getBreakTypeInfo = (type) => {
  const types = {
    'lunch': { emoji: '🍽️', label: 'Lunch Break' },
    'coffee': { emoji: '☕', label: 'Coffee Break' },
    'short': { emoji: '⏸️', label: 'Short Break' },
    'extended': { emoji: '🔄', label: 'Extended Break' }
  };
  return types[type] || { emoji: '⏸️', label: 'Break' };
};

/**
 * Calculate break percentage
 */
export const calculateBreakPercentage = (breakTime, limit) => {
  if (!limit) return 0;
  return Math.min(Math.round((breakTime / (limit * 60)) * 100), 100);
};

/**
 * Validate email
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Get color based on percentage
 */
export const getColorByPercentage = (percentage) => {
  if (percentage < 25) return '#10B981'; // Green
  if (percentage < 50) return '#3B82F6'; // Blue
  if (percentage < 75) return '#F59E0B'; // Amber
  return '#EF4444'; // Red
};

/**
 * Get status color
 */
export const getStatusColor = (status) => {
  const colors = {
    'working': '#10B981',
    'on-break': '#F59E0B',
    'offline': '#6B7280',
    'active': '#10B981',
    'completed': '#10B981',
    'cancelled': '#EF4444'
  };
  return colors[status] || '#6B7280';
};

/**
 * Sleep utility for async operations
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

/**
 * Clear all user data
 */
export const clearUserData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.clear();
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Debounce function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export default {
  formatTime,
  toMinutes,
  formatDate,
  formatDateTime,
  getGreeting,
  getStatusEmoji,
  getBreakTypeInfo,
  calculateBreakPercentage,
  validateEmail,
  validatePassword,
  getColorByPercentage,
  getStatusColor,
  sleep,
  isAuthenticated,
  clearUserData,
  getInitials,
  debounce,
  throttle
};
