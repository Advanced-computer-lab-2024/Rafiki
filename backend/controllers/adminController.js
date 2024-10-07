const { default: mongoose } = require('mongoose');
const adminModel = require('../Models/admin');

// Controller for Admin Functions

const Seller = require('../models/seller'); // Assuming you're deleting sellers
const TourismGovernor = require('../models/TourismGovernor');   // Assuming guests or tourists are stored separately
const { admin } = require('mongodb');

// Admin: Delete Account
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


module.exports = { addTourismGovernor,deleteAccount,addAdmin };


