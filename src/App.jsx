import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './PAGES/Login';
import Signup from './PAGES/Signup';
import ForgotPassword from './PAGES/ForgotPassword';
import ResetPassword from './PAGES/ResetPassword';
import Home from './PAGES/Home';
import Shop from './COMPONENTS/Shop';
import AdminDashboard from './PAGES/AdminDashboard';
import CustomerDashboard from './PAGES/CustomerDashboard';

// Role-based private route
const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) return <Navigate to="/login" />;

  if (role && role.toLowerCase() !== userRole.toLowerCase())
    return <Navigate to="/login" />;

  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/shop" element={<Shop />} />

      {/* Protected Dashboards */}
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute role="Admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/customer-dashboard"
        element={
          <PrivateRoute role="Customer">
            <CustomerDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;