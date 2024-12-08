import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // For animations
import { FaUser, FaLock } from 'react-icons/fa'; // Icons for inputs

const GovernerForm = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const governor = { Username, Password };

    const response = await fetch('/api/adminRoute/addTourismGovernor', {
      method: 'POST',
      body: JSON.stringify(governor),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setSuccess(false);
    } else {
      setError(null);
      setSuccess(true);
      setPassword('');
      setUsername('');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-screen bg-transparent"
    >
      <div
        className="shadow-lg rounded-lg p-4 w-80 h-80 bg-white/20 flex flex-col justify-center"
        style={{
          backdropFilter: 'blur(8px)',
        }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Create Tourism Governor
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-1"
            >
              Username
            </label>
            <FaUser className="absolute left-3 top-10 text-blue-400" />
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={Username}
              placeholder="Enter username"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <FaLock className="absolute left-3 top-10 text-blue-400" />
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              placeholder="Enter password"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Create Account
          </motion.button>

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
              Signup successful! Redirecting...
            </motion.div>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default GovernerForm;