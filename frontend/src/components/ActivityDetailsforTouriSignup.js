import React, { useState, useEffect } from 'react';
import PaymentForm from '../components/paymentForm';

const ActivityDetails = ({ activity }) => { // Removed `touristId` prop
    const [isPaymentVisible, setIsPaymentVisible] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [currency, setCurrency] = useState('USD');
    const [currencyMultiplier, setCurrencyMultiplier] = useState(1);
    const [tourists, setTourists] = useState([]);

    // Fetch the list of tourists on component mount
    useEffect(() => {
        const fetchTourists = async () => {
            try {
                const response = await fetch('/api/TouristRoute'); // Adjusted endpoint
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

    const attendActivity = async () => {
        // Prompt for tourist's name
        const name = prompt("Please enter your name to attend the activity:");

        if (!name) {
            alert("Name is required to attend the activity.");
            return;
        }

        // Check if the entered name matches any tourist
        const tourist = tourists.find(t => t.Username.toLowerCase() === name.toLowerCase());

        if (!tourist) {
            alert("Tourist not found. Please ensure your name is correct.");
            return;
        }

        // Proceed with attendance if the tourist is valid
        try {
            const response = await fetch(`/api/TouristRoute/attendActivity`, { // Adjusted endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
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
            
            {/* Actions */}
            <button onClick={copyLinkToClipboard}>Copy Activity Link</button>
            <button onClick={shareViaEmail}>Share via Email</button>
            <button onClick={attendActivity}>Attend This Activity</button>
            
            <button onClick={handlePaymentClickActivity}>
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
