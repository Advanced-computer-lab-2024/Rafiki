const { default: mongoose } = require('mongoose');
const sellerModel = require('../models/seller');
// const bcrypt = require('bcrypt'); 
// const { default: ChangePasswordForm } = require('../../frontend/src/components/ChangePasswordForm');

const createSeller = async(req,res) => {
    const{Username,Email,Password,Name,Description} = req.body;
    // const hashedPassword = await bcrypt.hash(Password,10);
    const hashedPassword = Password;
    try{
        const user = await sellerModel.create({Username,Email,Password:hashedPassword,Name,Description});
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const getSeller = async (req, res) => {
    const { id } = req.params; // Extracting id from request parameters
    try {
      const seller = await sellerModel.findById(id); // Find advertiser by ID
      if (!seller) {
        return res.status(404).json({ message: "Seller not found." });
      }
      res.status(200).json(seller); // Return the advertiser's details
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const updateSeller = async (req, res) => {
    const { id } = req.params;
    const { Username, Email, Password} = req.body;

    try {
        let updatedData = { Username, Email };
        
        // Hash new password if provided
        // if (Password) {
        //     updatedData.Password = await bcrypt.hash(Password, 10);
        // }

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
    
      const seller = await sellerModel.find({}) // Find advertiser by ID
    
      res.status(200).json(seller); // Return the advertiser's details
    } 

    const changePassword = async (req, res) => {
      const { username, oldPassword, newPassword } = req.body;
    
      try {
          // Fetch admin details from the database using Username
          const admin = await sellerModel.findOne({ Username: username });
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
    

  module.exports = {createSeller,getSeller,updateSeller,getAllSellers,changePassword};