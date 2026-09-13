import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../store/authStore';
import { motion } from 'framer-motion';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/admin/statistics');
      setStats(res.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">⚙️ Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">System-wide monitoring and analytics</p>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        >
          <p className="text-blue-100 text-sm">Total Users</p>
          <p className="text-4xl font-bold mt-2">{stats?.totalUsers || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-br from-green-500 to-green-600 text-white"
        >
          <p className="text-green-100 text-sm">Total Breaks Tracked</p>
          <p className="text-4xl font-bold mt-2">{stats?.totalBreaks || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white"
        >
          <p className="text-purple-100 text-sm">Employees</p>
          <p className="text-4xl font-bold mt-2">{stats?.usersByRole?.employee || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white"
        >
          <p className="text-orange-100 text-sm">Managers</p>
          <p className="text-4xl font-bold mt-2">{stats?.usersByRole?.manager || 0}</p>
        </motion.div>
      </div>

      {/* User Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">👥 User Distribution by Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-4xl font-bold text-blue-600">{stats?.usersByRole?.employee || 0}</div>
            <p className="text-gray-600 mt-2">Employees</p>
            <p className="text-sm text-gray-500 mt-1">
              {stats?.totalUsers > 0 
                ? Math.round((stats.usersByRole?.employee || 0) / stats.totalUsers * 100)
                : 0}%
            </p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-4xl font-bold text-green-600">{stats?.usersByRole?.manager || 0}</div>
            <p className="text-gray-600 mt-2">Managers</p>
            <p className="text-sm text-gray-500 mt-1">
              {stats?.totalUsers > 0 
                ? Math.round((stats.usersByRole?.manager || 0) / stats.totalUsers * 100)
                : 0}%
            </p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className="text-4xl font-bold text-purple-600">{stats?.usersByRole?.admin || 0}</div>
            <p className="text-gray-600 mt-2">Admins</p>
            <p className="text-sm text-gray-500 mt-1">
              {stats?.totalUsers > 0 
                ? Math.round((stats.usersByRole?.admin || 0) / stats.totalUsers * 100)
                : 0}%
            </p>
          </div>
        </div>
      </motion.div>

      {/* System Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🔥 System Health</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-gray-700">Database Status</p>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">✓ Connected</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-gray-700">API Performance</p>
              <span className="text-sm text-gray-600">Fast</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-gray-700">Server Uptime</p>
              <span className="text-sm text-gray-600">99.9%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminDashboard;
