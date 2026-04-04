import '../COMPONENTS/Signup.css'
import { Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'https://vfhome-backend2-3.onrender.com/api/auth/register',
        { name, email, password }
      );
      console.log(response.data);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <motion.div
        className="signup-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 25 }}
      >
        <div className="signup-header">
          <h1>
            <span>V</span>FashionHome
          </h1>
          <h2 className="signup-title">{error || 'Sign Up'}</h2>
        </div>

        <form
          className="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="signup-input"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
          />

          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
          />

          <Button
            type="submit"
            className="signup-button"
            disabled={loading}
            style={{background:"blue", color:"white"}}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Sign Up'}
          </Button>
        </form>

        <div className="signup-links">
          <Link to="/login" className="link">
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;