//admin controller
const { default: mongoose } = require('mongoose');
const adminModel = require('../Models/admin');

// Controller for Admin Functions

const Seller = require('../models/seller'); // Assuming you're deleting sellers
const TourismGovernor = require('../models/TourismGovernor');   // Assuming guests or tourists are stored separately
const { admin } = require('mongodb');

// Admin: Delete Account
const getAdmin = async (req, res) => {
    try {
      // Fetch all Admin from the database and sort them by creation date
      const Admin = await adminModel.find({}).sort({ createdAt: -1 });
  
      // If no Admin found, you can return an empty array or a message
      if (!Admin.length) {
        return res.status(404).json({ message: "No Admin found." });
      }
  
      res.status(200).json(Admin); // Return the list of Admin
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
const deleteAccount = async (req, res) => {
    const { id } = req.params; // Get the user or seller ID from the reques t
    try {
        // Assuming we can delete both sellers and guests using this function
        const deletedSeller = await Seller.findByIdAndDelete(id);
        const deletedTourismGovernor = await adminModel.findByIdAndDelete(id);

        if (deletedSeller || deletedTourismGovernor) {
            return res.status(200).json({ message: "Account successfully deleted." });
        }
        return res.status(404).json({ message: "Account not found." });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
// Admin: Add Tourism Governor
const addTourismGovernor = async (req, res) => {
    const { Username, Password } = req.body;

    try {
        const newGovernor = await TourismGovernor.create({
            Username,
            Password,
        });
        res.status(201).json(newGovernor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Admin: Add Another Admin
const addAdmin = async (req, res) => {
    const { Username, Password } = req.body;

    try {
        const newAdmin = await adminModel.create({
            Username,
            Password,
            
        });
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const changePassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    try {
        // Fetch admin details from the database using Username
        const admin = await adminModel.findOne({ Username: username });
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

const changeGovernorPassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    try {
        // Fetch the governor details from the database using Username
        const governor = await TourismGovernor.findOne({ Username: username });
        if (!governor) {
            return res.status(404).json({ message: 'Governor not found.' });
        }

        // Compare old password with the stored password (plain-text comparison)
        if (governor.Password !== oldPassword) {
            return res.status(400).json({ message: 'Incorrect old password.' });
        }

        // Update the governor's password
        governor.Password = newPassword;
        await governor.save();

        return res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Admin: Get All Tourism Governors
const getAllGovernors = async (req, res) => {
    try {
        // Fetch all governors from the database and sort them by creation date
        const governors = await TourismGovernor.find({}).sort({ createdAt: -1 });

        // If no governors are found, return a message or an empty array
        if (!governors.length) {
            return res.status(404).json({ message: "No governors found." });
        }

        res.status(200).json(governors); // Return the list of governors
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { 
    addTourismGovernor, 
    deleteAccount, 
    addAdmin, 
    getAdmin, 
    changePassword, 
    changeGovernorPassword, 
    getAllGovernors 
};






