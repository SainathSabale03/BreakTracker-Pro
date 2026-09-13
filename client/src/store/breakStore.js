import create from 'zustand';
import { axiosInstance } from './authStore';

export const useBreakStore = create((set) => ({
  breaks: [],
  activeBreak: null,
  loading: false,
  error: null,

  startBreak: async (breakType, reason = '', location = '') => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.post('/breaks/start', {
        breakType,
        reason,
        location,
      });
      set({ activeBreak: data.break, loading: false });
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to start break';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  endBreak: async (breakId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.post(`/breaks/end/${breakId}`);
      set({ activeBreak: null, loading: false });
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to end break';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  getActiveBreak: async () => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.get('/breaks/active');
      set({ activeBreak: data._id ? data : null, loading: false });
      return data;
    } catch (error) {
      set({ loading: false });
    }
  },

  getTodayBreaks: async () => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.get('/breaks/today');
      set({ breaks: data, loading: false });
      return data;
    } catch (error) {
      set({ loading: false });
    }
  },
}));
