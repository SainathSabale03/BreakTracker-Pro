import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import clsx from 'clsx';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();

  const menuItems = [
    { path: '/', label: '🏠 Dashboard', roles: ['employee', 'manager', 'admin'] },
    { path: '/analytics', label: '📊 Analytics', roles: ['employee', 'manager', 'admin'] },
    { path: '/team', label: '👥 Team', roles: ['manager', 'admin'] },
    { path: '/profile', label: '👤 Profile', roles: ['employee', 'manager', 'admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(user?.role));

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          ⏰ BreakTracker-Pro
        </h2>
        <p className="text-blue-200 text-sm mt-1">Break Management System</p>
      </div>

      <nav className="mt-8 px-4 space-y-2">
        {filteredMenuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={clsx(
              'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium',
              location.pathname === item.path
                ? 'bg-white text-blue-900 shadow-md'
                : 'text-blue-100 hover:bg-blue-700 hover:text-white'
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-blue-700 rounded-lg p-4">
          <p className="text-sm text-blue-100">Role</p>
          <p className="text-lg font-bold text-white capitalize mt-1">{user?.role}</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
