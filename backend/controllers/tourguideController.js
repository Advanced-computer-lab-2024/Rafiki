const TourguideModel = require('../models/Tourguide');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

// Helper function to check if terms have been accepted
const checkTermsAccepted = (tourGuide, res) => {
    if (!tourGuide.termsAccepted) {
        res.status(403).json({ error: 'You must accept the terms and conditions to access this feature.' });
        return false;
    }
    return true;
};

// Create Tour Guide
const createTourguide = async (req, res) => {
    try {
        const { Username, Email, Password, MobileNumber, Yearsofexperience, Previouswork } = req.body;
        
        const hashedPassword = await bcrypt.hash(Password, 10);

        const newTourguide = await TourguideModel.create({
            Username,
            Email,
            Password: hashedPassword,
            MobileNumber,
            Yearsofexperience,
            Previouswork,
            termsAccepted: false // By default, termsAccepted is false
        });
        
        res.status(201).json(newTourguide);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Tour Guide by ID
const getTourguide = async (req, res) => {
    const { id } = req.params;
    try {
        const tourGuide = await TourguideModel.findById(id);
        if (!tourGuide) {
            return res.status(404).json({ message: "Tour guide not found." });
        }

        // Check if terms are accepted
        if (!checkTermsAccepted(tourGuide, res)) return;

        res.status(200).json(tourGuide);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Tour Guide
const updateTourguide = async (req, res) => {
    const { id } = req.params;
    const { Username, Email, Password, MobileNumber, Yearsofexperience, Previouswork } = req.body;

    try {
        const tourGuide = await TourguideModel.findById(id);

        if (!tourGuide) {
            return res.status(404).json({ message: "Tour guide not found." });
        }

        // Check if terms are accepted
        if (!checkTermsAccepted(tourGuide, res)) return;

        let updatedData = { Username, Email, MobileNumber, Yearsofexperience, Previouswork };
        
        // Hash new password if provided
        if (Password) {
            updatedData.Password = await bcrypt.hash(Password, 10);
        }

        const updatedTourGuide = await TourguideModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        res.status(200).json(updatedTourGuide);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Tour Guides
const getAlltour = async (req, res) => {
    try {
        const tours = await TourguideModel.find({});
        res.status(200).json(tours);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Change Password
const changePassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
  
    try {
        const tourGuide = await TourguideModel.findOne({ Username: username });
        if (!tourGuide) {
            return res.status(404).json({ message: 'Tour guide not found.' });
        }

        // Check if terms are accepted
        if (!checkTermsAccepted(tourGuide, res)) return;

        // Verify old password
        const isMatch = await bcrypt.compare(oldPassword, tourGuide.Password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect old password.' });
        }

        // Update the password
        tourGuide.Password = await bcrypt.hash(newPassword, 10);
        await tourGuide.save();
  
        return res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Upload Profile Picture
const uploadTourGuidePicture = async (req, res) => {
    const { id } = req.params;
  
    try {
        const tourGuide = await TourguideModel.findById(id);
        if (!tourGuide) {
            return res.status(404).json({ message: "Tour Guide not found." });
        }

        // Check if terms are accepted
        if (!checkTermsAccepted(tourGuide, res)) return;

        const newPicture = req.file ? req.file.filename : null;

        // Delete old picture if it exists and a new one is uploaded
        if (tourGuide.Picture && newPicture) {
            const oldPicturePath = path.join(__dirname, '../uploads/tourGuidePictures', tourGuide.Picture);
            if (fs.existsSync(oldPicturePath)) {
                fs.unlinkSync(oldPicturePath);
            }
        }

        tourGuide.Picture = newPicture;
        await tourGuide.save();
  
        res.status(200).json({ message: "Profile picture uploaded successfully.", tourGuide });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Add a Rating to a Tour Guide
const addRatingToTourGuide = async (req, res) => {
    const { id } = req.params; // Tour Guide ID
    const { name, rating, comment } = req.body;

    try {
        // Find the tour guide by ID
        const tourGuide = await TourguideModel.findById(id);
        if (!tourGuide) {
            return res.status(404).json({ message: "Tour guide not found." });
        }

        // Add the rating to the tour guide's ratings array
        tourGuide.ratings.push({ name, rating, comment });
        await tourGuide.save();

        res.status(200).json({ message: "Rating added successfully", tourGuide });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Ratings for a Tour Guide
const getTourguideRatings = async (req, res) => {
    const { id } = req.params;

    try {
        const tourGuide = await TourguideModel.findById(id).select('ratings');
        if (!tourGuide) {
            return res.status(404).json({ message: "Tour guide not found." });
        }

        res.status(200).json(tourGuide.ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { createTourguide, getTourguide, updateTourguide, getAlltour, changePassword, uploadTourGuidePicture, addRatingToTourGuide,getTourguideRatings };
