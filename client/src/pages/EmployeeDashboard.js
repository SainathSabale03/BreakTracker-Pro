import React, { useState, useEffect } from 'react';
import { useBreakStore } from '../store/breakStore';
import { axiosInstance } from '../store/authStore';
import { motion } from 'framer-motion';
import BreakTimer from '../components/BreakTimer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function EmployeeDashboard() {
  const { startBreak, endBreak, getActiveBreak, getTodayBreaks } = useBreakStore();
  const [activeBreak, setActiveBreak] = useState(null);
  const [todayBreaks, setTodayBreaks] = useState([]);
  const [stats, setStats] = useState({ total: 0, duration: 0, count: 0 });
  const [loading, setLoading] = useState(false);
  const [selectedBreakType, setSelectedBreakType] = useState('short');

  const breakTypes = [
    { type: 'lunch', label: '🍽️ Lunch', duration: 60 },
    { type: 'coffee', label: '☕ Coffee', duration: 15 },
    { type: 'short', label: '⏸️ Short Break', duration: 10 },
    { type: 'extended', label: '🔄 Extended', duration: 45 }
  ];

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [activeData, todayData] = await Promise.all([
        getActiveBreak(),
        getTodayBreaks()
      ]);
      setActiveBreak(activeData._id ? activeData : null);
      setTodayBreaks(todayData);

      const totalDuration = todayData.reduce((sum, b) => sum + (b.duration || 0), 0);
      setStats({
        total: Math.round(totalDuration / 60),
        duration: totalDuration,
        count: todayData.length
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStartBreak = async () => {
    setLoading(true);
    try {
      await startBreak(selectedBreakType);
      await fetchData();
    } catch (error) {
      console.error('Error starting break:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndBreak = async () => {
    setLoading(true);
    try {
      if (activeBreak?._id) {
        await endBreak(activeBreak._id);
        await fetchData();
      }
    } catch (error) {
      console.error('Error ending break:', error);
    } finally {
      setLoading(false);
    }
  };

  const breakTypeDistribution = breakTypes.map(bt => ({
    name: bt.label,
    value: todayBreaks.filter(b => b.breakType === bt.type).length
  })).filter(item => item.value > 0);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="p-8 space-y-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Break Time Today</p>
              <p className="text-4xl font-bold mt-2">{stats.total}m</p>
            </div>
            <div className="text-5xl opacity-20">⏱️</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-br from-green-500 to-green-600 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Number of Breaks</p>
              <p className="text-4xl font-bold mt-2">{stats.count}</p>
            </div>
            <div className="text-5xl opacity-20">✅</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`card text-white ${
            activeBreak
              ? 'bg-gradient-to-br from-red-500 to-red-600'
              : 'bg-gradient-to-br from-gray-500 to-gray-600'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-opacity-80 text-sm">Current Status</p>
              <p className="text-3xl font-bold mt-2 capitalize">
                {activeBreak ? '🔴 On Break' : '✅ Working'}
              </p>
            </div>
            <div className="text-5xl opacity-20">{activeBreak ? '⏸️' : '💼'}</div>
          </div>
        </motion.div>
      </div>

      {/* Active Break Section */}
      {activeBreak && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-200"
        >
          <div className="text-center py-8">
            <BreakTimer breakData={activeBreak} />
            <button
              onClick={handleEndBreak}
              disabled={loading}
              className="btn-danger mt-6 disabled:opacity-50"
            >
              {loading ? 'Ending Break...' : '🛑 End Break'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Start Break Section */}
      {!activeBreak && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Start a Break</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {breakTypes.map(bt => (
              <button
                key={bt.type}
                onClick={() => setSelectedBreakType(bt.type)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedBreakType === bt.type
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                }`}
              >
                <div className="text-2xl mb-2">{bt.label.split(' ')[0]}</div>
                <div className="text-sm">{bt.label.split(' ').slice(1).join(' ')}</div>
                <div className="text-xs text-gray-500 mt-1">{bt.duration}m</div>
              </button>
            ))}
          </div>
          <button
            onClick={handleStartBreak}
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 text-lg py-3"
          >
            {loading ? '⏳ Starting...' : '▶️ Start Break'}
          </button>
        </motion.div>
      )}

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Break Distribution */}
        {breakTypeDistribution.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Break Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={breakTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {breakTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Break History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Break History</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {todayBreaks.length > 0 ? (
              todayBreaks.map(breakItem => (
                <div key={breakItem._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 capitalize">{breakItem.breakType}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(breakItem.startTime).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {Math.round((breakItem.duration || 0) / 60)}m
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      breakItem.status === 'completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {breakItem.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No breaks today yet</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
