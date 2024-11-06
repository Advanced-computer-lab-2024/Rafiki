import React, { useState } from 'react';

const RedemptionForm = ({ onClose }) => {
    const [touristUsername, setTouristUsername] = useState('');
    const [pointsToRedeem, setPointsToRedeem] = useState('');
    const [message, setMessage] = useState(null);

    const handleRedeemPoints = async () => {
        try {
            const response = await fetch('/api/redemption/redeem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    touristUsername, 
                    pointsToRedeem: parseInt(pointsToRedeem) 
                })
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(`Points redeemed successfully! Wallet Balance: ${result.newWalletBalance}, Remaining Points: ${result.remainingPoints}`);
            } else {
                setMessage(result.message || 'Failed to redeem points');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            console.error('Error redeeming points:', error);
        }
    };

    return (
        <div className="redemption-form">
            <h3>Redeem Points</h3>
            {message && <p>{message}</p>}
            <input
                type="text"
                placeholder="Username"
                value={touristUsername}
                onChange={(e) => setTouristUsername(e.target.value)}
            />
            <input
                type="number"
                placeholder="Points to redeem"
                value={pointsToRedeem}
                onChange={(e) => setPointsToRedeem(e.target.value)}
            />
            <button onClick={handleRedeemPoints}>Redeem</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default RedemptionForm;
