const ItineraryModel = require('../models/itinerary'); 
const Tourguide = require('../models/Tourguide');
const nodemailer = require('nodemailer');

// Create Itinerary
const createItinerary = async (req, res) => {
    const { tourGuideUsername, activities, locations, timeline, duration, language, price, availableDates, accessibility, pickupLocation, dropOffLocation,active } = req.body;

    try {
        const tourGuide = await Tourguide.findOne({ Username: tourGuideUsername });
        if (!tourGuide) {
            return res.status(404).json({ message: 'Tour guide not found.' });
        }

        const newItinerary = await ItineraryModel.create({
            tourGuideId: tourGuide._id,
            activities,
            locations,
            timeline,
            duration,
            language,
            price,
            availableDates,
            accessibility,
            pickupLocation,
            dropOffLocation,
            active,
        });

        res.status(201).json(newItinerary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const toggleItineraryActiveState = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the itinerary by ID
        const itinerary = await ItineraryModel.findById(id);
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found." });
        }

        // Toggle the active state
        itinerary.active = !itinerary.active;

        // Save the updated itinerary
        const updatedItinerary = await itinerary.save();

        res.status(200).json({
            message: `Itinerary is now ${updatedItinerary.active ? "active" : "inactive"}.`,
            itinerary: updatedItinerary
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const sendNotifyFlagged = async (req, res) => {
    const { id } = req.params; // Extract itinerary ID from request parameters
    try {
      // Find the itinerary by ID
      const itinerary = await ItineraryModel.findById(id);
  
      if (!itinerary) {
        return res.status(404).json({ message: "Itinerary not found." });
      }
  
      // Check if the logged-in tour guide is authorized to view this itinerary
      if (req.tourguide && itinerary.tourGuideId.toString() !== req.tourguide.id) {
        return res.status(403).json({ message: "Unauthorized access." });
      }
  
      // Find the associated tour guide by ID
      const tourGuide = await Tourguide.findById(itinerary.tourGuideId);
      if (!tourGuide) {
        return res.status(404).json({ message: "Tour guide not found." });
      }
  
      // Construct the email subject and message
      const subject = `Alert: Flagged Itinerary/Event - ${itinerary.name || itinerary.location}`;
      const message = `Dear ${tourGuide.Username},\n\nWe would like to inform you that your itinerary at ${
        itinerary.location || itinerary.pickupLocation
      } on ${
        itinerary.date || itinerary.availableDates[0]
      } has been flagged as inappropriate by the admin.\n\nPlease review the details and take the necessary actions. If you believe this is an error, you may contact our support team for further assistance.\n\nThank you for your cooperation.\n\nBest regards,\nRafiki`;
  
      // Send notification email
      sendNotificationEmail(tourGuide.Email, subject, message);
  
      res.status(200).json({ message: "Notification sent successfully.", itinerary });
    } catch (error) {
      res.status(500).json({ error: error.message });
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

// Get Itinerary
const getItinerary = async (req, res) => {
    const { id } = req.params;
    try {
        const itinerary = await ItineraryModel.findById(id);

        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found." });
        }

        if (req.tourguide && itinerary.tourGuideId.toString() !== req.tourguide.id) {
            return res.status(403).json({ message: "Unauthorized access." });
        }

        res.status(200).json(itinerary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Update Itinerary
const updateItinerary = async (req, res) => {
    const { id } = req.params;
    try {
        const itinerary = await ItineraryModel.findById(id);
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found." });
        }

        if (req.tourguide && itinerary.tourGuideId.toString() !== req.tourguide.id) {
            return res.status(403).json({ message: "Unauthorized access." });
        }

        const updatedItinerary = await ItineraryModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        res.status(200).json(updatedItinerary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const deleteItinerary = async (req, res) => {
    const { id } = req.params;
    const { tourGuideUsername } = req.body;

    try {
        const tourGuide = await Tourguide.findOne({ Username: tourGuideUsername });
        if (!tourGuide) {
            return res.status(404).json({ message: "Tour guide not found." });
        }

        const itinerary = await ItineraryModel.findById(id);
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found." });
        }

        if (itinerary.tourGuideId.toString() !== tourGuide._id.toString()) {
            return res.status(403).json({ message: "Unauthorized access." });
        }

        await ItineraryModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Itinerary deleted successfully." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllItinerary = async (req, res) => {
    
    try {
        const itineraries = await ItineraryModel.find({});; // Apply the filter and sorting
        res.status(200).json(itineraries); // Send the filtered itineraries
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle errors
    }
};

const getItinerariesSortedByPrice = async (req, res) => {
    try {
        const itineraries = await ItineraryModel.find({}).sort({ price: 1 }); // Ascending order
        if (itineraries.length === 0) {
            return res.status(404).json({ message: "No itineraries found." });
        }
        res.status(200).json(itineraries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getItinerariesByBudget = async (req, res) => {
    const { budget } = req.params; // Get the budget from URL parameters

    // Ensure budget is a number
    const budgetNumber = Number(budget);
    if (isNaN(budgetNumber)) {
        return res.status(400).json({ message: "Invalid budget. Please provide a numeric value." });
    }

    try {
        // Find activities with price less than or equal to the specified budget
        const itineraries = await ItineraryModel.find({ price: { $lte: budgetNumber } });
        res.status(200).json(itineraries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Filter Itineraries by Available Date
const getItinerariesByAvailableDate = async (req, res) => {
    const { date } = req.params; // Get the date from URL parameters
    
    // Convert the date string to a JavaScript Date object
    const inputDate = new Date(date);

    // Check if the input date is valid
    if (isNaN(inputDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format. Please provide a valid date (YYYY-MM-DD)." });
    }

    try {
        // Find itineraries that have available dates greater than or equal to the input date
        const itineraries = await ItineraryModel.find({
            availableDates: { $gte: inputDate }
        });

        if (itineraries.length === 0) {
            return res.status(404).json({ message: "No itineraries available on or after the specified date." });
        }

        res.status(200).json(itineraries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Filter Itineraries by Language
const getItinerariesByLanguage = async (req, res) => {
    const { language } = req.params; // Get the language from URL parameters

    try {
        // Find itineraries that match the specified language
        const itineraries = await ItineraryModel.find({ language: language });

        if (itineraries.length === 0) {
            return res.status(404).json({ message: `No itineraries found for the language: ${language}.` });
        }

        res.status(200).json(itineraries);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Add a Rating to an itinerary
const addRatingToItinerary = async (req, res) => {
    const { id } = req.params;
    const { name, rating, comment } = req.body;

    try {
        const itinerary = await ItineraryModel.findById(id);
        if (!itinerary) {
            return res.status(404).json({ message: "itinerary not found." });
        }

        itinerary.ratings.push({ name, rating, comment });
        await itinerary.save();

        res.status(200).json({ message: "Rating added successfully", itinerary });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Ratings for an itinerary
const getItineraryRatings = async (req, res) => {
    const { id } = req.params;

    try {
        const itinerary = await ItineraryModel.findById(id).select('ratings');
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found." });
        }

        res.status(200).json(itinerary.ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




module.exports = { createItinerary, getItinerary, getAllItinerary, updateItinerary, deleteItinerary,getItinerariesSortedByPrice,getItinerariesByBudget,getItinerariesByAvailableDate
    ,getItinerariesByLanguage, addRatingToItinerary, getItineraryRatings ,toggleItineraryActiveState    
    ,sendNotifyFlagged };
