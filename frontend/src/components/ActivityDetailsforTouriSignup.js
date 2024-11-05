import React from 'react';
import { useState } from 'react';
import PaymentForm from '../components/paymentForm';

const ActivityDetails = ({ activity }) => {
    const [isPaymentVisible, setIsPaymentVisible] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);
  
  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/tourist-signup/`;
    navigator.clipboard.writeText(link)
      .then(() => alert('Link copied to clipboard!'))
      .catch(error => console.error("Failed to copy link:", error));
  };
  const shareViaEmail = () => {
    const link = `${window.location.origin}/tourist-signup/`;
    window.location.href = `mailto:?subject=Check%20out%20this%20activity&body=Here%20is%20an%20activity%20I%20found:%20${link}`;
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

  const handlePaymentClickActivity = (activity) => {
    setSelectedActivity(activity);

    setIsPaymentVisible(prev => !prev);
    };
  return (
    <div className="workout-details">
      <h4>Activity Details</h4>
      <p><strong>Date: </strong>{activity.date}</p>
      <p><strong>Time: </strong>{activity.time}</p>
      <p><strong>Location: </strong> {activity.location}</p>
      <p><strong>Price: </strong>
        {currency} {(activity.price * currencyMultiplier).toFixed(2)}
        <select value={currency} onChange={handleCurrencyChange} style={{ marginLeft: '10px' }}>
          <option value="USD">USD</option>
          <option value="EGP">EGP</option>
          <option value="EUR">EUR</option>
        </select>
      </p>
      <p><strong>Category: </strong>{activity.category}</p>
      <p><strong>Tags: </strong>{activity.tags}</p>
      <p><strong>Special Discounts: </strong>{activity.specialDiscounts}</p>
      <p><strong>Booking Open: </strong>{activity.isBookingOpen ? 'Yes' : 'No'}</p>
      {/* Copy Link Button */}
      <button onClick={copyLinkToClipboard}>Copy Activity Link</button>
      <button onClick={shareViaEmail}>Share via Email</button>
      <div></div>
      <button onClick={() => handlePaymentClickActivity(activity)}>
        Pay for this Activity
        </button>
         {/* Render Payment Form if visible */}
        {isPaymentVisible && (
           <PaymentForm price={(selectedActivity.price * currencyMultiplier).toFixed(2)} />
        )}
    </div>
  );
};

export default ActivityDetails;
