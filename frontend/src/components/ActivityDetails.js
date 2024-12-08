import React, { useState } from 'react';
import { FaLink, FaEnvelope, FaEdit, FaTrashAlt } from 'react-icons/fa';

const ActivityDetails = ({ activity }) => {
  const [currency, setCurrency] = useState('USD');
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/activities/${activity._id}`;
    navigator.clipboard.writeText(link)
      .then(() => alert('Link copied to clipboard!'))
      .catch(error => console.error("Failed to copy link:", error));
  };

  const shareViaEmail = () => {
    const link = `${window.location.origin}/activities/${activity._id}`;
    window.location.href = `mailto:?subject=Check%20out%20this%20activity&body=Here%20is%20an%20activity%20I%20found:%20${link}`;
  };
 console.log(activity)
  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);

    switch (selectedCurrency) {
      case 'EGP':
        setCurrencyMultiplier(50);
        break;
      case 'EUR':
        setCurrencyMultiplier(0.92);
        break;
      default: // USD
        setCurrencyMultiplier(1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto mt-6 transform hover:scale-105 hover:shadow-xl hover:bg-gray-50 transition duration-300 ease-in-out">
      <h4 className="text-3xl font-semibold text-gray-800 mb-4">{activity.name}</h4>

      {/* Image Section */}
      <img
        src={activity.pictures}
        alt={`${activity.name} Image`}
        className="w-full h-56 object-cover rounded-lg mb-6 shadow-md"
      />

      {/* Activity Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Description */}
        <div className="text-sm text-gray-700">
          <strong className="font-semibold">Description:</strong> {activity.description}
        </div>
        <div>
          <p className="font-semibold text-gray-700">
            <strong>tourists Attended:</strong>
          </p>
          <p className="text-gray-600">{activity.touristsAttended}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">
            <strong>tourists cost:</strong>
          </p>
          <p className="text-gray-600">{parseFloat(activity.price) * activity.touristsAttended}</p>
        </div>
        {/* Location */}
        <div className="text-sm text-gray-700">
          <strong className="font-semibold">Location:</strong> {activity.location}
        </div>

        {/* Date */}
        <div className="text-sm text-gray-700">
          <strong className="font-semibold">Date:</strong> {activity.date}
        </div>

        {/* Price */}
        <div className="flex items-center text-sm text-gray-700">
          <strong className="font-semibold">Price:</strong>
          <span className="ml-2">
            {currency} {(parseFloat(activity.price) * currencyMultiplier).toFixed(2)}
          </span>
          <select
            value={currency}
            onChange={handleCurrencyChange}
            className="ml-4 p-1 bg-gray-100 border border-gray-300 rounded text-sm"
          >
            <option value="USD">USD</option>
            <option value="EGP">EGP</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* Tag */}
        <div className="text-sm text-gray-700">
          <strong className="font-semibold">Tag:</strong> {activity.tag}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-6">
        {/* Copy Link Button */}
        <button
          onClick={copyLinkToClipboard}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          <FaLink className="mr-2" /> Copy Link
        </button>

        {/* Share via Email Button */}
        <button
          onClick={shareViaEmail}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          <FaEnvelope className="mr-2" /> Share via Email
        </button>
      </div>

      {/* Edit and Delete Buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => console.log('Edit functionality goes here')}
          className="flex items-center text-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-100 transition duration-300"
        >
          <FaEdit className="mr-2" /> Edit
        </button>

        <button
          onClick={() => console.log('Delete functionality goes here')}
          className="flex items-center text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition duration-300"
        >
          <FaTrashAlt className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
};

export default ActivityDetails;
