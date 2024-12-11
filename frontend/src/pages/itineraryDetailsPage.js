import React, { useState } from "react";

const ItineraryDetails = ({ itinerary }) => {
  const [currency, setCurrency] = useState('USD');
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);
  const [isActive, setIsActive] = useState(itinerary.active); // State to track active status

  // Function to toggle the active state
  const toggleItineraryActiveState = async () => {
    try {
      const response = await fetch(`/api/itinerary/${itinerary._id}/toggle`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsActive(prevState => !prevState);
      } else {
        console.error("Failed to toggle active state.");
      }
    } catch (error) {
      console.error("Error toggling active state:", error);
    }
  };

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/itinerary/${itinerary._id}`;
    navigator.clipboard.writeText(link)
      .then(() => alert('Link copied to clipboard!'))
      .catch(error => console.error("Failed to copy link:", error));
  };

  const shareViaEmail = () => {
    const link = `${window.location.origin}/itinerary/${itinerary._id}`;
    window.location.href = `mailto:?subject=Check%20out%20this%20itinerary&body=Here%20is%20an%20itinerary%20I%20found:%20${link}`;
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
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800">{itinerary.tourGuideUsername}'s Itinerary</h2>
      <p className="text-lg text-gray-600">
        <strong className="font-bold">Activities:</strong> {itinerary.activities}
      </p>
      <p className="text-lg text-gray-600">
        <strong className="font-bold">Locations:</strong> {itinerary.locations}
      </p>
      <p className="text-lg text-gray-600">
        <strong className="font-bold">Timeline:</strong> {itinerary.timeline}
      </p>
      <p className="text-lg text-gray-600">
        <strong className="font-bold">Duration:</strong> {itinerary.duration}
      </p>
      <p className="text-lg text-gray-600">
        <strong className="font-bold">Language:</strong> {itinerary.language}
      </p>
      <div className="flex items-center space-x-2 text-lg text-gray-600">
        <span className="font-bold">Price:</span>
        <span>{currency} {(parseFloat(itinerary.price) * currencyMultiplier).toFixed(2)}</span>
        <select
          value={currency}
          onChange={handleCurrencyChange}
          className="p-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="USD">USD</option>
          <option value="EGP">EGP</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <p className="text-lg text-gray-600">
        <strong className="font-bold">Available Dates:</strong> {itinerary.availableDates}
      </p>
      <p className="text-lg text-gray-600">
        <strong className="font-bold">Accessibility:</strong> {itinerary.accessibility}
      </p>
      <p className="text-lg text-gray-600">
        <strong className="font-bold">Pickup Location:</strong> {itinerary.pickupLocation}
      </p>
      <p className="text-lg text-gray-600">
        <strong className="font-bold">Drop Off Location:</strong> {itinerary.dropOffLocation}
      </p>
      <p className="text-sm text-gray-500">Created on: {itinerary.createdAt}</p>

      {/* Button to toggle active state */}
      <button
        onClick={toggleItineraryActiveState}
        className={`px-6 py-2 rounded-full text-white font-semibold ${
          isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
        } transition duration-200 ease-in-out`}
      >
        {isActive ? 'Deactivate Itinerary' : 'Activate Itinerary'}
      </button>

      {/* Button to copy link */}
      <button
        onClick={copyLinkToClipboard}
        className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200 ease-in-out"
      >
        Copy Itinerary Link
      </button>

      {/* Button to share via email */}
      <button
        onClick={shareViaEmail}
        className="px-6 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition duration-200 ease-in-out"
      >
        Share via Email
      </button>
    </div>
  );
};

export default ItineraryDetails;
