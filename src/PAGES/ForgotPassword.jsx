import { useState } from 'react';
import axios from 'axios';
import '../STYLES/ForgotPassword.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError('Please enter your email.');
      setMessage('');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await axios.post(
        `${import.meta.env.VITE_PRODUCT_API}/api/auth/forgot-password`,
        { email }
      );

      setMessage(res.data.message || 'Password reset link sent.');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Error sending reset link.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-page">
      <div className="password-card">
        <span className="password-badge">Account Recovery</span>
        <h2>Forgot Password</h2>
        <p className="password-subtext">
          Enter the email linked to your account and we will send you a password reset link.
        </p>

        <div className="password-form">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {message && <p className="password-message success">{message}</p>}
          {error && <p className="password-message error">{error}</p>}

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
