import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';

const DeleteAdmin = () => {
  const [adminId, setAdminId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [formVisible, setFormVisible] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/adminRoute/deleteAccount/${adminId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error || 'An error occurred.');
      setMessage('');
    } else {
      setMessage(json.message || 'Admin deleted successfully.');
      setError('');
      setAdminId('');
    }
  };

  const handleToggleForm = () => {
    setFormVisible(!formVisible);
    setMessage('');
    setError('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-80 h-auto bg-white/20 shadow-lg rounded-lg p-4 flex flex-col justify-center"
      style={{
        backdropFilter: 'blur(8px)',
      }}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Delete Admin
      </h3>

      {/* Toggle button for the form */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggleForm}
        className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold mb-4"
      >
        {formVisible ? 'Close Form' : 'Delete Account'}
      </motion.button>

      {formVisible && (
        <motion.form
          onSubmit={handleDelete}
          className="space-y-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Admin ID Input */}
          <div className="relative">
            <label htmlFor="adminId" className="block text-gray-700 font-medium mb-1">
              Admin ID
            </label>
            <FaUser className="absolute left-3 top-10 text-blue-400" />
            <input
              type="text"
              id="adminId"
              onChange={(e) => setAdminId(e.target.value)}
              value={adminId}
              placeholder="Enter admin ID"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Confirm Deletion
          </motion.button>
        </motion.form>
      )}

      {/* Success Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-500 text-sm mt-2 text-center"
        >
          {message}
        </motion.div>
      )}

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
    </motion.div>
  );
};

export default DeleteAdmin;