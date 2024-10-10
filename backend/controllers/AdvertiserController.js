const AdvertiserModel = require('../models/Advertiser');

const createAdvertiser = async (req, res) => {
  const { Username, Email, Password } = req.body;
  try {
    const advertiser = await AdvertiserModel.create({ Username, Email, Password });
    res.status(201).json(advertiser); // Return the created advertiser
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAdvertiser = async (req, res) => {
    const { id } = req.params; // Extracting id from request parameters
    try {
      const advertiser = await AdvertiserModel.findById(id); // Find advertiser by ID
      if (!advertiser) {
        return res.status(404).json({ message: "Advertiser not found." });
      }
      res.status(200).json(advertiser); // Return the advertiser's details
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const getAdvertisers = async (req, res) => {
    try {
      // Fetch all advertisers from the database and sort them by creation date
      const advertisers = await AdvertiserModel.find({}).sort({ createdAt: -1 });
  
      // If no advertisers found, you can return an empty array or a message
      if (!advertisers.length) {
        return res.status(404).json({ message: "No advertisers found." });
      }
  
      res.status(200).json(advertisers); // Return the list of advertisers
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  


  const updateAdvertiser = async (req, res) => {
    const { id } = req.params;
    const { Username, Email, Password} = req.body;

    try {
        let updatedData = { Username, Email };
        
        // Hash new password if provided
        if (Password) {
            updatedData.Password = await bcrypt.hash(Password, 10);
        }

        const tourguide = await AdvertiserModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!tourguide) {
            return res.status(404).json({ message: "Tour guide not found." });
        }
        res.status(200).json(tourguide);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createAdvertiser, getAdvertiser, getAdvertisers, updateAdvertiser };
