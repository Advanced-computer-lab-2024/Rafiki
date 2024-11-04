const TouristModel = require('../Models/Tourist'); // Import the Tourist model
const PaymentModel = require('../models/payment'); // Import the Payment model

// Function to determine badge level based on total points
const determineBadgeLevel = (points) => {
    if (points < 100000) {
        return "Level 1"; // Up to 100k points
    } else if (points < 200000) {
        return "Level 2"; // 100k to 200k points
    } else {
        return "Level 3"; // 200k points and above
    }
};

const processPayment = async (req, res) => {
    const { touristUsername, amountPaid } = req.body;

    // Validate input
    if (!touristUsername || !amountPaid || amountPaid <= 0) {
        return res.status(400).json({ message: 'Invalid input. Ensure that tourist username and a positive amount paid are provided.' });
    }

    try {
        // Find the tourist by username to check current loyalty points and badge level
        const updatedTourist = await TouristModel.findOne({ username: touristUsername });

        // Check if the tourist was found
        if (!updatedTourist) {
            return res.status(404).json({ message: 'Tourist not found.' });
        }

        // Calculate loyalty points based on the current badge level
        let pointsEarned;
        const currentPoints = updatedTourist.LoyaltyPoints; // Get current loyalty points
        const badgeLevel = determineBadgeLevel(currentPoints); // Determine current badge level

        // Calculate points based on badge level
        if (badgeLevel === "Level 1") {
            pointsEarned = amountPaid * 0.5; 
        } else if (badgeLevel === "Level 2") {
            pointsEarned = amountPaid * 1; 
        } else if (badgeLevel === "Level 3") {
            pointsEarned = amountPaid * 1.5; 
        } else {
            pointsEarned = 0; // Default if no badge level fits
        }

        // Create a payment record
        const payment = await PaymentModel.create({ touristUsername, amountPaid, pointsEarned });

        // Increment loyalty points and update badge level
        updatedTourist.LoyaltyPoints += pointsEarned; // Update loyalty points
        updatedTourist.BadgeLevel = determineBadgeLevel(updatedTourist.LoyaltyPoints); // Update badge level

        // Save updated tourist data
        await updatedTourist.save();

        // Respond with success message and payment details
        res.status(201).json({ 
            payment, 
            message: "Payment processed successfully.",
            newWalletBalance: updatedTourist.Wallet, // Assuming Wallet is where you store the balance
            badgeLevel: updatedTourist.BadgeLevel, // Include the new badge level in the response
            pointsEarned, // Include points earned from this payment
            totalPoints: updatedTourist.LoyaltyPoints // Include total loyalty points
        });
    } catch (error) {
        console.error('Error processing payment:', error); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { processPayment };
