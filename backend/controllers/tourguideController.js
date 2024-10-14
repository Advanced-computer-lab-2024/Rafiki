const TourguideModel = require('../models/Tourguide');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Create Tour Guide with hashed password
const createTourguide = async (req, res) => {
    try {
        const { Username, Email, Password, MobileNumber, Yearsofexperience, Previouswork } = req.body;
        
        // Hashing the password
        const hashedPassword = await bcrypt.hash(Password, 10);

        const newTourguide = await TourguideModel.create({
            Username,
            Email,
            Password: hashedPassword,
            MobileNumber,
            Yearsofexperience,
            Previouswork
        });
        
        res.status(201).json(newTourguide); // 201 for resource creation
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Tour Guide by ID
const getTourguide = async (req, res) => {
    const { id } = req.params;
    try {
        const tour = await TourguideModel.findById(id);
        if (!tour) {
            return res.status(404).json({ message: "Tour guide not found." });
        }
        res.status(200).json(tour);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Tour Guide
const updateTourguide = async (req, res) => {
    const { id } = req.params;
    const { Username, Email, Password, MobileNumber, Yearsofexperience, Previouswork } = req.body;

    try {
        let updatedData = { Username, Email, MobileNumber, Yearsofexperience, Previouswork };
        
        // Hash new password if provided
        if (Password) {
            updatedData.Password = await bcrypt.hash(Password, 10);
        }

        const tourguide = await TourguideModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!tourguide) {
            return res.status(404).json({ message: "Tour guide not found." });
        }
        res.status(200).json(tourguide);
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


const changePassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
  
    try {
        // Fetch admin details from the database using Username
        const admin = await TourguideModel.findOne({ Username: username });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found.' });
        }
  
        // Compare old password with the stored password (plain-text comparison)
        if (admin.Password !== oldPassword) {
            return res.status(400).json({ message: 'Incorrect old password.' });
        }
  
        // Update the admin's password
        admin.Password = newPassword;
        await admin.save();
  
        return res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
  };
  

module.exports = { createTourguide, getTourguide, updateTourguide, getAlltour,changePassword };