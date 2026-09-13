import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import TeamManagement from './pages/TeamManagement';

function App() {
  const { user, token, loadUser } = useAuthStore();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !user) {
      loadUser();
    }
  }, []);

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        {token && user && <Sidebar />}
        <div className="flex-1 flex flex-col">
          {token && user && <Navbar />}
          <main className="flex-1 overflow-auto">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
              <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />

              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/" element={
                  user?.role === 'employee' ? <EmployeeDashboard /> :
                  user?.role === 'manager' ? <ManagerDashboard /> :
                  user?.role === 'admin' ? <AdminDashboard /> :
                  <EmployeeDashboard />
                } />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/team" element={user?.role !== 'employee' ? <TeamManagement /> : <Navigate to="/" />} />
              </Route>

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
