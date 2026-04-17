import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setMessage('Please enter your email.');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_PRODUCT_API}/api/auth/forgot-password`,
        { email }
      );

      setMessage(res.data.message || 'Password reset link sent.');
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || 'Error sending reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
