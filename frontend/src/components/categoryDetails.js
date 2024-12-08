import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const CategoryDetails = ({ category, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(category.name);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(category._id, newName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewName(category.name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm p-4 bg-white/20 rounded-lg shadow-lg my-4"
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <AnimatePresence mode="sync">
        {isEditing ? (
          <motion.div
            key="editing"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex flex-col space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Edit Category
            </h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-800"
            />
            <div className="flex justify-end gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveClick}
                className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                <FaSave />
                Save
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                className="flex items-center gap-2 px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-semibold"
              >
                <FaTimes />
                Cancel
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="viewing"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-4"
          >
            <p className="text-gray-800 text-lg font-medium">
              <strong>Category:</strong> {category.name}
            </p>
            <div className="flex justify-end gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEditClick}
                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                <FaEdit />
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(category._id)}
                className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                <FaTrash />
                Delete
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CategoryDetails;