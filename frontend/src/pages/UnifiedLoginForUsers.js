import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import pic from "../pics/pic2.jpg";

function UnifiedLoginForUsers() {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    // Define roles, endpoints, and redirects
    const userRoles = [
      { role: "Seller", endpoint: "/api/sellerRoute/login", redirect: "/seller-signup" },
      { role: "Advertiser", endpoint: "/api/AdvertiserRoute/login", redirect: "/advertiser-signup" },
      { role: "Tour Guide", endpoint: "/api/tourguideRoute/login", redirect: "/tourguide-signup" },
    ];

    for (const { endpoint, redirect } of userRoles) {
      try {
        const response = await axios.post(endpoint, {
          Username: username,
          Password: password,
        });

        if (response.status === 200) {
          // Store user info in localStorage
          const { tourist } = response.data; // Assuming "tourist" holds seller data
          localStorage.setItem("loggedinID", tourist._id); // Store seller ID in localStorage
          localStorage.setItem('loggedinUsername', tourist.Username);
          navigate(redirect);
          return; // Exit once logged in successfully
        }
      } catch (err) {
        if (err.response?.status === 400 || err.response?.status === 404) {
          // Move on to the next role if this one fails
          continue;
        } else {
          setError("An error occurred. Please try again.");
          return;
        }
      }
    }

    // If all roles fail, show incorrect credentials error
    setError("Incorrect username or password.");
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError(null);

    const endpoints = [
      "/api/sellerRoute/requestOTP",
      "/api/AdvertiserRoute/requestOTP",
      "/api/tourguideRoute/requestOTP",
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await axios.post(endpoint, { email });
        if (response.status === 200) {
          setIsOtpSent(true);
          return; // Exit once OTP is sent successfully
        }
      } catch (err) {
        // Continue to the next endpoint if the current one fails
        continue;
      }
    }

    // If all endpoints fail, show error
    setError("No account found with this email.");
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError(null);

    const endpoints = [
      "/api/sellerRoute/verifyOTP",
      "/api/AdvertiserRoute/verifyOTP",
      "/api/tourguideRoute/verifyOTP",
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await axios.post(endpoint, { email, otp });
        if (response.status === 200) {
          setIsOtpVerified(true);
          return; // Exit once OTP is verified successfully
        }
      } catch (err) {
        // Continue to the next endpoint if the current one fails
        continue;
      }
    }

    // If all endpoints fail, show error
    setError("Invalid OTP. Please try again.");
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);

    const endpoints = [
      "/api/sellerRoute/resetPassword",
      "/api/AdvertiserRoute/resetPassword",
      "/api/tourguideRoute/resetPassword",
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await axios.post(endpoint, { email, newPassword });
        if (response.status === 200) {
          alert("Password reset successfully!");
          setIsOtpVerified(false);
          setIsOtpSent(false);
          setIsForgotPassword(false);
          return; // Exit once password is reset successfully
        }
      } catch (err) {
        // Continue to the next endpoint if the current one fails
        continue;
      }
    }

    // If all endpoints fail, show error
    setError("Error resetting password. Please try again.");
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
          Seller / Advertiser / Tour Guide Login
        </h1>
        <p className="text-sm text-gray-500 text-center mb-4">
          Please enter your credentials to access your dashboard.
        </p>
        {!isForgotPassword ? (
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Input */}
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-blue-400" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
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
            {/* Forgot Password */}
            <button
              onClick={() => setIsForgotPassword(true)}
              className="text-blue-600 mt-4 hover:underline block text-center"
            >
              Forgot your password?
            </button>
          </form>
        ) : (
          <div className="bg-white shadow-lg p-8 rounded-lg mt-6 space-y-4 w-full">
            {!isOtpSent ? (
              <>
                <h3 className="text-xl font-semibold text-gray-800">Reset Password</h3>
                <form onSubmit={handleRequestOTP} className="space-y-4">
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
            ) : !isOtpVerified ? (
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
            ) : (
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

export default UnifiedLoginForUsers;
