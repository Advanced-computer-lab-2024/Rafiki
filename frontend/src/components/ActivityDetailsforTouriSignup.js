import React, { useState, useEffect } from 'react';
import PaymentForm from '../components/paymentForm';

const ActivityDetails = ({ activity }) => {
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);
  const [error, setError] = useState(null);
  const [isCancelable, setIsCancelable] = useState(false);

  const touristId = '672fb758a2012fa8bfb34028'; // Fixed ID for the tourist

  useEffect(() => {
    const activityDate = new Date(activity.date);
    const currentDate = new Date();
    const timeDifference = activityDate - currentDate;

    // Check if the activity date is more than 48 hours away
    setIsCancelable(timeDifference > 48 * 60 * 60 * 1000); // 48 hours in milliseconds
  }, [activity.date]);

  const handleIncrement = async () => {
    try {
      const response = await fetch(`/api/TouristRoute/${touristId}/inc`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedTourist = await response.json();
        alert(`Booked .New number of booked activties ${updatedTourist.BookedActivity}`);
      } else {
        const json = await response.json();
        setError(json.error || 'Failed to increment BookedActivity');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to increment BookedActivity');
    }
  };

  const handleDecrement = async () => {
    if (isCancelable) {
      try {
        const response = await fetch(`/api/TouristRoute/${touristId}/dec`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const updatedTourist = await response.json();
          alert(`Booking Canceled .New number of booked activties ${updatedTourist.BookedActivity}`);
        } else {
          const json = await response.json();
          setError(json.error || 'Failed to decrement BookedActivity');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to decrement BookedActivity');
      }
    } else {
      alert('Booking cancellation is only allowed more than 48 hours in advance.');
    }
  };

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
      <button onClick={copyLinkToClipboard}>Copy Activity Link</button>
      <button onClick={shareViaEmail}>Share via Email</button>
      <div></div>
      <button onClick={() => handlePaymentClickActivity(activity)}>
        Pay for this Activity
      </button>
      {isPaymentVisible && (
        <PaymentForm price={(selectedActivity.price * currencyMultiplier).toFixed(2)} />
      )}
      {/* Increment and Decrement Buttons */}
      <button onClick={handleIncrement}>Book Activity</button>
      <button onClick={handleDecrement} disabled={!isCancelable}>
        Cancel Booking
      </button>
      {error && <p className="error">{error}</p>}
      {!isCancelable && (
        <p className="error">Booking cancellation is only allowed more than 48 hours in advance.</p>
      )}
    </div>
  );
};

export default ActivityDetails;
