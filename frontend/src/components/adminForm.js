import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // For animations

const AdminForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email,setEmail]=useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // For success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const admin = { Username, Password ,Email};

    const response = await fetch('/api/adminRoute/addAdmin', {
      method: 'POST',
      body: JSON.stringify(admin),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setSuccess(false); // Clear success if there's an error
    }
    if (response.ok) {
      setError(null);
      setSuccess(true); // Show success message
      setPassword('');
      setUsername('');
      setEmail('');

      // Redirect to the home page after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      {/* Button to toggle form */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-900 transition"
      >
        Register Admin
      </motion.button>

      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-md"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Register as an Admin
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={Username}
                placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                placeholder="Enter your Email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-400 focus:outline-none"
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
      )}
    </div>
  );
};

export default AdminForm;
