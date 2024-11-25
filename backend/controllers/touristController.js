const TouristModel = require('../Models/Tourist'); // Import the Tourist model
const bcrypt = require('bcrypt'); // Ensure you have this imported for password hashing
const PromoCode = require('../models/PromoCode'); // Import PromoCode model
const nodemailer = require('nodemailer'); // Import nodemailer for email functionality

const createTourist = async (req, res) => {
  const { Username, Email, Password, MobileNumber, Nationality, DOB, Job,BookedActivity } = req.body;

  // Validate age
  const currentDate = new Date();
  const birthDate = new Date(DOB);
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();

  // Check if the tourist is under 18 years old
  if (age < 18 || (age === 18 && monthDifference < 0)) {
    return res.status(400).json({ error: "You must be at least 18 years old to register." });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10); // Hashing the password

    // Create the tourist with the hashed password
    const tourist = await TouristModel.create({ 
      Username, 
      Email, 
      Password: hashedPassword, // Store hashed password
      MobileNumber, 
      Nationality, 
      DOB, 
      Job,
      BookedActivity,
      Wallet: 0 // Set default wallet value
    });
    
    res.status(201).json(tourist); // Return the created tourist
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Get Tourist by ID
const getTourist = async (req, res) => {
  const { id } = req.params; // Extracting id from request parameters
  try {
    const tourist = await TouristModel.findById(id); // Find tourist by ID
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found." });
    }
    res.status(200).json(tourist); // Return the tourist's details
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getTourists = async (req, res) => {
  try {
    // Fetch all advertisers from the database and sort them by creation date
    const tourists = await TouristModel.find({}).sort({ createdAt: -1 });

    // If no advertisers found, you can return an empty array or a message
    if (!tourists.length) {
      return res.status(404).json({ message: "No tourists found." });
    }

    res.status(200).json(tourists); // Return the list of advertisers
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Tourist
const updateTourist = async (req, res) => {
  const { id } = req.params;
  const { Username, Email, Password,Nationalty,Wallet,Job} = req.body;

  try {
      let updatedData = { Username, Email,Nationalty,Wallet,Job };
      
      // Hash new password if provided
      if (Password) {
          updatedData.Password = await bcrypt.hash(Password, 10);
      }

      const tourguide = await TouristModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

      if (!tourguide) {
          return res.status(404).json({ message: "Tour guide not found." });
      }
      res.status(200).json(tourguide);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  try {
      // Fetch tourist details from the database using Username
      const tourist = await TouristModel.findOne({ Username: username });
      if (!tourist) {
          return res.status(404).json({ message: 'Tourist not found.' });
      }

      // Compare old password with the stored hashed password
      const isMatch = await bcrypt.compare(oldPassword, tourist.Password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Incorrect old password.' });
      }

      // Hash the new password and update
      tourist.Password = await bcrypt.hash(newPassword, 10);
      await tourist.save();

      return res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};

const sendBirthdayPromos = async (req, res) => {
    try {
        // Get today's date
        const today = new Date();
        const todayMonth = today.getMonth() + 1; // Months are 0-indexed, so add 1
        const todayDay = today.getDate();
        // Find all tourists with today's birthday
        const tourists = await TouristModel.find({
          $expr: {
            $and: [
                { $eq: [{ $month: "$DOB" }, todayMonth] },
                { $eq: [{ $dayOfMonth: "$DOB" }, todayDay] }
            ]
        } // Matches DOB in the format MM-DD
        });

        if (!tourists.length) {
            return res.status(200).json({ message: "No tourists have a birthday today." });
        }

        const promoCodes = [];

        for (const tourist of tourists) {
            // Generate a unique promo code
            const promoCode = `BDAY-${tourist.Username}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

            // Save the promo code in the database
            const newPromo = await PromoCode.create({
                code: promoCode,
                discount: 20, // Example: 20% discount
                  });

            promoCodes.push(newPromo);

            // Optional: Send the promo code via email
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "rafikiguc123@gmail.com",
                    pass: "rafiki123@",
                },
            });

            await transporter.sendMail({
                from: "rafikiguc123@gmail.com",
                to: tourist.Email,
                subject: "Happy Birthday! Here's Your Promo Code 🎉",
                text: `Happy Birthday, ${tourist.Username}! Use this promo code for a 20% discount: ${promoCode}.`,
            });
        }

        res.status(200).json({ message: "Promo codes sent successfully.", promoCodes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const attendActivity = async (req, res) => {
  const { touristId, activityId } = req.body;
  
  try {
      // Find the tourist and update their attendedActivities list
      const tourist = await TouristModel.findByIdAndUpdate(
          touristId,
          { $addToSet: { attendedActivities: activityId } }, // Use $addToSet to avoid duplicates
          { new: true }
      ).populate('attendedActivities'); // Populate to see full details of attended activities if needed

      if (!tourist) {
          return res.status(404).json({ message: "Tourist not found." });
      }

      res.status(200).json({ message: "Activity attended successfully.", attendedActivities: tourist.attendedActivities });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};


const PurchaseProduct = async (req, res) => {
  const { touristId, ProductId } = req.body;
  
  try {
      // Find the tourist and update their purchases list
      const tourist = await TouristModel.findByIdAndUpdate(
          touristId,
          { $addToSet: { PurchasedProducts: ProductId } }, // Use $addToSet to avoid duplicates
          { new: true }
      ).populate('PurchasedProducts'); // Populate to see full details of attended activities if needed

      if (!tourist) {
          return res.status(404).json({ message: "Tourist not found." });
      }

      res.status(200).json({ message: "Product Purchased successfully.", PurchasedProducts: tourist.PurchasedProducts });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};


const attendItinerary = async (req, res) => {
  const { touristId, itineraryId } = req.body;
  
  try {
      // Find the tourist and update their attendedActivities list
      const tourist = await TouristModel.findByIdAndUpdate(
          touristId,
          { $addToSet: { attendedItineraries: itineraryId } }, // Use $addToSet to avoid duplicates
          { new: true }
      ).populate('attendedItineraries'); // Populate to see full details of attended activities if needed

      if (!tourist) {
          return res.status(404).json({ message: "Tourist not found." });
      }

      res.status(200).json({ message: "Itinerary attended successfully.", attendedItineraries: tourist.attendedItineraries});
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

const incrementBookedActivity = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTourist = await TouristModel.findByIdAndUpdate(
      id,
      { $inc: { BookedActivity: 1 } },
      { new: true }
    );

   

    res.status(200).json(updatedTourist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const decrementBookedActivity = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTourist = await TouristModel.findByIdAndUpdate(
      id,
      { $inc: { BookedActivity: -1 } }, // Decrement by 1
      { new: true }
    );

    res.status(200).json(updatedTourist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = { createTourist, getTourist, getTourists, updateTourist,changePassword,sendBirthdayPromos,incrementBookedActivity,decrementBookedActivity ,attendActivity, attendItinerary, PurchaseProduct};
