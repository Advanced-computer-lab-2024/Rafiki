// controllers/redemptionController.js
const TouristModel = require('../Models/Tourist');

const redeemPoints = async (req, res) => {
    const { touristUsername, pointsToRedeem } = req.body;

    // Validate input
    if (!touristUsername || !pointsToRedeem || pointsToRedeem <= 0) {
        return res.status(400).json({ message: 'Invalid input. Ensure that tourist username and points to redeem are provided.' });
    }

    try {
        // Find the tourist by username
        const tourist = await TouristModel.findOne({ username: touristUsername });

        // Check if the tourist was found and has enough points
        if (!tourist) {
            return res.status(404).json({ message: 'Tourist not found.' });
        }
        if (tourist.LoyaltyPoints < pointsToRedeem) {
            return res.status(400).json({ message: 'Not enough loyalty points to redeem.' });
        }

        // Calculate cash equivalent and update wallet balance
        const cashEquivalent = pointsToRedeem / 100; 
        tourist.LoyaltyPoints -= pointsToRedeem; // Deduct redeemed points
        tourist.Wallet += cashEquivalent; // Add cash to wallet

        // Save updated tourist data
        await tourist.save();

        res.status(200).json({
            message: 'Points redeemed successfully.',
            cashEquivalent,
            newWalletBalance: tourist.Wallet,
            remainingPoints: tourist.LoyaltyPoints,
        });
    } catch (error) {
        console.error('Error redeeming points:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { redeemPoints };
