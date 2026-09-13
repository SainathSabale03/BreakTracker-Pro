// Constants used throughout the application

export const BREAK_TYPES = {
  LUNCH: 'lunch',
  COFFEE: 'coffee',
  SHORT: 'short',
  EXTENDED: 'extended'
};

export const BREAK_TYPE_INFO = {
  [BREAK_TYPES.LUNCH]: {
    emoji: '🍽️',
    label: 'Lunch Break',
    duration: 60,
    color: '#3B82F6'
  },
  [BREAK_TYPES.COFFEE]: {
    emoji: '☕',
    label: 'Coffee Break',
    duration: 15,
    color: '#10B981'
  },
  [BREAK_TYPES.SHORT]: {
    emoji: '⏸️',
    label: 'Short Break',
    duration: 10,
    color: '#F59E0B'
  },
  [BREAK_TYPES.EXTENDED]: {
    emoji: '🔄',
    label: 'Extended Break',
    duration: 45,
    color: '#8B5CF6'
  }
};

export const USER_ROLES = {
  EMPLOYEE: 'employee',
  MANAGER: 'manager',
  ADMIN: 'admin'
};

export const STATUS = {
  WORKING: 'working',
  ON_BREAK: 'on-break',
  OFFLINE: 'offline'
};

export const BREAK_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_ME: '/auth/me',

  // Breaks
  BREAKS_START: '/breaks/start',
  BREAKS_END: '/breaks/end',
  BREAKS_ACTIVE: '/breaks/active',
  BREAKS_TODAY: '/breaks/today',
  BREAKS_USER: '/breaks/user',

  // Users
  USERS_PROFILE: '/users/profile',
  USERS_TEAM: '/users/team',
  USERS_STATUS: '/users/status',

  // Analytics
  ANALYTICS_USER: '/analytics/user',
  ANALYTICS_TEAM: '/analytics/team',

  // Admin
  ADMIN_USERS: '/admin/users',
  ADMIN_STATISTICS: '/admin/statistics',
  ADMIN_ASSIGN_MANAGER: '/admin/assign-manager'
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Unauthorized. Please login again.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  BREAK_ACTIVE: 'You already have an active break.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  USER_EXISTS: 'User already exists.',
  BREAK_LIMIT_EXCEEDED: 'You have exceeded your daily break limit.'
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!',
  BREAK_STARTED: 'Break started successfully!',
  BREAK_ENDED: 'Break ended successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  LOGOUT_SUCCESS: 'Logout successful!'
};

export const DEFAULT_BREAK_LIMIT = 120; // minutes per day
export const DEFAULT_JWT_EXPIRY = '7d';
export const API_TIMEOUT = 30000; // 30 seconds
export const REFRESH_INTERVAL = 30000; // 30 seconds

export const COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#10B981',
  DANGER: '#EF4444',
  WARNING: '#F59E0B',
  INFO: '#0EA5E9',
  SUCCESS: '#10B981',
  GRAY: '#6B7280'
};

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/',
  ANALYTICS: '/analytics',
  PROFILE: '/profile',
  TEAM: '/team'
};

export default {
  BREAK_TYPES,
  BREAK_TYPE_INFO,
  USER_ROLES,
  STATUS,
  BREAK_STATUS,
  API_ENDPOINTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  DEFAULT_BREAK_LIMIT,
  COLORS,
  ROUTES
};
