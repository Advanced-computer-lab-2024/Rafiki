const { default: mongoose } = require('mongoose');
const sellerModel = require('../models/seller');
const path = require('path');
const productsModel=require('../models/products');
const fs = require('fs');
const bcrypt = require('bcrypt');
const loginSeller = async (req, res) => {
    const { Username, Password } = req.body;
  
    try {
        const tourist = await sellerModel.findOne({ Username });
        if (!tourist) {
            return res.status(404).json({ message: "Seller not found." });
        }
  
        // Check password
        
        if (tourist.Password !== Password) {
            return res.status(400).json({ message: "Incorrect password." });
        }
       
        res.status(200).json({
            message: "Login successful",
            tourist,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

  



// Define each function as a standalone, outside of any other function
const createSeller = async (req, res) => {
    try {
      console.log('Request Body:', req.body);
      console.log('Uploaded File:', req.file || 'No file uploaded'); // Log uploaded file
  
      const { Username, Email, Password, Name, Description } = req.body;
  
      if (!Username || !Email || !Password || !Name || !Description) {
        return res.status(400).json({ error: 'All required fields must be filled.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(Password, 10);
  
      // Use the uploaded file path if a file was uploaded; otherwise, set to null
      const profilePicture = req.file ? req.file.path : null;
  
      // Create Seller
      const newSeller = await sellerModel.create({
        Username,
        Email,
        Password: hashedPassword,
        Name,
        Description,
        profilePicture,
      });
  
      res.status(201).json(newSeller);
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ error: 'Invalid input data. Please check your fields.' });
      } else if (error.code === 11000) {
        res.status(400).json({ error: 'Email or Username already exists.' });
      } else {
        console.error('Unexpected Error in createSeller:', error);
        res.status(500).json({ error: 'Internal Server Error. Please check the server logs.' });
      }
    }
  };
  
  

const getSeller = async (req, res) => {
    const { id } = req.params;
    try {
        const seller = await sellerModel.findById(id);
        if (!seller) {
            return res.status(404).json({ message: "Seller not found." });
        }
        res.status(200).json(seller);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateSeller = async (req, res) => {
    const { id } = req.params;
    const { Username, Email, Password } = req.body;

    try {
        let updatedData = { Username, Email };
        const tourguide = await sellerModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!tourguide) {
            return res.status(404).json({ message: "Tour guide not found." });
        }
        res.status(200).json(tourguide);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllSellers = async (req, res) => {
    const sellers = await sellerModel.find({});
    res.status(200).json(sellers);
};

const changePassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    try {
        const admin = await sellerModel.findOne({ Username: username });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        if (admin.Password !== oldPassword) {
            return res.status(400).json({ message: 'Incorrect old password.' });
        }

        admin.Password = newPassword;
        await admin.save();

        return res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const uploadSellerPicture = async (req, res) => {
    const { id } = req.params;

    try {
        const seller = await sellerModel.findById(id);
        if (!seller) {
            return res.status(404).json({ message: "Seller not found." });
        }

        const newPicture = req.file ? req.file.filename : null;

        if (seller.Picture && newPicture) {
            const oldPicturePath = path.join(__dirname, '../uploads/sellerPictures', seller.Picture);
            if (fs.existsSync(oldPicturePath)) {
                fs.unlinkSync(oldPicturePath);
            }
        }

        seller.Picture = newPicture;
        await seller.save();

        res.status(200).json({ message: "Profile picture uploaded successfully.", seller });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to delete a seller if allowed
const deleteSellerIfAllowed = async (req, res) => {
    const { id } = req.params;

    try {
        const seller = await sellerModel.findById(id);
        if (!seller) {
            return res.status(404).json({ message: "Seller not found." });
        }

        const hasPaidBookings = await checkForPaidBookings(id);
        if (hasPaidBookings) {
            return res.status(403).json({
                message: "Cannot delete seller. There are upcoming events, activities, or itineraries with paid bookings."
            });
        }

        await sellerModel.findByIdAndDelete(id);
        await deleteAssociatedData(id);

        res.status(200).json({ message: "Seller account and associated data deleted successfully." });
    } catch (error) {
        console.error("Error in deleteSellerIfAllowed:", error);
        res.status(500).json({ error: error.message });
    }
};

// Helper function to check for upcoming paid bookings
const checkForPaidBookings = async (sellerId) => {
    const hasPaidEvents = await EventModel.exists({
        seller: sellerId,
        date: { $gte: new Date() },
        isPaid: true
    });

    const hasPaidActivities = await ActivityModel.exists({
        seller: sellerId,
        date: { $gte: new Date() },
        isPaid: true
    });

    const hasPaidItineraries = await ItineraryModel.exists({
        seller: sellerId,
        date: { $gte: new Date() },
        isPaid: true
    });

    return hasPaidEvents || hasPaidActivities || hasPaidItineraries;
};

// Helper function to delete associated data if the seller account is deleted
const deleteAssociatedData = async (sellerId) => {
    await EventModel.deleteMany({ seller: sellerId });
    await ActivityModel.deleteMany({ seller: sellerId });
    await ItineraryModel.deleteMany({ seller: sellerId });
};

// Export all functions
module.exports = { 
    createSeller, 
    getSeller, 
    updateSeller, 
    getAllSellers, 
    changePassword, 
    uploadSellerPicture, 
    deleteSellerIfAllowed ,
    loginSeller
};
