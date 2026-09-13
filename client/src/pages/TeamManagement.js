import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../store/authStore';
import { motion } from 'framer-motion';

function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTeamMembers();
    const interval = setInterval(fetchTeamMembers, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/users/team');
      setTeamMembers(res.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      'working': { bg: 'bg-green-100', text: 'text-green-800', icon: '✅' },
      'on-break': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏸️' },
      'offline': { bg: 'bg-gray-100', text: 'text-gray-800', icon: '⭕' }
    };
    const c = config[status] || config['offline'];
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${c.bg} ${c.text}`}>
        {c.icon} {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredMembers = filter === 'all' 
    ? teamMembers 
    : teamMembers.filter(m => m.status === filter);

  return (
    <div className="p-8 space-y-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">👥 Team Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your team members</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'working', 'on-break', 'offline'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === status
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.length > 0 ? (
          filteredMembers.map(member => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="card hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{member.email}</p>
                </div>
                <div className="text-3xl">👤</div>
              </div>

              <div className="space-y-3 py-3 border-y border-gray-200 my-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                  <div className="mt-2">{getStatusBadge(member.status)}</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Department</p>
                    <p className="font-bold text-gray-900 mt-1">{member.department || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Break Time</p>
                    <p className="font-bold text-blue-600 mt-1">{Math.round(member.totalBreakTime / 60 || 0)}m</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-500">Break Limit Progress</p>
                  <p className="text-xs font-bold text-gray-700">
                    {Math.round((member.totalBreakTime / (member.breakLimit * 60)) * 100)}%
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min(
                        (member.totalBreakTime / (member.breakLimit * 60)) * 100,
                        100
                      )}%`
                    }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No team members found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamManagement;
