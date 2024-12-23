const TouristModel = require('../models/Tourist'); // Import the Tourist model
const PaymentModel = require('../models/payment'); // Import the Payment model
const ActivityModel = require('../models/activity')
const ItineraryModel = require('../models/itinerary')

const MuseumModel = require('../models/museum')
const nodemailer = require('nodemailer');


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
      const activity = await ActivityModel.findById(activityId);

      const subject = `Reminder: Upcoming Event - ${activity.name || activity.location}`;
      const message = `Dear ${tourist.Username},\n\nYou have succesfully paid, This is a reminder for your upcoming event at ${activity.location || activity.pickupLocation} on ${activity.date || activity.availableDates[0]}.\n\nThank you!`;
      sendNotificationEmail(tourist.Email, subject, message);

        // Respond with success message and payment details
        res.status(201).json({ 
            payment, 
            message:` Dear ${tourist.Username},\n\nYou have succesfully paid, This is a reminder for your upcoming event at ${activity.location || activity.pickupLocation} on ${activity.date || activity.availableDates[0]}.\n\nThank you!`,
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

      const itinerary = await ItineraryModel.findById(itineraryId);

      const subject = `Reminder: Upcoming Event - ${itinerary.name || itinerary.location}`;
      const message = `Dear ${tourist.Username},\n\nYou have succesfully paid, This is a reminder for your upcoming event at ${itinerary.location || itinerary.pickupLocation} on ${itinerary.date || itinerary.availableDates[0]}.\n\nThank you!`;
      sendNotificationEmail(tourist.Email, subject, message);

        // Respond with success message and payment details
        res.status(201).json({ 
            payment, 
            message: `Dear ${tourist.Username},\n\nYou have succesfully paid, This is a reminder for your upcoming event at ${itinerary.location || itinerary.pickupLocation} on ${itinerary.date || itinerary.availableDates[0]}.\n\nThank you!`,
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

          const museum = await MuseumModel.findById(museumId);

      const subject = `Reminder: Upcoming Event - ${museum.name }`;
      const message = `Dear ${tourist.Username},\n\nYou have succesfully paid, This is a reminder for your upcoming event at ${museum.location || museum.pickupLocation} on ${museum.openingHours }.\n\nThank you!`;
      sendNotificationEmail(tourist.Email, subject, message);
      
        
  
        // Respond with success message and payment details
        res.status(201).json({ 
            payment, 
            message: `Dear ${tourist.Username},\n\nYou have succesfully paid, This is a reminder for your upcoming event at ${museum.location || museum.pickupLocation} on ${museum.openingHours}.\n\nThank you!`,
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


const transporter = nodemailer.createTransport({
    service: 'gmail', // Use the email service you're working with
    auth: {
      user: 'rafiki.info1@gmail.com', 
      pass: 'hsyotajsdxtetmbw',
    },
  });
  
  const sendNotificationEmail = (email, subject, message) => {
    const mailOptions = {
      from: 'rafiki.info1@gmail.com',
      to: email,
      subject: subject,
      text: message
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(`Error sending email to ${email}:`, error);
      } else {
        console.log(`Email sent to ${email}:`, info.response);
      }
    });
  };
  const stripe = require('stripe')('sk_test_51QRh7PGXzdUVHQQyTgtko5AeprJrNz2pktOY2eZGnEeH7YMHKnueJnmNX9bj3oDs7Df8q9tP0b2XvAG89Op5LHj100SP2FKXmj'); // Replace with your secret key

  // Controller to create a Payment Intent
  const createPaymentIntent = async (req, res) => {
    try {
        const { amount, paymentMethod, address } = req.body;

        // Log received amount and payment method
        console.log("Received amount (in cents):", amount);
        console.log("Received payment method:", paymentMethod);

        // Validate amount
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Invalid or missing amount.' });
        }

        // Validate that paymentMethod is provided
        if (!paymentMethod) {
            return res.status(400).json({ error: 'Payment method is required.' });
        }

        // Create a payment intent with the provided amount
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Amount in cents
            currency: 'usd',
            payment_method: paymentMethod,  // Hardcoded payment method for now
            payment_method_types: ['card'],
            confirm: true,  // Confirm immediately for simple flows
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,  // Send the client secret to the frontend
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: error.message });
    }
};

const getWalletBalance = async (req, res) => {
  const { username } = req.params;  // Extract the username from the request params

  try {
      // Find the tourist by username
      const tourist = await TouristModel.findOne({ Name: username });

      // If no tourist is found, return an error
      if (!tourist) {
          return res.status(404).json({ message: 'Tourist not found' });
      }

      // Respond with the wallet balance
      res.status(200).json({
          balance: tourist.Wallet,  // Send the wallet balance
      });
  } catch (error) {
      console.error("Error fetching wallet balance:", error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = {  processActivityPayment, processItineraryPayment,  processMuseumPayment,createPaymentIntent,getWalletBalance };