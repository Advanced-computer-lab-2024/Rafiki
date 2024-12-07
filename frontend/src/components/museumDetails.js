import React, { useState } from 'react';
import { FaLink, FaEnvelope, FaEdit, FaTrashAlt } from 'react-icons/fa';

const MuseumDetails = ({ museum }) => {
  const [currency, setCurrency] = useState('USD');
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/museums/${museum._id}`;
    navigator.clipboard.writeText(link)
      .then(() => alert('Link copied to clipboard!'))
      .catch(error => console.error("Failed to copy link:", error));
  };

  const shareViaEmail = () => {
    const link = `${window.location.origin}/museums/${museum._id}`;
    window.location.href = `mailto:?subject=Check%20out%20this%20museum&body=Here%20is%20a%20museum%20I%20found:%20${link}`;
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
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto mt-6 transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out">
      <h4 className="text-3xl font-bold text-gray-800 mb-4">{museum.name}</h4>
      
      {/* Image Section */}
      <img src={museum.pictures} alt={`${museum.name} Image`} className="w-full h-64 object-cover rounded-lg mb-6" />

      {/* Flex Container for Museum Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Description */}
        <div className="text-sm text-gray-600">
          <strong className="font-semibold text-gray-800">Description:</strong>
          <p>{museum.description}</p>
        </div>

        {/* Location */}
        <div className="text-sm text-gray-600">
          <strong className="font-semibold text-gray-800">Location:</strong>
          <p>{museum.location}</p>
        </div>

        {/* Opening Hours */}
        <div className="text-sm text-gray-600">
          <strong className="font-semibold text-gray-800">Opening Hours:</strong>
          <p>{museum.openingHours}</p>
        </div>

        {/* Ticket Price */}
        <div className="text-sm text-gray-600">
          <strong className="font-semibold text-gray-800">Ticket Price:</strong> {currency} {(parseFloat(museum.ticketPrices) * currencyMultiplier).toFixed(2)}
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
        <div className="text-sm text-gray-600">
          <strong className="font-semibold text-gray-800">Tag:</strong> {museum.tag}
        </div>
      </div>

      {/* Buttons for Copy Link and Share */}
      <div className="mt-6 flex space-x-4 justify-start">
        <button
          onClick={copyLinkToClipboard}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          <FaLink className="mr-2" /> Copy Link
        </button>

        <button
          onClick={shareViaEmail}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
        >
          <FaEnvelope className="mr-2" /> Share via Email
        </button>
      </div>

      {/* Edit and Delete Buttons */}
      <div className="mt-6 flex space-x-4 justify-start">
        <button
          onClick={() => console.log('Edit functionality goes here')}
          className="flex items-center text-yellow-600 bg-yellow-100 px-4 py-2 rounded-lg hover:bg-yellow-200 transition duration-300 transform hover:scale-105"
        >
          <FaEdit className="mr-2" /> Edit
        </button>

        <button
          onClick={() => console.log('Delete functionality goes here')}
          className="flex items-center text-red-600 bg-red-100 px-4 py-2 rounded-lg hover:bg-red-200 transition duration-300 transform hover:scale-105"
        >
          <FaTrashAlt className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
};

export default MuseumDetails;
