import React, { useState } from 'react';

const PaymentForm = () => {
    const [touristUsername, setTouristUsername] = useState('');
    const [amountPaid, setAmountPaid] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [badgeLevel, setBadgeLevel] = useState('');
    const [newWalletBalance, setNewWalletBalance] = useState('');
    const [pointsEarned, setPointsEarned] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset any previous messages
        setMessage('');
        setError('');

        try {
            const response = await fetch('/api/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    touristUsername,
                    amountPaid: parseFloat(amountPaid),
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
            <h2>Process Payment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tourist Username:</label>
                    <input 
                        type="text"
                        value={touristUsername}
                        onChange={(e) => setTouristUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Amount Paid:</label>
                    <input 
                        type="number"
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(e.target.value)}
                        required
                        min="0.01"
                        step="0.01"
                    />
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
