import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../store/authStore';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Analytics() {
  const { user } = useAuthStore();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const endpoint = user?.role === 'manager' 
        ? '/analytics/team'
        : `/analytics/user/${user?._id}`;
      
      const params = {};
      if (dateRange.start) params.startDate = dateRange.start;
      if (dateRange.end) params.endDate = dateRange.end;

      const res = await axiosInstance.get(endpoint, { params });
      setAnalytics(res.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const dailyData = Object.entries(analytics.dailyBreaks || {}).map(([date, data]) => ({
    date,
    ...data
  }));

  const breakTypeData = Object.entries(analytics.breaksByType || {}).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count
  }));

  return (
    <div className="p-8 space-y-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">📊 Analytics</h1>
          <p className="text-gray-600 mt-1">Break tracking insights and trends</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        >
          <p className="text-blue-100 text-sm">Total Breaks</p>
          <p className="text-4xl font-bold mt-2">{analytics.totalBreaks || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-br from-green-500 to-green-600 text-white"
        >
          <p className="text-green-100 text-sm">Total Break Time</p>
          <p className="text-4xl font-bold mt-2">{Math.round((analytics.totalBreakTime || 0) / 60)}m</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white"
        >
          <p className="text-purple-100 text-sm">Average Break</p>
          <p className="text-4xl font-bold mt-2">{Math.round((analytics.averageBreakDuration || 0) / 60)}m</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white"
        >
          <p className="text-orange-100 text-sm">Break Efficiency</p>
          <p className="text-4xl font-bold mt-2">📈 Good</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Breaks Chart */}
        {dailyData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Daily Break Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#3B82F6" name="Break Count" />
                <Bar dataKey="duration" fill="#10B981" name="Duration (sec)" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Break Type Distribution */}
        {breakTypeData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Break Types Used</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={breakTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8B5CF6" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Analytics;
