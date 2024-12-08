import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import pic from "../pics/pic2.jpg";
   



function UnifiedLoginForUsers() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

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
          // Store the username in localStorage for future use
          const { tourist } = response.data; // Assuming "tourist" holds seller data
          localStorage.setItem("sellerId", tourist._id); // Store seller ID in localStorage
          localStorage.setItem('sellerUsername', tourist.Username);
          localStorage.setItem('sellerName', tourist.Name); // Store seller Name
          navigate(redirect);
          return;
        }
      } catch (error) {
        if (
          error.response?.status === 400 ||
          error.response?.status === 404
        ) {
          // If it's a 400 or 404, move on to try the next role
          continue;
        } else {
          setError("An error occurred. Please try again.");
          return;
        }
      }
    }

    // If we tried all roles and none matched, show incorrect credentials error
    setError("Incorrect username or password.");
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
        </form>
      </div>
    </div>
  );
}

export default UnifiedLoginForUsers;
