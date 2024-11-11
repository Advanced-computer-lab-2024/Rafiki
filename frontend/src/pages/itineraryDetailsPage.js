import React, { useState } from "react";

const ItineraryDetails = ({ itinerary }) => {
  const [currency, setCurrency] = useState('USD');
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);
  const [isActive, setIsActive] = useState(itinerary.active); // State to track active status

  // Function to toggle the active state
  const toggleItineraryActiveState = async () => {
    try {
      // Simulate calling an API to update the active status (you can adjust it based on your backend)
      const response = await fetch(`/api/itinerary/${itinerary._id}/toggle`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Toggle the state locally if the update is successful
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

    // Set the conversion rate based on the selected currency
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
    <div className="workout-details">
      <h4>{itinerary.tourGuideUsername}</h4>
      <p><strong>Activities: </strong>{itinerary.activities}</p>
      <p><strong>Locations: </strong>{itinerary.locations}</p>
      <p><strong>Timeline: </strong>{itinerary.timeline}</p>
      <p><strong>Duration: </strong>{itinerary.duration}</p>
      <p><strong>Language: </strong>{itinerary.language}</p>
      <p><strong>Price: </strong>
        {currency} {(parseFloat(itinerary.price) * currencyMultiplier).toFixed(2)}
        <select value={currency} onChange={handleCurrencyChange} style={{ marginLeft: '10px' }}>
          <option value="USD">USD</option>
          <option value="EGP">EGP</option>
          <option value="EUR">EUR</option>
        </select>
      </p>
      <p><strong>Available Dates: </strong>{itinerary.availableDates}</p>
      <p><strong>Accessibility: </strong>{itinerary.accessibility}</p>
      <p><strong>Pickup Location: </strong>{itinerary.pickupLocation}</p>
      <p><strong>Drop Off Location: </strong>{itinerary.dropOffLocation}</p>
      <p>{itinerary.createdAt}</p>

      {/* Button to toggle active state */}
      <button onClick={toggleItineraryActiveState}>
        {isActive ? 'Deactivate Itinerary' : 'Activate Itinerary'}
      </button>

      <button onClick={copyLinkToClipboard}>Copy Itinerary Link</button>
      <button onClick={shareViaEmail}>Share via Email</button>
    </div>
  );
};

export default ItineraryDetails;
