import React, { useState, useEffect } from 'react';
import PaymentForm from '../components/paymentForm';

const ActivityDetails = ({ activity }) => {
    const [isPaymentVisible, setIsPaymentVisible] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [currency, setCurrency] = useState('USD');
    const [currencyMultiplier, setCurrencyMultiplier] = useState(1);
    const [tourists, setTourists] = useState([]);
    const [error, setError] = useState(null);
    const [isCancelable, setIsCancelable] = useState(false);

    // Fetch the list of tourists on component mount
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

    useEffect(() => {
        const activityDate = new Date(activity.date);
        const currentDate = new Date();
        const timeDifference = activityDate - currentDate;

        // Check if the activity date is more than 48 hours away
        setIsCancelable(timeDifference > 48 * 60 * 60 * 1000); // 48 hours in milliseconds
    }, [activity.date]);

    const attendActivity = async () => {
        const name = prompt("Please enter your name to attend the activity:");
        if (!name) {
            alert("Name is required to attend the activity.");
            return;
        }

        const tourist = tourists.find(t => t.Username.toLowerCase() === name.toLowerCase());
        if (!tourist) {
            alert("Tourist not found. Please ensure your name is correct.");
            return;
        }

        try {
            const response = await fetch(`/api/TouristRoute/attendActivity`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ touristId: tourist._id, activityId: activity._id })
            });
            if (response.ok) {
                alert("Activity attended successfully!");
            } else {
                alert("Failed to attend activity.");
            }
        } catch (error) {
            console.error("Error attending activity:", error);
        }
    };

    const handleIncrement = async () => {
        try {
            const response = await fetch(`/api/TouristRoute/${touristId}/inc`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const updatedTourist = await response.json();
                alert(`Booked. New number of booked activities: ${updatedTourist.BookedActivity}`);
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
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const updatedTourist = await response.json();
                    alert(`Booking Canceled. New number of booked activities: ${updatedTourist.BookedActivity}`);
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
            default:
                setCurrencyMultiplier(1);
        }
    };

    const handlePaymentClickActivity = () => {
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
            <button onClick={attendActivity}>Attend This Activity</button>
            <button onClick={handlePaymentClickActivity}>Pay for this Activity</button>
            
            {isPaymentVisible && (
                <PaymentForm price={(selectedActivity.price * currencyMultiplier).toFixed(2)} />
            )}

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
