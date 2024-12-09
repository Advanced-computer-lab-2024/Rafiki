import React, { useState } from "react";
import { FaLink, FaEnvelope, FaEdit, FaTrashAlt } from "react-icons/fa";

const ActivityDetails = ({ activity }) => {
  const [currency, setCurrency] = useState("USD");
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/activities/${activity._id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => alert("Link copied to clipboard!"))
      .catch((error) => console.error("Failed to copy link:", error));
  };

  const toggleActivityActiveState = async () => {
    try {
      const response = await fetch(
        `/api/activityRoute/${activity._id}/flag`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      
    } catch (error) {
      console.error("Error toggling active state:", error);
    }
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
      case "EGP":
        setCurrencyMultiplier(50);
        break;
      case "EUR":
        setCurrencyMultiplier(0.92);
        break;
      default: // USD
        setCurrencyMultiplier(1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto mt-8 transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out">
      {/* Title */}
      <h4 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4">
        {activity.name}
      </h4>

      {/* Activity Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
        {/* Description */}
        <div className="text-lg text-gray-700">
          <strong className="font-semibold block mb-2">Description:</strong>
          {activity.description}
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
        <div className="text-lg text-gray-700">
          <strong className="font-semibold block mb-2">Location:</strong>
          {activity.location}
        </div>

        {/* Date */}
        <div className="text-lg text-gray-700">
          <strong className="font-semibold block mb-2">Date:</strong>
          {new Date(activity.date).toLocaleDateString()}
        </div>

        {/* Price */}
        <div className="text-lg text-gray-700 flex flex-col">
          <strong className="font-semibold block mb-2">Price:</strong>
          <span className="flex items-center">
            {currency} {(parseFloat(activity.price) * currencyMultiplier).toFixed(2)}
          </span>
          <select
            value={currency}
            onChange={handleCurrencyChange}
            className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded text-lg"
          >
            <option value="USD">USD</option>
            <option value="EGP">EGP</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* Tag */}
        <div className="text-lg text-gray-700">
          <strong className="font-semibold block mb-2">Tag:</strong>
          {activity.tag}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-8">
        {/* Copy Link Button */}
        <button
          onClick={copyLinkToClipboard}
          className="flex items-center bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 shadow-md transition duration-300"
        >
          <FaLink className="mr-2" /> Copy Link
        </button>

        {/* Share via Email Button */}
        <button
          onClick={shareViaEmail}
          className="flex items-center bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 shadow-md transition duration-300"
        >
          <FaEnvelope className="mr-2" /> Share via Email
        </button>

        {/* Edit Button */}
        <button
          onClick={toggleActivityActiveState}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 font-bold rounded-md hover:bg-gray-300"
          >
          Flag Itinerary
        </button>

      </div>
    </div>
  );
};

export default ActivityDetails;
