import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const AdminForm = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const advertiser = { name };

    const response = await fetch('/api/categoryRoutes', {
      method: 'POST',
      body: JSON.stringify(advertiser),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error || 'Something went wrong.');
      setSuccess(false);
    } else {
      setError(null);
      setSuccess(true);
      setName('');
      console.log('New category added:', json);

      // Hide the success message after a delay (optional)
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };



  return (
    <div className="flex flex-col items-center justify-center">
      {/* Toggle Button */}
      

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mt-4 w-full max-w-sm p-4 bg-white/20 rounded-lg shadow-lg"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Create Activity Category
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label
                  htmlFor="categoryName"
                  className="text-gray-700 font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Enter category name"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Create Category
              </motion.button>

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center text-green-500 text-sm mt-2"
                >
                  <FaRegCheckCircle className="mr-1" />
                  Category created successfully!
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center text-red-500 text-sm mt-2"
                >
                  <FaExclamationTriangle className="mr-1" />
                  {error}
                </motion.div>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminForm;