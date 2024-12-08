import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import pic from "../pics/pic3.jpg";

function UnifiedLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Attempt admin login first
      const adminResponse = await axios.post("/api/adminRoute/login", {
        Username: username,
        Password: password,
      });

      if (adminResponse.status === 200) {
        // Store user info in localStorage
        const { admin } = adminResponse.data;
        localStorage.setItem("loggedinID", admin._id); // Store seller ID in localStorage
        localStorage.setItem('loggedinUsername', admin.Username);

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
            // Store user info in localStorage
            const { admin } = governorResponse.data;
            localStorage.setItem("loggedinID", admin._id); // Store seller ID in localStorage
            localStorage.setItem('loggedinUsername', admin.Username);

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
      </div>
    </div>
  );
}

export default UnifiedLogin;