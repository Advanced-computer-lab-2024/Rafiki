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
    <div className="bg-white rounded-lg shadow-sm p-4 max-w-2xl mx-auto mt-6 transform hover:scale-105 hover:shadow-xl hover:bg-gray-100 transition duration-300 ease-in-out">
      <h4 className="text-2xl font-semibold text-gray-800 mb-2">{activity.name}</h4>
      
      {/* Image Section */}
      <img src={activity.pictures} alt={`${activity.name} Image`} className="w-full h-40 object-cover rounded-lg mb-4" />

      {/* Flex Container for Activity Details */}
      <div className="flex flex-wrap space-x-4 space-y-4">

        {/* Description */}
        <div className="w-full sm:w-1/2 text-sm">
          <strong className="font-semibold">Description:</strong> {activity.description}
        </div>

        {/* Location */}
        <div className="w-full sm:w-1/2 text-sm">
          <strong className="font-semibold">Location:</strong> {activity.location}
        </div>

        {/* Date */}
        <div className="w-full sm:w-1/2 text-sm">
          <strong className="font-semibold">Date:</strong> {activity.date}
        </div>

        {/* Price */}
        <div className="w-full sm:w-1/2 text-sm">
          <strong className="font-semibold">Price:</strong> {currency} {(parseFloat(activity.price) * currencyMultiplier).toFixed(2)}
          <select
            value={currency}
            onChange={handleCurrencyChange}
            className="ml-2 p-1 bg-gray-100 border border-gray-300 rounded text-sm"
          >
            <option value="USD">USD</option>
            <option value="EGP">EGP</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* Tag */}
        <div className="w-full sm:w-1/2 text-sm">
          <strong className="font-semibold">Tag:</strong> {activity.tag}
        </div>
      </div>

      {/* Buttons for Copy Link and Share */}
      <div className="mt-4 flex space-x-3 text-sm">
        <button
          onClick={copyLinkToClipboard}
          className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          <FaLink className="mr-2" /> Copy Link
        </button>

        <button
          onClick={shareViaEmail}
          className="flex items-center bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition duration-300"
        >
          <FaEnvelope className="mr-2" /> Share via Email
        </button>
      </div>

      {/* Edit and Delete Buttons */}
      <div className="mt-4 flex space-x-3 text-sm">
        <button
          onClick={() => console.log('Edit functionality goes here')}
          className="flex items-center text-yellow-500 px-3 py-1 rounded-lg hover:bg-yellow-100 transition duration-300"
        >
          <FaEdit className="mr-2" /> Edit
        </button>

        <button
          onClick={() => console.log('Delete functionality goes here')}
          className="flex items-center text-red-500 px-3 py-1 rounded-lg hover:bg-red-100 transition duration-300"
        >
          <FaTrashAlt className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
};

export default ActivityDetails;
