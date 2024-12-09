import React, { useState,useEffect } from "react";

const ItineraryDetails = ({ itinerary }) => {
  const [currency, setCurrency] = useState("USD");
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);
  const [isActive, setIsActive] = useState(itinerary.active); // State to track active status
  const [tourguideName, SettourGuideName] = useState(itinerary.active); // State to track active status


  const toggleItineraryActiveState = async () => {
    try {
      const response = await fetch(
        `/api/itineraryRoute/${itinerary._id}/flag`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      
    } catch (error) {
      console.error("Error toggling active state:", error);
    }
  };

  useEffect(() => {
    const fetchTourguide = async () => {
      const response = await fetch(`/api/tourguideRoute/${itinerary.tourGuideId}`);
      const json = await response.json();
      if (response.ok) SettourGuideName(json);
    };
    fetchTourguide();
  }, []);

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/itinerary/${itinerary._id}`;
    navigator.clipboard.writeText(link)
      .then(() => alert("Link copied to clipboard!"))
      .catch((error) => console.error("Failed to copy link:", error));
  };

  const shareViaEmail = () => {
    const link = `${window.location.origin}/itinerary/${itinerary._id}`;
    window.location.href = `mailto:?subject=Check%20out%20this%20itinerary&body=Here%20is%20an%20itinerary%20I%20found:%20${link}`;
  };

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
      default:
        setCurrencyMultiplier(1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Itinerary Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="font-semibold text-gray-700">
            <strong>Tour Guide:</strong>
          </p>
          <p className="text-gray-600">{tourguideName.Username}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">
            <strong>tourists Attended:</strong>
          </p>
          <p className="text-gray-600">{itinerary.touristsAttended}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">
            <strong>revenue: $</strong>
          </p>
          <p className="text-gray-600">{parseFloat(itinerary.price) * itinerary.touristsAttended}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">
            <strong>Language:</strong>
          </p>
          <p className="text-gray-600">{itinerary.language}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">
            <strong>Duration:</strong>
          </p>
          <p className="text-gray-600">{itinerary.duration}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">
            <strong>Price:</strong>
          </p>
          <p className="text-gray-600">
            {currency} {(parseFloat(itinerary.price) * currencyMultiplier).toFixed(2)}
            <select
              value={currency}
              onChange={handleCurrencyChange}
              className="ml-2 p-1 border rounded-md"
            >
              <option value="USD">USD</option>
              <option value="EGP">EGP</option>
              <option value="EUR">EUR</option>
            </select>
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-gray-700">
          <strong>Activities:</strong>
        </p>
        <p className="text-gray-600">{itinerary.activities}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="font-semibold text-gray-700">
            <strong>Locations:</strong>
          </p>
          <p className="text-gray-600">{itinerary.locations}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">
            <strong>Timeline:</strong>
          </p>
          <p className="text-gray-600">{itinerary.timeline}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">
            <strong>Pickup Location:</strong>
          </p>
          <p className="text-gray-600">{itinerary.pickupLocation}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700">
            <strong>Drop Off Location:</strong>
          </p>
          <p className="text-gray-600">{itinerary.dropOffLocation}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-gray-700">
          <strong>Available Dates:</strong>
        </p>
        <p className="text-gray-600">{itinerary.availableDates}</p>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-gray-700">
          <strong>Accessibility:</strong>
        </p>
        <p className="text-gray-600">{itinerary.accessibility}</p>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={toggleItineraryActiveState}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 font-bold rounded-md hover:bg-gray-300"
            >
            Flag Itinerary
        </button>

        <div className="flex space-x-4">
          <button
            onClick={copyLinkToClipboard}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300"
          >
            Copy Link
          </button>
          <button
            onClick={shareViaEmail}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Share via Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetails;
