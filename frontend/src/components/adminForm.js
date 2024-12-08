import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // Icons

const AdminForm = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // For success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const admin = { Username, Password, Email };

    const response = await fetch("/api/adminRoute/addAdmin", {
      method: "POST",
      body: JSON.stringify(admin),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setSuccess(false);
    } else {
      setError(null);
      setSuccess(true);
      setPassword("");
      setUsername("");
      setEmail("");

      // Redirect to the home page after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-lg shadow-lg rounded-lg p-6 max-w-md mx-auto"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Create Admin Account
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username Input */}
        <div className="relative">
          <FaUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={Username}
            placeholder="Enter username"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
            required
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <FaEnvelope className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={Email}
            placeholder="Enter email"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={Password}
            placeholder="Enter password"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition font-semibold"
        >
          Create Account
        </button>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm mt-2 text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-500 text-sm mt-2 text-center"
          >
            Signup successful! Redirecting to home page...
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default AdminForm;