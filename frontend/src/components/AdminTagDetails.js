import { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTag } from "react-icons/fa";

const AdminTagDetails = ({ Tag, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(Tag.name);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(Tag._id, newName);
    setIsEditing(false);
  };

  return (
    <div
      className="flex items-center justify-between rounded-lg shadow-md p-4 mb-4"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.6)", // Semi-transparent white
        backdropFilter: "blur(5px)", // Frosted glass effect
      }}
    >
      {/* Tag Icon and Name */}
      <div className="flex items-center">
        <FaTag className="text-blue-500 mr-2 text-xl" />
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p className="text-gray-800 font-semibold text-lg">{Tag.name}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        {isEditing ? (
          <button
            onClick={handleSaveClick}
            className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-400"
          >
            <FaSave className="mr-1" />
            Save
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            className="flex items-center px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
          >
            <FaEdit className="mr-1" />
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(Tag._id)}
          className="flex items-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-400"
        >
          <FaTrash className="mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminTagDetails;
