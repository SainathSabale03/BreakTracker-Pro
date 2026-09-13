import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { axiosInstance } from '../store/authStore';
import { motion } from 'framer-motion';

function Profile() {
  const { user, loadUser } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    department: user?.department || '',
    breakLimit: user?.breakLimit || 120
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axiosInstance.put(`/users/profile/${user._id}`, formData);
      setMessage('Profile updated successfully!');
      loadUser();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="card mb-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-4xl text-white shadow-lg">
              👤
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-600 mt-1 capitalize">Role: <span className="font-medium">{user?.role}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-200">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-600 text-sm">Email</p>
              <p className="font-bold text-gray-900 mt-1 break-all">{user?.email}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-gray-600 text-sm">Department</p>
              <p className="font-bold text-gray-900 mt-1">{user?.department || 'N/A'}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-gray-600 text-sm">Total Break Time</p>
              <p className="font-bold text-gray-900 mt-1">{Math.round(user?.totalBreakTime / 60 || 0)}m</p>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">✏️ Edit Profile</h2>

          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-4 rounded-lg mb-6 ${
                message.includes('successfully')
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Engineering"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Break Limit (minutes)
              </label>
              <input
                type="number"
                name="breakLimit"
                value={formData.breakLimit}
                onChange={handleChange}
                className="input-field"
                min="30"
                max="480"
              />
              <p className="text-xs text-gray-500 mt-1">Set your desired daily break limit</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 mt-6"
            >
              {loading ? '💾 Saving...' : '💾 Save Changes'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Profile;
