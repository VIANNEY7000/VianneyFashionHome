import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../COMPONENTS/Login.css';
import { Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_PRODUCT_API}/api/auth/login`,
        { email, password }
      );

      const { token, user } = res.data;

       localStorage.setItem('token', token);
       localStorage.setItem('role', user.role);
       localStorage.setItem('userId', user._id);

       if (user.role.toLowerCase() === 'customer') {
      navigate('/customer/dashboard');
    } else if (user.role.toLowerCase() === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/'); 
    }

    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 50 }}k
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 25 }}
      >
        <div className="login-header">
          <FaLock className="login-icon" />
          <h1>
            <span>V</span>FashionHome
          </h1>
          <h3 className="login-title">{error || 'Login'}</h3>
        </div>

        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          <Button
            onClick={handleLogin}
            className="login-button"
            disabled={loading}
             style={{background:"blue", color:"white"}}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Login'}
          </Button>
        </form>

        <div className="login-links">
          <p>
            <Link to="/forgot-password" className="link">
              Forgotten password?
            </Link>
          </p>
          <p>
            Don't have an account? <Link to="/signup" className="link">Sign up</Link>
          </p>
          <Link to="/" className="link home-link">
            Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;