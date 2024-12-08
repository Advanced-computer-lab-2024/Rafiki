import React, { useState } from 'react';
import { FaEnvelope, FaUserAlt, FaAngleDown, FaAngleUp } from 'react-icons/fa';

const TouristDetails = ({ tourist }) => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto mt-6 transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out">
      {/* Name and Email */}
      <h4 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
        <FaUserAlt className="mr-3 text-blue-600" /> {tourist.Username}
      </h4>
      
      <div className="flex items-center text-lg text-gray-700 mb-4">
        <FaEnvelope className="mr-3 text-blue-600" />
        <strong>Email: </strong> {tourist.Email}
      </div>

      {/* Show More Details Button */}
      <button
        onClick={handleShowMoreToggle}
        className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition duration-300 transform hover:scale-105"
      >
        {showMore ? (
          <>
            <FaAngleUp className="mr-2" /> Hide Details
          </>
        ) : (
          <>
            <FaAngleDown className="mr-2" /> Show More Details
          </>
        )}
      </button>

      {/* Additional Details (Conditional Rendering) */}
      {showMore && (
        <div className="mt-4">
          <div className="text-sm text-gray-600">
            <strong className="font-semibold text-gray-800">Nationality:</strong> {tourist.Nationalty}
          </div>
          <div className="text-sm text-gray-600">
            <strong className="font-semibold text-gray-800">Wallet:</strong> ${tourist.Wallet}
          </div>
          <div className="text-sm text-gray-600">
            <strong className="font-semibold text-gray-800">Job:</strong> {tourist.Job}
          </div>
          <div className="text-sm text-gray-600">
            <strong className="font-semibold text-gray-800">Joined On:</strong> {new Date(tourist.createdAt).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-600">
            <strong className="font-semibold text-gray-800">Attended Activities:</strong> {tourist.attendedActivities}
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristDetails;
