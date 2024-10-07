const { default: mongoose } = require('mongoose');
const sellerModel = require('../models/seller');
const bcrypt = require('bcrypt'); 

const createSeller = async(req,res) => {
    const{Username,Email,Password,Name,Description} = req.body;
    const hashedPassword = await bcrypt.hash(Password,10);
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
    const { id } = req.params; // Get the ID from the request parameters
    const { Username, Email, Password, Name, Description } = req.body; // Get the updated information from the request body
    try {
      const seller = await sellerModel.findByIdAndUpdate(
        id,
        { Username, Email, Password, Name, Description },
        { new: true, runValidators: true } // Return the updated document and run validators
      );
 
      if (!seller) {
        return res.status(404).json({ message: "Seller not found." });
      }
      res.status(200).json(seller); // Return the updated advertiser
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  const getAllSellers = async (req, res) => {
    
      const seller = await sellerModel.find({}) // Find advertiser by ID
    
      res.status(200).json(seller); // Return the advertiser's details
    } 


  module.exports = {createSeller,getSeller,updateSeller,getAllSellers};