import React, { useState, useEffect } from 'react';
import PaymentForm from '../components/paymentForm';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaClipboard, FaEnvelope, FaRegCheckCircle, FaDollarSign, FaPen, FaUndo } from 'react-icons/fa';

const ActivityDetails = ({ activity }) => {
    const [isPaymentVisible, setIsPaymentVisible] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [currency, setCurrency] = useState('USD');
    const [currencyMultiplier, setCurrencyMultiplier] = useState(1);
    const [tourists, setTourists] = useState([]);
    const [error, setError] = useState(null);
    const [isCancelable, setIsCancelable] = useState(false);
    const [walletBalance, setWalletBalance] = useState(null);
    const navigate = useNavigate();


    const touristId = '672fb758a2012fa8bfb34028'; // Fixed ID for the tourist

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

    const bookActivity = async () => {
        const { value: name } = await Swal.fire({
            title: 'Enter Your Name',
            input: 'text',
            inputLabel: 'Please enter your name to book the activity:',
            inputPlaceholder: 'Your Name',
            showCancelButton: true,
            confirmButtonText: 'Book Activity',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value) {
                    return 'Name is required!';
                }
            }
        });
    
        if (!name) {
            return; // User canceled the prompt
        }
    
        const tourist = tourists.find(t => t.Username.toLowerCase() === name.toLowerCase());
        if (!tourist) {
            Swal.fire({
                icon: 'error',
                title: 'Booking Failed',
                text: 'Tourist not found. Please double-check your name and try again.',
            });
            return;
        }
    
        try {
            const response = await fetch(`/api/TouristRoute/bookActivity`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ touristId: tourist._id, activityId: activity._id })
            });
    
            if (response.ok) {
                const { message, reminderMessage } = await response.json();
    
                Swal.fire({
                    icon: 'success',
                    title: 'Booking Successful',
                    html: `
                        <p>${message}</p>
                        <strong>Reminder:</strong>
                        <p>${reminderMessage}</p>
                    `,
                });
            } else {
                const errorResponse = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorResponse.message || 'Failed to book the activity.',
                });
            }
        } catch (error) {
            console.error('Error booking activity:', error);
            Swal.fire({
                icon: 'error',
                title: 'Unexpected Error',
                text: 'An unexpected error occurred while booking the activity. Please try again later.',
            });
        }
    };
    

    const cancelActivityBooking = async () => {
        const name = prompt("Please enter your name to cancel the booking of the activity:");
        if (!name) {
            alert("Name is required to cancel the booking of the activity.");
            return;
        }
    
        const tourist = tourists.find(t => t.Username.toLowerCase() === name.toLowerCase());
        if (!tourist) {
            alert("Tourist not found. Please ensure your name is correct.");
            return;
        }
    
        try {
            const response = await fetch(`/api/TouristRoute/cancelActivityBooking`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ touristId: tourist._id, activityId: activity._id })
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log("Response:", result);
    
                // Handle each case based on the backend response
                if (result.message.includes("Refund issued")) {
                    alert(`${result.message}\nNew Wallet Balance: ${result.newWalletBalance}`);
                    setWalletBalance(result.newWalletBalance); // Update wallet balance in the UI
                } else if (result.message.includes("Activity booking canceled successfully")) {
                    alert(result.message); // Booked but not paid
                } else if (result.message.includes("This activity is neither booked nor paid for")) {
                    alert(result.message); // Not booked or paid
                } else {
                    alert("Unexpected response: " + result.message);
                }
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Failed to cancel the booking of the activity.");
            }
        } catch (error) {
            console.error("Error canceling the booking of the activity:", error);
            alert("An error occurred while trying to cancel the activity booking.");
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
        setSelectedActivity(activity);  // Store the selected activity
        setIsPaymentVisible(prev => !prev);  // Toggle payment visibility
        navigate(`/ActivityCheckout/${activity._id}`);  // Navigate with the activity ID in the URL
    };
    

    return (
        <div className="workout-details p-6 bg-white rounded-lg shadow-lg">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">Activity Details</h4>
            
            {/* Display activity details */}
            <div className="text-gray-700 mb-4 space-y-2">
                <p><strong>Date:</strong> {activity.date}</p>
                <p><strong>Time:</strong> {activity.time}</p>
                <p><strong>Location:</strong> {activity.location}</p>
                <p><strong>Price:</strong> 
                    {currency} {(activity.price * currencyMultiplier).toFixed(2)}
                    <select 
                        value={currency} 
                        onChange={handleCurrencyChange} 
                        className="ml-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="USD">USD</option>
                        <option value="EGP">EGP</option>
                        <option value="EUR">EUR</option>
                    </select>
                </p>
                <p><strong>Category:</strong> {activity.category}</p>
                <p><strong>Tags:</strong> {activity.tags}</p>
                <p><strong>Special Discounts:</strong> {activity.specialDiscounts}</p>
                <p><strong>Booking Open:</strong> {activity.isBookingOpen ? 'Yes' : 'No'}</p>
            </div>
    
            {/* Action buttons */}
            <div className="space-y-3">
                <div className="flex gap-2">
                    <button
                        onClick={copyLinkToClipboard}
                        className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                    >
                        <FaClipboard /> Copy Link
                    </button>
                    <button
                        onClick={shareViaEmail}
                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        <FaEnvelope /> Share via Email
                    </button>
                </div>
    
                <div className="flex gap-2">
                    <button
                        onClick={attendActivity}
                        className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                    >
                        <FaRegCheckCircle /> Attend Activity
                    </button>
                    <button
                        onClick={handlePaymentClickActivity}
                        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                        <FaDollarSign /> Pay for Activity
                    </button>
                </div>
            </div>
    
            {isPaymentVisible && (
                <PaymentForm
                    price={(selectedActivity.price * currencyMultiplier).toFixed(2)}
                    tourists={tourists}
                    paymentType="Activity"
                    referenceId={activity._id}
                />
            )}
    
            {/* Booking and cancellation buttons */}
            <div className="mt-4 flex gap-2">
                <button
                    onClick={bookActivity}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    <FaPen /> Book Activity
                </button>
                <button
                    onClick={cancelActivityBooking}
                    disabled={!isCancelable}
                    className={`flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition ${
                        !isCancelable ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    <FaUndo /> Cancel Booking
                </button>
            </div>
    
            {/* Wallet balance */}
            {walletBalance !== null && (
                <p className="mt-4 text-gray-700">
                    <strong>Updated Wallet Balance:</strong> {walletBalance}
                </p>
            )}
    
            {/* Error message */}
            {error && (
                <p className="text-red-600 mt-4">
                    <strong>Error:</strong> {error}
                </p>
            )}
    
            {/* Cancellation restriction message */}
            {!isCancelable && (
                <p className="text-red-500 mt-4">
                    Booking cancellation is only allowed more than 48 hours in advance.
                </p>
            )}
        </div>
    );
}    
export default ActivityDetails;