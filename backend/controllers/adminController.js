//admin controller
const { default: mongoose } = require('mongoose');
const adminModel = require('../models/admin');
const TouristModel = require('../models/Tourist');
const productsModel = require('../models/products');


// Controller for Admin Functions

const Seller = require('../models/seller'); // Assuming you're deleting sellers
const TourismGovernor = require('../models/TourismGovernor');   // Assuming guests or tourists are stored separately
const { admin } = require('mongodb');

const crypto = require('crypto'); // Importing crypto for OTP generation
const otpStore = {}; // This is an in-memory object to store OTPs temporarily



const nodemailer = require('nodemailer');

async function sendForgotPasswordOTP(admin, otp) {
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
        to: admin.Email,  // Admin's email
        subject: 'Password Reset OTP',
        text: `Hello ${admin.Username},\n\nYour OTP for password reset is: ${generatedOtp}\n\nPlease use this OTP to reset your password.\n\nBest regards,\nTeam Rafiki.`,
      };
  
      // Log mail options to debug
      console.log('Mail options:', mailOptions);
  
      // Send the OTP email
      await transport.sendMail(mailOptions);
  
      // Store OTP temporarily (in-memory, or in a database)
      otpStore[admin.Email] = generatedOtp;
  
      console.log('OTP sent successfully!');
    } catch (error) {
      console.error('Failed to send OTP email:', error.message);
      throw new Error('Error sending OTP email');
    }
  }

  
  // Request OTP for Admin
  const requestOTP = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;
    try {
      // Find admin by email
      const admin = await adminModel.findOne({ Email: email });
  
      if (!admin) {
        return res.status(404).json({ message: 'No admin found with this email.' });
      }
  
      // Send OTP email
      await sendForgotPasswordOTP(admin, otp); // Send OTP to the admin
      console.log(`OTP for ${email}: ${otp}`); // Debugging: Log OTP
  
      res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
      console.error('Error in requestOTP:', error);
      res.status(500).json({ message: 'Error sending OTP.' });
    }
  };
  
  // Function to reset the password for Admin
  const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
  
    try {
      // Find the admin by email
      const admin = await adminModel.findOne({ Email: email });
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found with this email.' });
      }
  
      // Hash the new password before saving it
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the password in the database
      admin.Password = hashedPassword;
      await admin.save();
  
      res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Error resetting password.' });
    }
  };
  
  // Function to handle OTP verification
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
async function sendForgotPasswordOTP(governor, otp) {
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
      to: governor.Email,  // Governor's email
      subject: 'Password Reset OTP',
      text: `Hello ${governor.Username},\n\nYour OTP for password reset is: ${generatedOtp}\n\nPlease use this OTP to reset your password.\n\nBest regards,\nTeam Rafiki.`,
    };

    // Log mail options to debug
    console.log('Mail options:', mailOptions);

    // Send the OTP email
    await transport.sendMail(mailOptions);

    // Store OTP temporarily (in-memory, or in a database)
    otpStore[governor.Email] = generatedOtp;

    console.log('OTP sent successfully!');
  } catch (error) {
    console.error('Failed to send OTP email:', error.message);
    throw new Error('Error sending OTP email');
  }
}

// Function to request OTP for the Governor
const requestOTPG = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  try {
    // Find the Governor by email
    const governor = await GovernorModel.findOne({ Email: email });

    if (!governor) {
      return res.status(404).json({ message: 'No governor found with this email.' });
    }

    // Send OTP email
    await sendForgotPasswordOTP(governor, otp); // Send OTP to the Governor
    console.log(`OTP for ${email}: ${otp}`); // Debugging: Log OTP

    res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (error) {
    console.error('Error in requestOTP:', error);
    res.status(500).json({ message: 'Error sending OTP.' });
  }
};

// Function to reset the Governor's password
const resetPasswordG = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find the Governor by email
    const governor = await GovernorModel.findOne({ Email: email });
    if (!governor) {
      return res.status(404).json({ message: 'Governor not found with this email.' });
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    governor.Password = hashedPassword;
    await governor.save();

    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password.' });
  }
};

// Function to handle OTP verification for Governor
const verifyOTPG = async (req, res) => {
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
const loginAdmin = async (req, res) => {
    const { Username, Password } = req.body;

    try {
        const admin = await adminModel.findOne({ Username });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found." });
        }

        // Check password
        if (admin.Password !== Password) {
            return res.status(400).json({ message: "Incorrect password." });
        }

        res.status(200).json({
            message: "Login successful",
            admin,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


  
const tourismGovernorLogin = async (req, res) => {
    const { Username, Password } = req.body;
  
    try {
      const governor = await TourismGovernor.findOne({ Username });
      if (!governor) {
        return res.status(404).json({ message: 'Governor not found.' });
      }
  
      if (governor.Password !== Password) {
        return res.status(400).json({ message: 'Incorrect password.' });
      }
  
      res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
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
    const { Username, Password,Email } = req.body;

    try {
        const newAdmin = await adminModel.create({
            Username,
            Password,
            Email,
            
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

const getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await TouristModel.countDocuments(); 
        res.status(200).json({ totalUsers });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get New Users for the Current Month
const getNewUsersPerMonth = async (req, res) => {
    try {
        // Get the current date
        const currentDate = new Date();

        // Set the start of the current month
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        
        // Set the end of the current month
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
        
        // Find all users who were created within the current month
        const newUsers = await TouristModel.countDocuments({
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        });
        
        res.status(200).json({ newUsers });
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
    getAllGovernors ,
    getTotalUsers,
    getNewUsersPerMonth,
    tourismGovernorLogin,
    loginAdmin,
    requestOTP,
    resetPassword,
    verifyOTP,
    requestOTPG,
    resetPasswordG,
    verifyOTPG
    
};






