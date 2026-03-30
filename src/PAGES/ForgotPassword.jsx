import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_PRODUCT_API}/api/auth/forgot-password`,
        { email }
      );

      // For testing, backend returns the reset link
      console.log('Reset Link:', res.data.resetLink);
      setMessage('Check console for the reset link.');

      // In production, you'd send the link via email
    } catch (err) {
      console.error(err);
      setMessage('Error sending reset link.');
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
      <button onClick={handleSubmit}>Send Reset Link</button>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;