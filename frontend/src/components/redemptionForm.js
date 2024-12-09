import React, { useState } from 'react';
import './RedemptionForm.css'; // Import custom CSS for styling

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
        <div className="redemption-form-container">
            <div className="redemption-form">
                <h3 className="form-title">Redeem Points</h3>
                {message && <p className="message">{message}</p>}
                <div className="input-group">
                    <label htmlFor="touristUsername" className="input-label">Username:</label>
                    <input
                        id="touristUsername"
                        type="text"
                        className="input-field"
                        placeholder="Enter your username"
                        value={touristUsername}
                        onChange={(e) => setTouristUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="pointsToRedeem" className="input-label">Points to Redeem:</label>
                    <input
                        id="pointsToRedeem"
                        type="number"
                        className="input-field"
                        placeholder="Enter points"
                        value={pointsToRedeem}
                        onChange={(e) => setPointsToRedeem(e.target.value)}
                    />
                </div>
                <div className="form-buttons">
                    <button className="redeem-button" onClick={handleRedeemPoints}>Redeem</button>
                    <button className="close-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default RedemptionForm;
