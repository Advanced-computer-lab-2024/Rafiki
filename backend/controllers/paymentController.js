const TouristModel = require('../models/Tourist'); // Import the Tourist model
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

const processActivityPayment = async (req, res) => {
    const { touristId, activityId, amountPaid } = req.body

    // Validate input
    if (!touristId || !activityId || !amountPaid || amountPaid <= 0) {
        return res.status(400).json({ message: 'Invalid input. Ensure all fields are filled correctly.' });
      }

      try {
        // Find the tourist
        const tourist = await TouristModel.findById(touristId);
        if (!tourist) {
          return res.status(404).json({ message: 'Tourist not found.' });
        }
    

        // Calculate loyalty points based on the current badge level
        let pointsEarned;
        const currentPoints = tourist.LoyaltyPoints; // Get current loyalty points
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
        const payment = await PaymentModel.create({
            touristId,
            amountPaid,
            pointsEarned,
            paymentType: 'Activity',
            referenceId: activityId,
          });

        // Increment loyalty points and update badge level
        tourist.LoyaltyPoints += pointsEarned; // Update loyalty points
        tourist.BadgeLevel = determineBadgeLevel(tourist.LoyaltyPoints); // Update badge level

        // Save updated tourist data
        await tourist.save();


         // Update attended activities
    await TouristModel.findByIdAndUpdate(
        touristId,
        { $addToSet: { paidActivities: activityId } }, // Add the activity to the list
        { new: true }
      );
  
        // Respond with success message and payment details
        res.status(201).json({ 
            payment, 
            message: " Activity Payment processed successfully.",
            newWalletBalance: tourist.Wallet, // Assuming Wallet is where you store the balance
            badgeLevel: tourist.BadgeLevel, // Include the new badge level in the response
            pointsEarned, // Include points earned from this payment
            totalPoints: tourist.LoyaltyPoints // Include total loyalty points
        });
    } catch (error) {
        console.error('Error processing Activity payment:', error); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error.' });
    }
};


const processItineraryPayment = async (req, res) => {
    const { touristId, itineraryId, amountPaid } = req.body;

  if (!touristId || !itineraryId || !amountPaid || amountPaid <= 0) {
    return res.status(400).json({ message: 'Invalid input. Ensure all fields are filled correctly.' });
  }


      try {
        // Find the tourist
        const tourist = await TouristModel.findById(touristId);
        if (!tourist) {
          return res.status(404).json({ message: 'Tourist not found.' });
        }
    

        // Calculate loyalty points based on the current badge level
        let pointsEarned;
        const currentPoints = tourist.LoyaltyPoints; // Get current loyalty points
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
        const payment = await PaymentModel.create({
            touristId,
            amountPaid,
            pointsEarned,
            paymentType: 'Itinerary',
            referenceId: itineraryId,
          });

        // Increment loyalty points and update badge level
        tourist.LoyaltyPoints += pointsEarned; // Update loyalty points
        tourist.BadgeLevel = determineBadgeLevel(tourist.LoyaltyPoints); // Update badge level

        // Save updated tourist data
        await tourist.save();


         // Update attended activities
    await TouristModel.findByIdAndUpdate(
        touristId,
        { $addToSet: { paidItineraries: itineraryId  } }, // Add the activity to the list
        { new: true }
      );
  
        // Respond with success message and payment details
        res.status(201).json({ 
            payment, 
            message: " Itinerary Payment processed successfully.",
            newWalletBalance: tourist.Wallet, // Assuming Wallet is where you store the balance
            badgeLevel: tourist.BadgeLevel, // Include the new badge level in the response
            pointsEarned, // Include points earned from this payment
            totalPoints: tourist.LoyaltyPoints // Include total loyalty points
        });
    } catch (error) {
        console.error('Error processing itinerary payment:', error); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error.' });
    }
};



const processMuseumPayment = async (req, res) => {
    const { touristId, museumId, amountPaid } = req.body;

    if (!touristId || !museumId || !amountPaid || amountPaid <= 0) {
      return res.status(400).json({ message: 'Invalid input. Ensure all fields are filled correctly.' });
    }

      try {
        // Find the tourist
        const tourist = await TouristModel.findById(touristId);
        if (!tourist) {
          return res.status(404).json({ message: 'Tourist not found.' });
        }
    

        // Calculate loyalty points based on the current badge level
        let pointsEarned;
        const currentPoints = tourist.LoyaltyPoints; // Get current loyalty points
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
        const payment = await PaymentModel.create({
      touristId,
      amountPaid,
      pointsEarned,
      paymentType: 'Museum',
      referenceId: museumId,
    });

        // Increment loyalty points and update badge level
        tourist.LoyaltyPoints += pointsEarned; // Update loyalty points
        tourist.BadgeLevel = determineBadgeLevel(tourist.LoyaltyPoints); // Update badge level

        // Save updated tourist data
        await tourist.save();

        await TouristModel.findByIdAndUpdate(
            touristId,
            { $addToSet: { BookedMuseums: museumId } }, // Add the activity to the list
            { new: true }
          );
      
        
  
        // Respond with success message and payment details
        res.status(201).json({ 
            payment, 
            message: " Museum Payment processed successfully.",
            newWalletBalance: tourist.Wallet, // Assuming Wallet is where you store the balance
            badgeLevel: tourist.BadgeLevel, // Include the new badge level in the response
            pointsEarned, // Include points earned from this payment
            totalPoints: tourist.LoyaltyPoints // Include total loyalty points
        });
    } catch (error) {
        console.error('Error processing Museum payment:', error); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error.' });
    }
};    


module.exports = {  processActivityPayment, processItineraryPayment,  processMuseumPayment };