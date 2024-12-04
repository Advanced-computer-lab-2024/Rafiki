const TouristModel = require('../models/Tourist'); // Import the Tourist model
const ActivityModel = require('../models/activity')
const ItineraryModel = require('../models/itinerary')
const MuseumModel = require('../models/museum')
const bcrypt = require('bcrypt'); // Ensure you have this imported for password hashing
const PromoCode = require('../models/PromoCode'); // Import PromoCode model // Import nodemailer for email functionality
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const sellerModel=require('../models/seller');
const ProductModel=require('../models/products');
const AdminModel=require('../models/admin');

async function sendBirthdayPromoEmail(tourist, promoCode) {
  try {

    const transport = nodemailer.createTransport({
      service: 'gmail', // Use the email service you're working with
      auth: {
        user: 'rafiki.info1@gmail.com', 
        pass: 'hsyotajsdxtetmbw',
      },
    });

    const mailOptions = {
      from: 'rafiki.info1@gmail.com', // Replace with your email
      to: tourist.Email, // Tourist's email
      subject: 'Happy Birthday! 🎉 Here’s Your Promo Code!',
      text: `Dear ${tourist.Username},\n\nHappy Birthday! 🎂 To celebrate, we’re giving you an exclusive promo code: ${promoCode.code}.\n\nEnjoy a ${promoCode.discount}% discount on your next purchase!\n\nBest wishes,\nYour App Team`,
    };

    await transport.sendMail(mailOptions);
    console.log('Promo email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error.message);
  }
}


const loginTourist = async (req, res) => {
  const { Username, Password } = req.body;

  try {
    const tourist = await TouristModel.findOne({ Username });
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found." });
    }

    // Check password
    const isMatch = await bcrypt.compare(Password, tourist.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    // Check if today is the tourist's birthday
    const today = new Date();
    const isBirthday = 
      today.getDate() === tourist.DOB.getDate() && 
      today.getMonth() === tourist.DOB.getMonth();

    if (isBirthday) {
      // Check if a promo code has already been generated for this birthday
      const lastPromoDate = tourist.lastBirthdayPromo;
      const isNewPromo = !lastPromoDate || 
                         lastPromoDate.getFullYear() !== today.getFullYear();

      if (isNewPromo) {
        // Generate a promo code
        const promoCode = await PromoCode.create({
          code: `BDAY${tourist.Username}${Date.now()}`, // Unique code
          discount: 20, // Example: 20% discount
        });

        // Update the tourist's lastBirthdayPromo field
        tourist.lastBirthdayPromo = today;
        await tourist.save();
        await sendBirthdayPromoEmail(tourist,promoCode);

        res.status(200).json({
          message: "Login successful. Happy Birthday! Here's your promo code.",
          tourist,
          promoCode,
        });
        return;
      }
    }

    res.status(200).json({
      message: "Login successful",
      tourist,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createTourist = async (req, res) => {
  const { Username, Email, Password, MobileNumber, Nationality, DOB, Job,BookedActivity } = req.body;

  // Validate age
  const currentDate = new Date();
  const birthDate = new Date(DOB);
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();

  // Check if the tourist is under 18 years old
  if (age < 18 || (age === 18 && monthDifference < 0)) {
    return res.status(400).json({ error: "You must be at least 18 years old to register." });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10); // Hashing the password

    // Create the tourist with the hashed password
    const tourist = await TouristModel.create({ 
      Username, 
      Email, 
      Password: hashedPassword, // Store hashed password
      MobileNumber, 
      Nationality, 
      DOB, 
      Job,
      BookedActivity,
      Wallet: 0 // Set default wallet value
    });
    
    res.status(201).json(tourist); // Return the created tourist
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Get Tourist by ID
const getTourist = async (req, res) => {
  const { id } = req.params; // Extracting id from request parameters
  try {
    const tourist = await TouristModel.findById(id); // Find tourist by ID
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found." });
    }
    res.status(200).json(tourist); // Return the tourist's details
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getTourists = async (req, res) => {
  try {
    // Fetch all advertisers from the database and sort them by creation date
    const tourists = await TouristModel.find({}).sort({ createdAt: -1 });

    // If no advertisers found, you can return an empty array or a message
    if (!tourists.length) {
      return res.status(404).json({ message: "No tourists found." });
    }

    res.status(200).json(tourists); // Return the list of advertisers
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Tourist
const updateTourist = async (req, res) => {
  const { id } = req.params;
  const { Username, Email, Password,Nationalty,Wallet,Job} = req.body;

  try {
      let updatedData = { Username, Email,Nationalty,Wallet,Job };
      
      // Hash new password if provided
      if (Password) {
          updatedData.Password = await bcrypt.hash(Password, 10);
      }

      const tourguide = await TouristModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

      if (!tourguide) {
          return res.status(404).json({ message: "Tour guide not found." });
      }
      res.status(200).json(tourguide);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  try {
      // Fetch tourist details from the database using Username
      const tourist = await TouristModel.findOne({ Username: username });
      if (!tourist) {
          return res.status(404).json({ message: 'Tourist not found.' });
      }

      // Compare old password with the stored hashed password
      const isMatch = await bcrypt.compare(oldPassword, tourist.Password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Incorrect old password.' });
      }

      // Hash the new password and update
      tourist.Password = await bcrypt.hash(newPassword, 10);
      await tourist.save();

      return res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};





const attendActivity = async (req, res) => {
  const { touristId, activityId } = req.body;
  
  try {
      // Find the tourist and update their attendedActivities list
      const tourist = await TouristModel.findByIdAndUpdate(
          touristId,
          { $addToSet: { attendedActivities: activityId } }, // Use $addToSet to avoid duplicates
          { new: true }
      ).populate('attendedActivities'); // Populate to see full details of attended activities if needed

      if (!tourist) {
          return res.status(404).json({ message: "Tourist not found." });
      }

      res.status(200).json({ message: "Activity attended successfully.", attendedActivities: tourist.attendedActivities });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

async function sendActivityBookingEmail(tourist, activity) {
  try {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rafiki.info1@gmail.com',
        pass: 'hsyotajsdxtetmbw',
      },
    });

    const mailOptions = {
      from: 'rafiki.info1@gmail.com',
      to: tourist.Email,
      subject: `Your Activity Booking Confirmation: ${activity.name}`,
      text: `Hello ${tourist.Username},\n\nCongratulations! Your booking for "${activity.name}" has been successfully confirmed.\n\nHere are your booking details:\n- **Activity Name**: ${activity.name}\n- **Price**: $${activity.price}\n- **Location**: ${activity.location || 'To be announced'}\n- **Date**: ${activity.date || 'To be scheduled'}\n\nWe hope you have an amazing experience!\n\nBest regards,\nTeam Rafiki`,
    };

    await transport.sendMail(mailOptions);
    console.log('Booking confirmation email sent successfully!');
  } catch (error) {
    console.error('Failed to send booking email:', error.message);
  }
}

const bookActivity = async (req, res) => {
  const { touristId, activityId } = req.body;

  try {
    const tourist = await TouristModel.findByIdAndUpdate(
      touristId,
      { $addToSet: { BookedActivities: activityId } },
      { new: true }
    ).populate('BookedActivities');

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found. Please ensure you are registered." });
    }

    const activity = await ActivityModel.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found. It might no longer be available." });
    }

    await sendActivityBookingEmail(tourist, activity);

    res.status(200).json({
      message: `You have successfully booked "${activity.name}".`,
      reminderMessage: `Don't forget! The activity is scheduled at ${activity.location || 'an amazing destination'} on ${activity.date || 'a convenient date'}.`,
      BookedActivities: tourist.BookedActivities,
    });
  } catch (error) {
    console.error('Error booking activity:', error);
    res.status(500).json({ message: "An error occurred while booking the activity. Please try again later." });
  }
};


const cancelActivityBooking = async (req, res) => {
  const { touristId, activityId } = req.body;

  try {
    // Find the tourist
    const tourist = await TouristModel.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found." });
    }

    // Find the activity
    const activity = await ActivityModel.findById(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found." });
    }

    // Check if the activity is booked or paid for
    const isBooked = tourist.BookedActivities.includes(activityId);
    const isPaid = tourist.paidActivities.includes(activityId);

    if (!isBooked && !isPaid) {
      return res.status(400).json({
        message: "This activity is neither booked nor paid for. Cancellation is not allowed."
      });
    }

    let message = "Activity booking canceled successfully.";
    // If the activity is booked but not paid for
    if (isBooked && !isPaid) {
      await TouristModel.findByIdAndUpdate(
        touristId,
        { $pull: { BookedActivities: activityId } },
        { new: true }
      );
    }

    // Refund the tourist's wallet if paid
    if (isPaid) {
      tourist.Wallet += activity.price; // Refund the price
      const updatedTourist = await TouristModel.findByIdAndUpdate(
        touristId,
        {
          $pull: {
            BookedActivities: activityId,
            paidActivities: activityId
          },
          Wallet: tourist.Wallet // Update the wallet balance
        },
        { new: true }
      ).populate('BookedActivities'); // Populate BookedActivities for updated list

      res.status(200).json({
        message: `${message} Refund issued for the paid activity.`,
        newWalletBalance: updatedTourist.Wallet,
        BookedActivities: updatedTourist.BookedActivities
      });
      return;
    }

    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




const viewWalletBalance = async (req, res) => {
  const { touristId } = req.params;

  try {
      // Find the tourist by ID
      const tourist = await TouristModel.findById(touristId);
      if (!tourist) {
          return res.status(404).json({ message: "Tourist not found." });
      }

      // Return the tourist's wallet balance
      res.status(200).json({ walletBalance: tourist.Wallet });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};



const PurchaseProduct = async (req, res) => {
  const { touristId, ProductId } = req.body;

  try {
    // Find the product and decrease the available quantity if it's in stock
    const product = await ProductModel.findOneAndUpdate(
      { _id: ProductId, AvailableQuantity: { $gt: 0 } },
      { $inc: { AvailableQuantity: -1 } },
      { new: true }
    );

    if (!product) {
      return res.status(400).json({ message: "Product is out of stock." });
    }

    // If product's available quantity is 0, notify the seller and admins
    if (product.AvailableQuantity === 0) {
      const seller = await SellerModel.findOne({ Username: product.Seller });  // Find the seller by username
      if (seller) {
        const emailSubject = 'Out of Stock Product Alert';
        const emailBody = `The following product is out of stock:\n\n` +
                          `"${product.Name}" is out of stock. Please restock it.`;
        sendNotificationEmail(seller.Email, emailSubject, emailBody); // Notify the seller

        // Notify admins
        const admins = await AdminModel.find({}, 'Email');
        const adminEmails = admins.map(admin => admin.Email);
        const emailSubject2 = 'Out of Stock Product Alert';
        const emailBody2 = `The following product is out of stock:\n\n` +
                           `"${product.Name}" is out of stock.`;
        for (const adminEmail of adminEmails) {
          sendNotificationEmail(adminEmail, emailSubject2, emailBody2); // Notify each admin
        }
      }
    }

    // Add the product to the tourist's purchased products list
    const tourist = await TouristModel.findByIdAndUpdate(
      touristId,
      { $addToSet: { PurchasedProducts: ProductId } },
      { new: true }
    ).populate('PurchasedProducts');

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found." });
    }

    // Update the seller's sales and revenue
    const seller = await sellerModel.findOne({ Username: product.Seller }); // Find seller by username
    if (seller) {
      seller.Sales += 1; // Increment the number of sales for the seller
      seller.Revenue += product.Price; // Add the product price to the seller's revenue
      await seller.save(); // Save the updated seller data
    } else {
      return res.status(404).json({ message: "Seller not found." });
    }

    // Send a response indicating the purchase was successful
    res.status(200).json({ message: "Product purchased successfully.", PurchasedProducts: tourist.PurchasedProducts });
  } catch (error) {
    console.error("Error during purchase:", error); // Log detailed error
    res.status(500).json({ error: error.message });
  }
};






const attendItinerary = async (req, res) => {
  const { touristId, itineraryId } = req.body;
  
  try {
      // Find the tourist and update their attendedActivities list
      const tourist = await TouristModel.findByIdAndUpdate(
          touristId,
          { $addToSet: { attendedItineraries: itineraryId } }, // Use $addToSet to avoid duplicates
          { new: true }
      ).populate('attendedItineraries'); // Populate to see full details of attended activities if needed

      if (!tourist) {
          return res.status(404).json({ message: "Tourist not found." });
      }

      res.status(200).json({ message: "Itinerary attended successfully.", attendedItineraries: tourist.attendedItineraries});
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

const bookItinerary = async (req, res) => {
  const { touristId, itineraryId } = req.body;
  
  try {
      // Find the tourist and update their attendedActivities list
      const tourist = await TouristModel.findByIdAndUpdate(
          touristId,
          { $addToSet: { BookedItineraries: itineraryId } }, // Use $addToSet to avoid duplicates
          { new: true }
      ).populate('BookedItineraries'); // Populate to see full details of attended activities if needed

      if (!tourist) {
          return res.status(404).json({ message: "Tourist not found." });
      }
      const itinerary = await ItineraryModel.findById(itineraryId);

      const subject = `Reminder: Upcoming Event - ${itinerary.name || itinerary.location}`;
      const message = `Dear ${tourist.Username},\n\nYou have succesfully booked, This is a reminder for your upcoming event at ${itinerary.location || itinerary.pickupLocation} on ${itinerary.date || itinerary.availableDates[0]}.\n\nThank you!`;
      sendNotificationEmail(tourist.Email, subject, message);

      res.status(200).json({ message: "Itinerary attended successfully.", BookedItineraries: tourist.BookedItineraries,reminderMessage:`You have succesfully booked, This is a reminder for your upcoming event at ${itinerary.location || itinerary.pickupLocation} on ${itinerary.date || itinerary.availableDates[0]}.\n\n Thank You! `});
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

const cancelItineraryBooking = async (req, res) => {
  const { touristId, itineraryId } = req.body;

  try {
    // Find the tourist
    const tourist = await TouristModel.findById(touristId);
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found." });
    }

    // Find the itinerary
    const itinerary = await ItineraryModel.findById(itineraryId);
    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found." });
    }

    // Check if the itinerary is booked or paid for
    const isBooked = tourist.BookedItineraries.includes(itineraryId);
    const isPaid = tourist.paidItineraries.includes(itineraryId);

    if (!isBooked && !isPaid) {
      return res.status(400).json({
        message: "This itinerary is neither booked nor paid for. Cancellation is not allowed."
      });
    }

    let message = "Itinerary booking canceled successfully.";
    // If the itinerary is booked but not paid for
    if (isBooked && !isPaid) {
      await TouristModel.findByIdAndUpdate(
        touristId,
        { $pull: { BookedItineraries: itineraryId } },
        { new: true }
      );
    }

    // Refund the tourist's wallet if paid
    if (isPaid) {
      tourist.Wallet += itinerary.price; // Refund the price
      const updatedTourist = await TouristModel.findByIdAndUpdate(
        touristId,
        {
          $pull: {
            BookedItineraries: itineraryId,
            paidItineraries: itineraryId
          },
          Wallet: tourist.Wallet // Update the wallet balance
        },
        { new: true }
      ).populate('BookedItineraries'); // Populate BookedActivities for updated list

      res.status(200).json({
        message: `${message} Refund issued for the paid itinerary.`,
        newWalletBalance: updatedTourist.Wallet,
        BookedItineraries: updatedTourist.BookedItineraries
      });
      return;
    }

    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const cancelMuseumBooking = async (req, res) => {
  const { touristId, museumId } = req.body;

  try {
      // Find the tourist
      const tourist = await TouristModel.findById(touristId);
      if (!tourist) {
          return res.status(404).json({ message: "Tourist not found." });
      }

      // Find the museum to get the amount paid
      const museum = await MuseumModel.findById(museumId);
      if (!museum) {
          return res.status(404).json({ message: "museum not found." });
      }



      const isPaid = tourist.BookedMuseums.includes(museumId);

     if(isPaid){ tourist.Wallet += museum.ticketPrices;  // Add the museum's price back to the wallet

      // Remove the museum from the tourist's paidmuseum
      const updatedTourist = await TouristModel.findByIdAndUpdate(
          touristId,
          { 
              $pull: { 
                BookedMuseums: museumId 
              }, 
              Wallet: tourist.Wallet  // Update the wallet balance
          },
          { new: true }
      ).populate('BookedMuseums'); // Populate BookedMuseums to show updated list

      res.status(200).json({
          message: "Museum booking canceled successfully. ",
          newWalletBalance: updatedTourist.Wallet,  // Return the updated wallet balance
          BookedMuseums: updatedTourist.BookedMuseums  // Return updated list of booked museums
      });}

     else{ return res.status(400).json({
        message: "This Museum is neither booked nor paid for. Cancellation is not allowed."
      });
    }
      // Refund the tourist's wallet
     
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};



const incrementBookedActivity = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTourist = await TouristModel.findByIdAndUpdate(
      id,
      { $inc: { BookedActivity: 1 } },
      { new: true }
    );
    res.status(200).json(updatedTourist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const decrementBookedActivity = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTourist = await TouristModel.findByIdAndUpdate(
      id,
      { $inc: { BookedActivity: -1 } }, // Decrement by 1
      { new: true }
    );

    res.status(200).json(updatedTourist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getUpcomingPaidActivities = async (req, res) => {
  const { id } = req.params; // Tourist ID from the URL

  try {
    // Find the tourist by ID and populate their paid activities
    const tourist = await TouristModel.findById(id).populate('paidActivities');

    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found.' });
    }

    // Get the current date to filter activities
    const currentDate = new Date();

    // Filter the paid activities to only include upcoming ones
    const upcomingActivities = tourist.paidActivities.filter(activity => new Date(activity.date) > currentDate);

    if (upcomingActivities.length === 0) {
      return res.status(200).json({ message: 'No upcoming activities found.' });
    }

    // Return the upcoming activities
    res.status(200).json(upcomingActivities);
  } catch (error) {
    console.error('Error fetching upcoming paid activities:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const getUpcomingPaidActivitiesInternal = async (id) => {
  //const { id } = req.params; // Tourist ID from the URL

  try {
    // Find the tourist by ID and populate their paid activities
    const tourist = await TouristModel.findById(id).populate('paidActivities');

    if (!tourist) {
      throw new Error('Tourist not found.');    }

    // Get the current date to filter activities
    const currentDate = new Date();

    // Filter the paid activities to only include upcoming ones
    const upcomingActivities = tourist.paidActivities.filter(activity => new Date(activity.date) > currentDate);

    return upcomingActivities;
  } catch (error) {
    console.error('Error fetching upcoming paid activities:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const getUpcomingBookedActivities = async (id) => {
  try {
    // Find the tourist by ID and populate their booked activities
    const tourist = await TouristModel.findById(id).populate('BookedActivities');

    if (!tourist) {
      throw new Error('Tourist not found.');
    }

    // Get the current date to filter activities
    const currentDate = new Date();

    // Filter the booked activities to only include upcoming ones
    const upcomingActivities = tourist.BookedActivities.filter(activity => new Date(activity.date) > currentDate);

    return upcomingActivities;
  } catch (error) {
    console.error('Error fetching upcoming booked activities:', error);
    throw error; // Let the caller handle the error
  }
};



const getUpcomingPaidItineraries = async (req, res) => {
  const { id } = req.params; // Tourist ID from the URL

  try {
    // Find the tourist by ID and populate their paid itineraries
    const tourist = await TouristModel.findById(id).populate('paidItineraries');

    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found.' });
    }

    // Get the current date to filter itineraries
    const currentDate = new Date();

    // Filter the paid itineraries to only include upcoming ones
    const upcomingItineraries = tourist.paidItineraries.filter(itinerary => new Date(itinerary.availableDates) > currentDate);

    if (upcomingItineraries.length === 0) {
      return res.status(200).json({ message: 'No upcoming itineraries found.' });
    }

    // Return the upcoming itineraries
    res.status(200).json(upcomingItineraries);
  } catch (error) {
    console.error('Error fetching upcoming paid itineraries:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const getUpcomingPaidItinerariesInternal = async (id) => {
  //const { id } = req.params; // Tourist ID from the URL

  try {
    // Find the tourist by ID and populate their paid itineraries
    const tourist = await TouristModel.findById(id).populate('paidItineraries');

    

    // Get the current date to filter itineraries
    const currentDate = new Date();

    // Filter the paid itineraries to only include upcoming ones
    const upcomingItineraries = tourist.paidItineraries.filter(itinerary => new Date(itinerary.availableDates) > currentDate);

    return upcomingItineraries;
  } catch (error) {
    console.error('Error fetching upcoming paid itineraries:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const getUpcomingBookedItineraries = async (id) => {
  //const { id } = req.params; // Tourist ID from the URL

  try {
    // Find the tourist by ID and populate their paid itineraries
    const tourist = await TouristModel.findById(id).populate('BookedItineraries');

    

    // Get the current date to filter itineraries
    const currentDate = new Date();

    // Filter the paid itineraries to only include upcoming ones
    const upcomingItineraries = tourist.BookedItineraries.filter(itinerary => new Date(itinerary.availableDates) > currentDate);

    return upcomingItineraries;
  } catch (error) {
    console.error('Error fetching upcoming paid itineraries:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


const getPastPaidActivities = async (req, res) => {
  const { id } = req.params; // Tourist ID from the URL

  try {
    // Find the tourist by ID and populate their paid activities
    const tourist = await TouristModel.findById(id).populate('paidActivities');

    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found.' });
    }

    // Get the current date to filter activities
    const currentDate = new Date();

    // Filter the paid activities to only include past ones
    const pastActivities = tourist.paidActivities.filter(activity => new Date(activity.date) < currentDate);

    if (pastActivities.length === 0) {
      return res.status(200).json({ message: 'No past activities found.' });
    }

    // Return the past activities
    res.status(200).json(pastActivities);
  } catch (error) {
    console.error('Error fetching past paid activities:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};


const getPastPaidItineraries = async (req, res) => {
  const { id } = req.params; // Tourist ID from the URL

  try {
    // Find the tourist by ID and populate their paid itineraries
    const tourist = await TouristModel.findById(id).populate('paidItineraries');

    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found.' });
    }

    // Get the current date to filter itineraries
    const currentDate = new Date();

    // Filter the paid itineraries to only include past ones
    const pastItineraries = tourist.paidItineraries.filter(itinerary => new Date(itinerary.availableDates) < currentDate);

    if (pastItineraries.length === 0) {
      return res.status(200).json({ message: 'No past itineraries found.' });
    }

    // Return the past itineraries
    res.status(200).json(pastItineraries);
  } catch (error) {
    console.error('Error fetching past paid itineraries:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Configure your email transporter securely
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use the email service you're working with
  auth: {
    user: 'rafiki.info1@gmail.com', 
    pass: 'hsyotajsdxtetmbw',
  },
});

const sendNotificationEmail = (email, subject, message) => {
  const mailOptions = {
    from: 'rafiki.info1@gmail.com',
    to: email,
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error sending email to ${email}:`, error);
    } else {
      console.log(`Email sent to ${email}:`, info.response);
    }
  });
};

const sendUpcomingNotifications = async (req, res) => {
  try {
    // Step 1: Fetch all tourists
    const tourists = await TouristModel.find(); // Assuming TouristModel is your Mongoose model

    // Step 2: Loop through each tourist and send notifications
    for (const tourist of tourists) {
    const { _id: touristId, Email, Username } = tourist;

      // Step 3: Fetch upcoming events for this tourist
      const bookedActivities = await getUpcomingBookedActivities(touristId);
      const paidActivities = await getUpcomingPaidActivitiesInternal(touristId);
      const bookedItineraries = await getUpcomingBookedItineraries(touristId);
      const paidItineraries = await getUpcomingPaidItinerariesInternal(touristId);

      // Combine all events into one list (Optional: Customize message per event type)
      const allEvents = [
        ...bookedActivities,
        ...paidActivities,
        ...bookedItineraries,
        ...paidItineraries,
      ];

      // Step 4: Send email notifications for each event
      for (const event of allEvents) {
        const subject = `Reminder: Upcoming Event - ${event.name || event.location}`;
        const message = `Dear ${Username},\n\nThis is a reminder for your upcoming event at ${event.location || event.pickupLocation} on ${event.date || event.availableDates[0]}.\n\nThank you!`;
        sendNotificationEmail(Email, subject, message);
      }

    }
  res.status(200).json({ message: 'Notifications sent successfully.' });
  } catch (error) {
    console.error('Error fetching upcoming events or sending notifications:', error);
  }
};


// Controller: Add a new address to the tourist's profile
// Controller: Add address to tourist
const addAddress = async (req, res) => {
  const { username } = req.params; // Get the tourist's username from the request parameters
  const { street, city, postalCode } = req.body; // Get the address details from the body

  try {
      // Validate the address fields
      if (!street || !city || !postalCode) {
          return res.status(400).json({ message: 'All address fields are required' });
      }

      // Find the tourist by username
      const tourist = await TouristModel.findOne({ Username: username });
      if (!tourist) {
          return res.status(404).json({ message: 'Tourist not found' });
      }

      // Add the new address to the tourist's addresses array
      tourist.addresses.push({ street, city, postalCode });

      // Save the tourist document
      await tourist.save();

      // Return success response with the updated addresses
      res.status(200).json({
          message: 'Address added successfully',
          addresses: tourist.addresses
      });
  } catch (error) {
      console.error('Error adding address:', error);
      res.status(500).json({
          message: 'Error adding address',
          error: error.message || error
      });
  }
};





// Controller: Get all addresses of a tourist by username
const getAddresses = async (req, res) => {
  const { username } = req.params; // Retrieve the username from the request parameters

  try {
    // Find the tourist by username
    const tourist = await TouristModel.findOne({ Username: username }); // Make sure the field matches your model
    if (!tourist) {
      return res.status(404).json({ message: 'Tourist not found' });
    }

    // Return the list of addresses
    res.status(200).json({ addresses: tourist.addresses });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ message: 'Error fetching addresses', error });
  }
};






module.exports = { loginTourist, createTourist,bookActivity, getTourist, getTourists, updateTourist,changePassword,
  incrementBookedActivity,decrementBookedActivity ,attendActivity, attendItinerary, PurchaseProduct ,
   getUpcomingPaidActivities , getUpcomingPaidItineraries , getPastPaidActivities , getPastPaidItineraries,bookItinerary,
   cancelActivityBooking,cancelItineraryBooking,sendUpcomingNotifications,
    getUpcomingBookedActivities,getUpcomingBookedItineraries,loginTourist , viewWalletBalance , cancelMuseumBooking,addAddress,getAddresses};
