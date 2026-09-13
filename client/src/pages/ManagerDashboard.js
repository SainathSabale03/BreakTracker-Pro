import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../store/authStore';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ManagerDashboard() {
  const [teamData, setTeamData] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [teamRes, analyticsRes] = await Promise.all([
        axiosInstance.get('/users/team'),
        axiosInstance.get('/analytics/team')
      ]);
      setTeamData(teamRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'on-break': return 'bg-yellow-100 text-yellow-800';
      case 'working': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8 space-y-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        >
          <p className="text-blue-100 text-sm">Team Size</p>
          <p className="text-4xl font-bold mt-2">{analytics?.teamSize || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-br from-green-500 to-green-600 text-white"
        >
          <p className="text-green-100 text-sm">Total Breaks</p>
          <p className="text-4xl font-bold mt-2">{analytics?.totalBreaks || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white"
        >
          <p className="text-purple-100 text-sm">Avg Breaks/Person</p>
          <p className="text-4xl font-bold mt-2">{analytics?.averageBreakPerPerson || 0}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white"
        >
          <p className="text-orange-100 text-sm">Online Now</p>
          <p className="text-4xl font-bold mt-2">
            {teamData.filter(t => t.status === 'working' || t.status === 'on-break').length}
          </p>
        </motion.div>
      </div>

      {/* Team Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">👥 Team Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamData.map(member => (
            <motion.div
              key={member._id}
              whileHover={{ scale: 1.02 }}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.department}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">Break Time (Today)</p>
                <p className="text-lg font-bold text-blue-600 mt-1">
                  {Math.round(member.totalBreakTime / 60) || 0}m
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Analytics */}
      {analytics?.members && analytics.members.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Team Break Analytics</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={analytics.members}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="breakCount" fill="#3B82F6" name="Break Count" />
              <Bar dataKey="totalBreakTime" fill="#10B981" name="Total Duration (sec)" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </div>
  );
}

export default ManagerDashboard;
