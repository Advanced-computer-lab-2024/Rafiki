import React, { useState, useEffect } from 'react';
import PaymentForm from '../components/paymentForm';
import { FaDollarSign, FaClipboard, FaEnvelope, FaRegCheckCircle, FaTimesCircle, FaPen, FaUndo } from 'react-icons/fa';

const ItineraryDetails = ({ itinerary }) => {
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);
  const [error, setError] = useState(null);
  const [isCancelable, setIsCancelable] = useState(false);
  const [tourists, setTourists] = useState([]);
  const [walletBalance, setWalletBalance] = useState(null);

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
        const { message, reminderMessage } = await response.json();

          alert(reminderMessage);
      } else {
          alert("Failed to book itinerary.");
      }
  } catch (error) {
      console.error("Error booking itinerary:", error);
  }
};

const cancelItineraryBooking = async () => {
  const name = prompt("Please enter your name to cancel the booking of the itinerary:");
  if (!name) {
      alert("Name is required to cancel the booking of the itinerary.");
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
        const result = await response.json();
        console.log("Response:", result);

        // Handle each case based on the backend response
        if (result.message.includes("Refund issued")) {
            alert(`${result.message}\nNew Wallet Balance: ${result.newWalletBalance}`);
            setWalletBalance(result.newWalletBalance); // Update wallet balance in the UI
        } else if (result.message.includes("Itinerary booking canceled successfully")) {
            alert(result.message); // Booked but not paid
        } else if (result.message.includes("This itinerary is neither booked nor paid for")) {
            alert(result.message); // Not booked or paid
        } else {
            alert("Unexpected response: " + result.message);
        }
    } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to cancel the booking of the itinerary.");
    }
} catch (error) {
    console.error("Error canceling the booking of the itinerary:", error);
    alert("An error occurred while trying to cancel the itinerary booking.");
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
    <div className="workout-details p-6 bg-white rounded-lg shadow-md">
        {itinerary.active ? (
            <>
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">{itinerary.tourGuideUsername}</h4>

                {/* Display itinerary details */}
                <div className="text-gray-700 mb-4">
                    <p><strong>Activities:</strong> {itinerary.activities}</p>
                    <p><strong>Locations:</strong> {itinerary.locations}</p>
                    <p><strong>Timeline:</strong> {itinerary.timeline}</p>
                    <p><strong>Duration:</strong> {itinerary.duration} hours</p>
                    <p><strong>Language:</strong> {itinerary.language}</p>
                    <p><strong>Price:</strong> {currency} {(parseFloat(itinerary.price) * currencyMultiplier).toFixed(2)}</p>
                    <p><strong>Available Dates:</strong> {itinerary.availableDates}</p>
                    <p><strong>Accessibility:</strong> {itinerary.accessibility}</p>
                    <p><strong>Pickup Location:</strong> {itinerary.pickupLocation}</p>
                    <p><strong>Drop Off Location:</strong> {itinerary.dropOffLocation}</p>
                </div>

                {/* Currency selection */}
                <div className="mb-4">
                    <select
                        value={currency}
                        onChange={handleCurrencyChange}
                        className="p-2 border rounded-md"
                    >
                        <option value="USD">USD</option>
                        <option value="EGP">EGP</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>

                {/* Payment and booking actions */}
                <div className="flex flex-wrap gap-4 mb-4">
                    <button
                        onClick={() => handlePaymentClickItinerary(itinerary)}
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        <FaDollarSign className="mr-2" /> Pay for Itinerary
                    </button>

                    <button
                        onClick={bookItinerary}
                        className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                        <FaPen className="mr-2" /> Book Itinerary
                    </button>

                    <button
                        onClick={cancelItineraryBooking}
                        disabled={!isCancelable}
                        className={`flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition ${
                            !isCancelable ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        <FaUndo className="mr-2" /> Cancel Booking
                    </button>
                </div>

                {isPaymentVisible && (
                    <PaymentForm
                        price={(selectedItinerary.price * currencyMultiplier).toFixed(2)}
                        tourists={tourists}
                        paymentType="Itinerary"
                        referenceId={itinerary._id}
                    />
                )}

                {walletBalance !== null && (
                    <p className="mt-4"><strong>Updated Wallet Balance:</strong> {walletBalance}</p>
                )}

                {/* Copy, attend, and share actions */}
                <div className="flex flex-wrap gap-4 mt-4">
                    <button
                        onClick={copyLinkToClipboard}
                        className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                    >
                        <FaClipboard className="mr-2" /> Copy Itinerary Link
                    </button>

                    <button
                        onClick={attendItinerary}
                        className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                    >
                        <FaRegCheckCircle className="mr-2" /> Attend Itinerary
                    </button>

                    <button
                        onClick={shareViaEmail}
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        <FaEnvelope className="mr-2" /> Share via Email
                    </button>
                </div>

                {error && <p className="error text-red-600 mt-4">{error}</p>}
                {!isCancelable && (
                    <p className="text-red-500 mt-4">Booking cancellation is only allowed more than 48 hours in advance.</p>
                )}
            </>
        ) : (
            <p className="text-gray-500">This itinerary is no longer active.</p>
        )}
    </div>
);
}
export default ItineraryDetails;
