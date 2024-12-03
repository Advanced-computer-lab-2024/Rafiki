import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TouristLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Track forgot password state
  const [email, setEmail] = useState(''); // Email state for OTP request
  const [message, setMessage] = useState(''); // Message state to show status
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('/api/touristRoute/login', {
        Username: username,
        Password: password,
      });

      if (response.status === 200) {
        alert("Login successful");
        localStorage.setItem("username", username);
        navigate('/tourist-signup', { state: { promoCode: response.data.promoCode } });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  // Handle OTP request for Forgot Password
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message

    try {
      const response = await axios.post('/api/touristRoute/requestOTP', { email });
      setMessage(response.data.message); // Display success message
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending OTP.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Tourist Login</h1>
      <form onSubmit={handleLogin} className="bg-white shadow-lg p-8 rounded space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      {/* Forgot Password Section */}
      <button
        onClick={() => setIsForgotPassword(true)}
        className="text-blue-500 mt-4"
      >
        Forgot your password?
      </button>

      {isForgotPassword && (
        <div className="bg-white shadow-lg p-8 rounded space-y-4 mt-6">
          <h3 className="text-xl font-bold">Reset Password</h3>
          <form onSubmit={handleRequestOTP}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Request OTP
            </button>
          </form>
          {message && <p className="text-sm text-red-500">{message}</p>}
        </div>
      )}
    </div>
  );
}

export default TouristLogin;
