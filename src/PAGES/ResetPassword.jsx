import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../STYLES/ResetPassword.css'

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      setError('Please fill in both password fields.');
      setMessage('');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setMessage('');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await axios.post(
        `${import.meta.env.VITE_PRODUCT_API}/api/auth/reset-password/${token}`,
        { password }
      );
      setMessage('Password reset successful. Redirecting to login...');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Error resetting password');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-page">
      <div className="password-card">
        <span className="password-badge">Secure Access</span>
        <h2>Reset Password</h2>
        <p className="password-subtext">
          Choose a new password for your account. Make sure both fields match before submitting.
        </p>

        <div className="password-form">
          <label>New Password</label>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {message && <p className="password-message success">{message}</p>}
          {error && <p className="password-message error">{error}</p>}

          <button onClick={handleReset} disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
