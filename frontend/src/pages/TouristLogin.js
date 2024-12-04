import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TouristLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Track forgot password state
  const [email, setEmail] = useState(''); // Email state for OTP request
  const [otp, setOtp] = useState(''); // OTP state for verification
  const [newPassword, setNewPassword] = useState(''); // New password state
  const [message, setMessage] = useState(''); // Message state to show status
  const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP is sent
  const [isOtpVerified, setIsOtpVerified] = useState(false); // Track OTP verification
  const navigate = useNavigate();

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('/api/touristRoute/login', {
        Username: username,
        Password: password,
      });

      if (response.status === 200) {
        alert('Login successful');
        navigate('/tourist-signup', { state: { promoCode: response.data.promoCode } });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  // Handle OTP Request
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('/api/touristRoute/requestOTP', { email });
      if (response.status === 200) {
        setMessage('OTP sent successfully. Please check your email.');
        setIsOtpSent(true); // Set OTP sent flag to true
      } else {
        setMessage('Error sending OTP. Please try again.');
      }
    } catch (error) {
      setMessage('Error sending OTP. Please try again.');
    }
  };

  // Handle OTP Verification
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message

    try {
      const response = await axios.post('/api/touristRoute/verifyOTP', { email, otp });
      if (response.status === 200) {
        setIsOtpVerified(true); // OTP verified, allow password reset
        setMessage('OTP verified successfully. You can now reset your password.');
      } else {
        setMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  // Handle Password Reset
  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/touristRoute/resetPassword', { email, newPassword });
      if (response.status === 200) {
        setMessage('Password reset successfully.');
      } else {
        setMessage('Error resetting password.');
      }
    } catch (error) {
      setMessage('Error resetting password.');
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
          {/* OTP Request Form */}
          {!isOtpSent ? (
            <>
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
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold">Verify OTP</h3>
              <form onSubmit={handleVerifyOTP}>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Verify OTP
                </button>
              </form>
            </>
          )}

          {/* Password Reset Form */}
          {isOtpVerified && (
            <>
              <h3 className="text-xl font-bold">Enter New Password</h3>
              <form onSubmit={handleResetPassword}>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Reset Password
                </button>
              </form>
            </>
          )}

          {message && <p className="text-sm text-red-500">{message}</p>}
        </div>
      )}
    </div>
  );
}

export default TouristLogin;
