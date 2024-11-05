import { useState } from 'react';
import PaymentForm from '../components/paymentForm';


const MuseumDetails = ({ museum}) => {
    const [isPaymentVisible, setIsPaymentVisible] = useState(false);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [selectedMuseum, setSelectedMuseum] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);
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
    const handlePaymentClickMuseum = (museum) => {
        setSelectedMuseum(museum);
        setSelectedItinerary(null);
        setSelectedActivity(null);
        setIsPaymentVisible(prev => !prev);
    };
    return (
      <div className="workout-details">
        <h4>{museum.name}</h4>
        <p><strong>Description: </strong>{museum.description}</p>
        <p><strong>Location: </strong>{museum.location}</p>
        <p><strong>Opening Hours: </strong>{museum.openingHours}</p>
        <p><strong> Ticket Price: </strong>
        {currency} {(parseFloat(museum.ticketPrices) * currencyMultiplier).toFixed(2)}
        <select value={currency} onChange={handleCurrencyChange} style={{ marginLeft: '10px' }}>
          <option value="USD">USD</option>
          <option value="EGP">EGP</option>
          <option value="EUR">EUR</option>
        </select>
      </p>
        <p><strong>Picture: </strong>{museum.pictures}</p>
        <p><strong>Tag: </strong>{museum.tag }</p>  
        {/* <button onClick={() => onEdit(museum)}>Edit</button>
        <button onClick={() => onDelete(museum._id)}>Delete</button> */}
        <button onClick={() => handlePaymentClickMuseum(museum)}>
        Pay for this Museum
        </button>
         {/* Render Payment Form if visible */}
        {isPaymentVisible && (
           <PaymentForm price={(selectedMuseum.ticketPrices * currencyMultiplier).toFixed(2)} />
        )}
      </div>
    );
  };
  
  export default MuseumDetails;
  