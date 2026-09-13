import create from 'zustand';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      set({ user: data.user, token: data.token, loading: false });
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  register: async (name, email, password, role = 'employee') => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.post('/auth/register', { name, email, password, role });
      localStorage.setItem('token', data.token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      set({ user: data.user, token: data.token, loading: false });
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    set({ user: null, token: null, error: null });
  },

  loadUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    set({ loading: true });
    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const { data } = await axiosInstance.get('/auth/me');
      set({ user: data, token, loading: false });
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, loading: false });
    }
  },
}));

export { axiosInstance };
