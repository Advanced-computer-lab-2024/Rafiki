import React, { useState, useEffect } from 'react';
import PaymentForm from '../components/paymentForm';

const ItineraryDetails = ({ itinerary }) => {
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);
  const [error, setError] = useState(null);
  const [isCancelable, setIsCancelable] = useState(false);
  const [tourists, setTourists] = useState([]);

  const touristId = '672fb758a2012fa8bfb34028'; // Fixed ID for the tourist
  useEffect(() => {
    const fetchTourists = async () => {
        try {
            const response = await fetch('/api/TouristRoute');
            if (response.ok) {
                const data = await response.json();
                setTourists(data);
            }
        } catch (error) {
            console.error("Error fetching tourists:", error);
        }
    };
    fetchTourists();
}, []);
  const attendItinerary = async () => {
    const name = prompt("Please enter your name to attend the Itinerary:");
    if (!name) {
        alert("Name is required to attend the Itinerary.");
        return;
    }

    const tourist = tourists.find(t => t.Username.toLowerCase() === name.toLowerCase());
    if (!tourist) {
        alert("Tourist not found. Please ensure your name is correct.");
        return;
    }

    try {
        const response = await fetch(`/api/TouristRoute/attendItinerary`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ touristId: tourist._id, itineraryId: itinerary._id })
        });
        if (response.ok) {
            alert("Itinerary attended successfully!");
        } else {
            alert("Failed to attend itinerary.");
        }
    } catch (error) {
        console.error("Error attending itinerary:", error);
    }
};

const bookItinerary = async () => {
  const name = prompt("Please enter your name to book the Itinerary:");
  if (!name) {
      alert("Name is required to book the Itinerary.");
      return;
  }

  const tourist = tourists.find(t => t.Username.toLowerCase() === name.toLowerCase());
  if (!tourist) {
      alert("Tourist not found. Please ensure your name is correct.");
      return;
  }

  try {
      const response = await fetch(`/api/TouristRoute/bookItinerary`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ touristId: tourist._id, itineraryId: itinerary._id })
      });
      if (response.ok) {
          alert("Itinerary booked successfully!");
      } else {
          alert("Failed to book itinerary.");
      }
  } catch (error) {
      console.error("Error booking itinerary:", error);
  }
};

const cancelItineraryBooking = async () => {
  const name = prompt("Please enter your name to cancel the booking of the Itinerary:");
  if (!name) {
      alert("Name is required to cancel the booking of the Itinerary.");
      return;
  }

  const tourist = tourists.find(t => t.Username.toLowerCase() === name.toLowerCase());
  if (!tourist) {
      alert("Tourist not found. Please ensure your name is correct.");
      return;
  }

  try {
      const response = await fetch(`/api/TouristRoute/cancelItineraryBooking`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ touristId: tourist._id, itineraryId: itinerary._id })
      });
      if (response.ok) {
          alert("Canceled the booking of the Itinerary successfully!");
      } else {
          alert("Failed to cancel the booking of the Itinerary .");
      }
  } catch (error) {
      console.error("Error canceling the booking of the Itinerary:", error);
  }
};

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/itinerary/${itinerary._id}`;
    navigator.clipboard.writeText(link)
      .then(() => alert('Link copied to clipboard!'))
      .catch(error => console.error("Failed to copy link:", error));
  };
  const shareViaEmail = () => {
    const link = `${window.location.origin}/itineraries/${itinerary._id}`;
    window.location.href = `mailto:?subject=Check%20out%20this%20itinerary&body=Here%20is%20an%20itinerary%20I%20found:%20${link}`;
  };

  useEffect(() => {
    const itineraryDate = new Date(itinerary.availableDates); // Assuming `availableDates` is the itinerary date
    const currentDate = new Date();
    const timeDifference = itineraryDate - currentDate;

    // Check if the itinerary date is more than 48 hours away
    setIsCancelable(timeDifference > 48 * 60 * 60 * 1000); // 48 hours in milliseconds
  }, [itinerary.availableDates]);

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

  const handlePaymentClickItinerary = (itinerary) => {
    setSelectedItinerary(itinerary);
    setIsPaymentVisible(prev => !prev);
  };

  return (
    <div className="workout-details">
       {itinerary.active ? (
      <>
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
      <button onClick={() => handlePaymentClickItinerary(itinerary)}>
        Pay for this Itinerary
      </button>
      {isPaymentVisible && (
                <PaymentForm 
                    price={(selectedItinerary.price * currencyMultiplier).toFixed(2)} 
                    tourists={tourists} 
                    paymentType="Itinerary" 
                    referenceId={itinerary._id}
                />
            )}
      {/* Increment and Decrement Buttons */}
      <button onClick={bookItinerary}>Book Itinerary</button>
      <button onClick={cancelItineraryBooking} disabled={!isCancelable}>
        Cancel Booking
      </button>
      <button onClick={copyLinkToClipboard}>Copy Itienary Link</button>
      <button onClick={attendItinerary}>Attend This Itinerary</button>
      <button onClick={shareViaEmail}>Share via Email</button>
      {error && <p className="error">{error}</p>}
      {!isCancelable && (
        <p className="error">Booking cancellation is only allowed more than 48 hours in advance.</p>
      )}
        </>
    ) : (
      <p>This itinerary is no longer active.</p>
    )}
    </div>
  );
};

export default ItineraryDetails;
