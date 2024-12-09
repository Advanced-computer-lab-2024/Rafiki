const { default: mongoose } = require('mongoose');
const sellerModel = require('../models/seller');
const path = require('path');
const productsModel=require('../models/products');
const fs = require('fs');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); // Importing crypto for OTP generation
const otpStore = {}; // This is an in-memory object to store OTPs temporarily



const nodemailer = require('nodemailer');

async function sendForgotPasswordOTP(seller, otp) {
    try {
      // Generate a 6-digit OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('Generated OTP:', generatedOtp); // Log OTP
  
      // Create transporter for Gmail
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rafiki.info1@gmail.com',  // Replace with your Gmail email address
          pass: 'hsyotajsdxtetmbw',       // Use app password if 2FA is enabled
        },
      });
  
      // Set up the email options
      const mailOptions = {
        from: 'rafiki.info1@gmail.com',
        to: seller.Email,  // Seller's email
        subject: 'Password Reset OTP',
        text: `Hello ${seller.Username},\n\nYour OTP for password reset is: ${generatedOtp}\n\nPlease use this OTP to reset your password.\n\nBest regards,\nTeam Rafiki.`,
      };
  
      // Log mail options to debug
      console.log('Mail options:', mailOptions);
  
      // Send the OTP email
      await transport.sendMail(mailOptions);
  
      // Store OTP temporarily (in-memory, or in a database)
      otpStore[seller.Email] = generatedOtp;
  
      console.log('OTP sent successfully!');
    } catch (error) {
      console.error('Failed to send OTP email:', error.message);
      throw new Error('Error sending OTP email');
    }
  }
  const requestOTP = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;
  
    try {
      // Find the seller by email
      const seller = await SellerModel.findOne({ Email: email });
  
      if (!seller) {
        return res.status(404).json({ message: 'No seller found with this email.' });
      }
  
      // Send OTP email
      await sendForgotPasswordOTP(seller, otp); // Send OTP to the seller
      console.log(`OTP for ${email}: ${otp}`); // Debugging: Log OTP
  
      res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
      console.error('Error in requestOTP:', error);
      res.status(500).json({ message: 'Error sending OTP.' });
    }
  };
  const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
  
    try {
      // Find the seller by email
      const seller = await SellerModel.findOne({ Email: email });
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found with this email.' });
      }
  
      // Hash the new password before saving it
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the password in the database
      seller.Password = hashedPassword;
      await seller.save();
  
      res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Error resetting password.' });
    }
  };
  const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
  
    // Fetch the OTP from the database or cache
    const storedOTP = otpStore[email];
  
    if (!storedOTP) {
      return res.status(400).json({ message: 'OTP not found or expired.' });
    }
  
    // Compare the OTP entered by the user with the one stored
    if (storedOTP === otp) {
      return res.status(200).json({ message: 'OTP verified successfully.' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }
  };
        
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

    // Use the uploaded file path if a file was uploaded; otherwise, set to null
    const profilePicture = req.file ? req.file.path : null;

    // Create Seller with plain password (no hashing)
    const newSeller = await sellerModel.create({
      Username,
      Email,
      Password, // Store plain password directly
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
    loginSeller,
    requestOTP,
    resetPassword,
    verifyOTP,
};
