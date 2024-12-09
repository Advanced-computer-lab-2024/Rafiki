import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaRegCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const CreatePromoCodes = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/PromoCodeRoute', {
      method: 'POST',
      body: JSON.stringify({ code, discount }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error || 'An error occurred.');
      setSuccess(false);
    } else {
      setError(null);
      setSuccess(true);
      setCode('');
      setDiscount('');
      console.log('New Promo Code added:', json);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
    setError(null);
    setSuccess(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Toggle Button */}
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
      >
        <FaPlus />
        Create Promo Code
      </button>

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
              Create Promo Code
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label
                  htmlFor="promoCode"
                  className="text-gray-700 font-medium mb-1"
                >
                  Code
                </label>
                <input
                  type="text"
                  id="promoCode"
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                  placeholder="Enter promo code"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="discountValue"
                  className="text-gray-700 font-medium mb-1"
                >
                  Discount
                </label>
                <input
                  type="text"
                  id="discountValue"
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                  placeholder="Enter discount amount/percentage"
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
                Create Promo Code
              </motion.button>

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center text-green-500 text-sm mt-2"
                >
                  <FaRegCheckCircle className="mr-1" />
                  Promo code created successfully!
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

export default CreatePromoCodes;