import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import pic from "../pics/pic3.jpg";

function UnifiedLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();

  // Handle normal login (Admin or Governor)
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const adminResponse = await axios.post("/api/adminRoute/login", {
        Username: username,
        Password: password,
      });

      if (adminResponse.status === 200) {
        const { Username, _id } = adminResponse.data;
        localStorage.setItem("loggedInUser", JSON.stringify({ username: Username, id: _id }));
        navigate("/adminDashboard");
        return;
      }
    } catch (adminError) {
      if (adminError.response?.status === 400 || adminError.response?.status === 404) {
        try {
          const governorResponse = await axios.post("/api/adminRoute/login-gov", {
            Username: username,
            Password: password,
          });

          if (governorResponse.status === 200) {
            const { Username, _id } = governorResponse.data;
            localStorage.setItem("loggedInUser", JSON.stringify({ username: Username, id: _id }));
            navigate("/GovernorDashboard");
            return;
          }
        } catch (governorError) {
          if (
            governorError.response?.status === 400 ||
            governorError.response?.status === 404
          ) {
            setError("Incorrect username or password.");
            return;
          }
          setError("An error occurred. Please try again.");
          return;
        }
      } else {
        setError("An error occurred. Please try again.");
        return;
      }
    }
  };

  // Handle Forgot Password request (send OTP)
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/adminRoute/requestOTP", { email });
      if (response.status === 200) {
        setIsOtpSent(true);
      } else {
        setError("Error sending OTP. Please try again.");
      }
    } catch (error) {
      setError("Error sending OTP. Please try again.");
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/adminRoute/verifyOTP", { email, otp });
      if (response.status === 200) {
        setIsOtpVerified(true);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    }
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/adminRoute/resetPassword", { email, newPassword });
      if (response.status === 200) {
        setIsOtpVerified(false);
        setIsOtpSent(false);
        setIsForgotPassword(false);
        setError(null);
      } else {
        setError("Error resetting password.");
      }
    } catch (error) {
      setError("Error resetting password.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-900 text-white"
      style={{
        backgroundImage: `url(${pic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {/* Header Section */}
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">
          Admin / Governor Login
        </h1>
        <p className="text-sm text-gray-500 text-center mb-4">
          Please enter your credentials to access your dashboard.
        </p>
        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Input */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-blue-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Password Input */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-blue-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          >
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <button
          onClick={() => setIsForgotPassword(true)}
          className="text-blue-600 mt-4 hover:underline block text-center"
        >
          Forgot your password?
        </button>

        {/* Forgot Password Section */}
        {isForgotPassword && (
          <div className="bg-white shadow-lg p-8 rounded-lg mt-6 space-y-4 w-full">
            {/* OTP Request */}
            {!isOtpSent && (
              <>
                <h3 className="text-xl font-semibold text-gray-800">Reset Password</h3>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  >
                    Request OTP
                  </button>
                </form>
              </>
            )}

            {/* OTP Verification */}
            {isOtpSent && !isOtpVerified && (
              <>
                <h3 className="text-xl font-semibold text-gray-800">Verify OTP</h3>
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  >
                    Verify OTP
                  </button>
                </form>
              </>
            )}

            {/* Password Reset */}
            {isOtpVerified && (
              <>
                <h3 className="text-xl font-semibold text-gray-800">Enter New Password</h3>
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <input
                    type="password"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                  >
                    Reset Password
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UnifiedLogin;
