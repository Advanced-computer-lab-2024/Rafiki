import { useState } from 'react';
const ItineraryDetails = ({ itinerary }) => {
  const [currency, setCurrency] = useState('USD');
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);
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
        <p><strong>  Price: </strong>
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
      </div>
    )
  }
  
  export default ItineraryDetails;