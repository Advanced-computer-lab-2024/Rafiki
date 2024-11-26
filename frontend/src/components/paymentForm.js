import React, { useState } from 'react';

const PaymentForm = ({ price, paymentType, referenceId, tourists }) => {
    const [touristId, setTouristId] = useState('');
    const [amountPaid] = useState(price);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [badgeLevel, setBadgeLevel] = useState('');
    const [newWalletBalance, setNewWalletBalance] = useState('');
    const [pointsEarned, setPointsEarned] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);



    const handleTouristInput = () => {
        const name = prompt("Please enter your name to proceed with payment:");
        if (!name) {
            alert("Name is required to proceed with the payment.");
            return;
        }

        const tourist = tourists.find(t => t.Username.toLowerCase() === name.toLowerCase());
        if (!tourist) {
            alert("Tourist not found. Please ensure your name is correct.");
            return;
        }

        setTouristId(tourist._id); // Set the tourist ID based on the found tourist
    };


     const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset any previous messages
        setMessage('');
        setError('');

        if (!touristId) {
            alert("Please enter your name before submitting the payment.");
            return;
        }

        try {
            let endpoint = '';
            if (paymentType === 'Activity') {
                endpoint = '/api/payments/ActivityPayment';
            } else if (paymentType === 'Itinerary') {
                endpoint = '/api/payments/ItineraryPayment';
            } else if (paymentType === 'Museum') {
                endpoint = '/api/payments/MuseumPayment';
            } else {
                throw new Error('Invalid payment type specified.');
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    touristId,
                    amountPaid: parseFloat(amountPaid),
                    [`${paymentType.toLowerCase()}Id`]: referenceId, // Send the specific ID based on payment type
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'An error occurred');
            }

            const data = await response.json();

            // Update the UI with the response data
            setMessage(data.message);
            setBadgeLevel(data.badgeLevel);
            setNewWalletBalance(data.newWalletBalance);

            // Set points earned and total points directly from the backend response
            setPointsEarned(data.pointsEarned);
            setTotalPoints(data.totalPoints);

        } catch (err) {
            setError(err.message);
        }
    };




    return (
        <div>
           <h2>Process {paymentType} Payment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label><strong>Price:</strong> {price}</label>
                    <div>
                        {/* Button to trigger tourist name input */}
                        <button type="button" onClick={handleTouristInput}>
                            Enter Tourist Name
                        </button>
                    </div>
                    <label>Tourist ID: {touristId || 'Not entered yet'}</label>
                </div>
                
                <button type="submit">Submit Payment</button>
            </form>

            {/* Display success or error message */}
            {message && (
                <div>
                    <p>{message}</p>
                    <p>New Badge Level: {badgeLevel}</p>
                    <p>New Wallet Balance: ${newWalletBalance}</p>
                    <p>Points Earned This Payment: {pointsEarned}</p>
                    <p>Total Points: {totalPoints}</p>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default PaymentForm;
