import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon, LogOutIcon } from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';

function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user?.role === 'employee' && '👤 Employee Dashboard'}
            {user?.role === 'manager' && '👨‍💼 Manager Dashboard'}
            {user?.role === 'admin' && '⚙️ Admin Dashboard'}
          </h1>
        </div>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            </Menu.Button>
          </div>

          <Transition
            as="div"
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
              <div className="p-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate('/profile')}
                      className={`${active ? 'bg-blue-50' : ''} w-full text-left px-4 py-2 rounded-lg text-sm text-gray-900`}
                    >
                      👤 Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => navigate('/analytics')}
                      className={`${active ? 'bg-blue-50' : ''} w-full text-left px-4 py-2 rounded-lg text-sm text-gray-900`}
                    >
                      📊 Analytics
                    </button>
                  )}
                </Menu.Item>
                <div className="border-t border-gray-100 my-1" />
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${active ? 'bg-red-50' : ''} w-full text-left px-4 py-2 rounded-lg text-sm text-red-600 flex items-center gap-2`}
                    >
                      <LogOutIcon className="h-4 w-4" /> Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
}

export default Navbar;
