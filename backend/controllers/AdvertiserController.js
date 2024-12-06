const AdvertiserModel = require('../models/Advertiser');
const ActivityModel = require('../models/activity'); // Replace with actual Activity model
const ItineraryModel = require('../models/Itinerary'); // Replace with actual Itinerary model
const BookingModel = require('../models/Booking');
const multer = require('multer');
const bcrypt = require('bcrypt');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // generate a unique filename
  },
});
const upload = multer({ storage: storage }).single('profilePicture');

const loginAdvertiser = async (req, res) => {
  const { Username, Password } = req.body;

  try {
    // Find advertiser by username
    const advertiser = await AdvertiserModel.findOne({ Username });

    // Check if advertiser exists
    if (!advertiser) {
      return res.status(404).json({ message: "Advertiser not found" });
    }

    // Compare plain-text password directly
    if (advertiser.Password !== Password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Send back advertiser data (excluding the password)
    const { Password: _, ...advertiserData } = advertiser.toObject();
    res.status(200).json({ advertiser: advertiserData });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to create a new advertiser
const createAdvertiser = async (req, res) => {
  try {
    const { Username, Email, Password, MobileNumber, Nationalty, DOB, Job, isTermsAccepted } = req.body;

    if (!isTermsAccepted) {
      return res.status(400).json({ error: 'You must accept the terms and conditions.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Handle profile picture
    const profilePicture = req.file ? req.file.path : null;

    // Create Advertiser
    const newAdvertiser = await AdvertiserModel.create({
      Username,
      Email,
      Password: hashedPassword,
      MobileNumber,
      Nationalty,
      DOB,
      Job,
      profilePicture,
    });

    res.status(201).json(newAdvertiser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get an advertiser by ID
const getAdvertiser = async (req, res) => {
  const { id } = req.params;
  try {
    const advertiser = await AdvertiserModel.findById(id);
    if (!advertiser) {
      return res.status(404).json({ message: 'Advertiser not found.' });
    }
    res.status(200).json(advertiser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get all advertisers
const getAdvertisers = async (req, res) => {
  try {
    const advertisers = await AdvertiserModel.find({}).sort({ createdAt: -1 });
    if (!advertisers.length) {
      return res.status(404).json({ message: 'No advertisers found.' });
    }
    res.status(200).json(advertisers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to update an advertiser's details
const updateAdvertiser = async (req, res) => {
  const { id } = req.params;
  const { Username, Email, Password } = req.body;

  try {
    let updatedData = { Username, Email };
    
    if (Password) {
      updatedData.Password = await bcrypt.hash(Password, 10);
    }

    const advertiser = await AdvertiserModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

    if (!advertiser) {
      return res.status(404).json({ message: 'Advertiser not found.' });
    }
    res.status(200).json(advertiser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to change an advertiser's password
const changePassword = async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  try {
      // Fetch the advertiser details from the database using Username
      const advertiser = await AdvertiserModel.findOne({ Username: username });
      if (!advertiser) {
          return res.status(404).json({ message: 'Advertiser not found.' });
      }

      // Compare old password with the stored password (plain-text comparison)
      if (advertiser.Password !== oldPassword) {
          return res.status(400).json({ message: 'Incorrect old password.' });
      }

      // Update the advertiser's password
      advertiser.Password = newPassword;
      await advertiser.save();

      return res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};

// Controller to request account deletion with conditions
const requestAccountDeletion = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body; // Receive username and password from the client

  try {
    // Fetch the advertiser account
    const advertiser = await AdvertiserModel.findById(id);

    if (!advertiser) {
      return res.status(404).json({ error: "Advertiser not found." });
    }

    // Check if the username matches
    if (advertiser.username !== username) {
      return res.status(400).json({ error: "Invalid username." });
    }

    // Check if the password matches (plain-text comparison)
    if (advertiser.password !== password) {
      return res.status(400).json({ error: "Invalid password." });
    }

    // Check for upcoming, paid bookings associated with activities or itineraries
    const hasPaidUpcomingActivities = await BookingModel.exists({
      advertiserId: id,
      status: "paid",
      activityDate: { $gte: new Date() },
    });

    const hasPaidUpcomingItineraries = await BookingModel.exists({
      advertiserId: id,
      status: "paid",
      itineraryDate: { $gte: new Date() },
    });

    if (hasPaidUpcomingActivities || hasPaidUpcomingItineraries) {
      return res.status(400).json({
        error: "Account cannot be deleted due to upcoming paid bookings associated with activities or itineraries.",
      });
    }

    // Hide associated data
    await ActivityModel.updateMany({ advertiserId: id }, { visible: false });
    await ItineraryModel.updateMany({ advertiserId: id }, { visible: false });

    // Delete the advertiser account
    const deletedAdvertiser = await AdvertiserModel.findByIdAndDelete(id);

    if (!deletedAdvertiser) {
      return res.status(404).json({ error: "Advertiser not found." });
    }

    res.status(200).json({
      message: "Account deleted successfully, and all associated activities and itineraries are now hidden.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

module.exports = {
  createAdvertiser,
  getAdvertiser,
  getAdvertisers,
  updateAdvertiser,
  changePassword,
  requestAccountDeletion,
  loginAdvertiser
};
