const TouristModel = require('../models/Tourist'); // Import the Tourist model
const bcrypt = require('bcrypt'); // Ensure you have this imported for password hashing
const PromoCode = require('../models/PromoCode'); // Import PromoCode model
const nodemailer = require('nodemailer'); // Import nodemailer for email functionality

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

const sendBirthdayPromos = async (req, res) => {
  try {
      // Get today's date
      const today = new Date();
      const todayMonth = today.getMonth() + 1; // Months are 0-indexed, so add 1
      const todayDay = today.getDate();

      console.log("Today's Month:", todayMonth, "Today's Day:", todayDay);

      // Find all tourists with today's birthday
      const tourists = await TouristModel.find({
          $expr: {
              $and: [
                  { $eq: [{ $month: "$DOB" }, todayMonth] },
                  { $eq: [{ $dayOfMonth: "$DOB" }, todayDay] }
              ]
          }
      });

      console.log("Tourists with today's birthday:", tourists);

      if (!tourists.length) {
          return res.status(200).json({ message: "No tourists have a birthday today." });
      }

      const promoCodes = [];

      for (const tourist of tourists) {
          const promoCode = `BDAY-${tourist.Username}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

          try {
              const newPromo = await PromoCode.create({
                  code: promoCode,
                  discount: 20,
                  available: true,
              });

              promoCodes.push(newPromo);
              console.log("Created promo code:", newPromo);
          } catch (error) {
              console.error("Error creating promo code for", tourist.Username, ":", error.message);
          }
      }

      res.status(200).json({ message: "Promo codes sent successfully.", promoCodes });
  } catch (error) {
      res.status(500).json({ error: error.message });
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

const bookActivity = async (req, res) => {
  const { touristId, activityId } = req.body;
  
  try {
      // Find the tourist and update their attendedActivities list
      const tourist = await TouristModel.findByIdAndUpdate(
          touristId,
          { $addToSet: { BookedActivities: activityId } }, // Use $addToSet to avoid duplicates
          { new: true }
      ).populate('BookedActivities'); // Populate to see full details of attended activities if needed

      if (!tourist) {
          return res.status(404).json({ message: "Tourist not found." });
      }

      res.status(200).json({ message: "Activity attended successfully.", BookedActivities: tourist.BookedActivities });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

const cancelActivityBooking = async (req, res) => {
  const { touristId, activityId } = req.body;
  
  try {
      // Find the tourist and update their BookedActivities list
      const tourist = await TouristModel.findByIdAndUpdate(
          touristId,
          { $pull: { BookedActivities: activityId } }, // Use $pull to remove activityId from the array
          { new: true }
      ).populate('BookedActivities'); // Populate to see full details of remaining activities if needed

      if (!tourist) {
          return res.status(404).json({ message: "Tourist not found." });
      }

      res.status(200).json({ message: "Activity booking canceled successfully.", BookedActivities: tourist.BookedActivities });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};



const PurchaseProduct = async (req, res) => {
  const { touristId, ProductId } = req.body;
  
  try {
      // Find the tourist and update their purchases list
      const tourist = await TouristModel.findByIdAndUpdate(
          touristId,
          { $addToSet: { PurchasedProducts: ProductId } }, // Use $addToSet to avoid duplicates
          { new: true }
      ).populate('PurchasedProducts'); // Populate to see full details of attended activities if needed

      if (!tourist) {
          return res.status(404).json({ message: "Tourist not found." });
      }

      res.status(200).json({ message: "Product Purchased successfully.", PurchasedProducts: tourist.PurchasedProducts });
  } catch (error) {
      res.status(400).json({ error: error.message });
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

      res.status(200).json({ message: "Itinerary attended successfully.", BookedItineraries: tourist.BookedItineraries});
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

const cancelItineraryBooking = async (req, res) => {
  const { touristId, itineraryId } = req.body;
  
  try {
      // Find the tourist and update their BookedItineraries list
      const tourist = await TouristModel.findByIdAndUpdate(
          touristId,
          { $pull: { BookedItineraries: itineraryId } }, // Use $pull to remove the itineraryId
          { new: true }
      ).populate('BookedItineraries'); // Populate to see full details of remaining itineraries if needed

      if (!tourist) {
          return res.status(404).json({ message: "Tourist not found." });
      }

      res.status(200).json({ message: "Itinerary booking canceled successfully.", BookedItineraries: tourist.BookedItineraries });
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
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "0bdb8e05c96edd14df4abb34d87b0d26"
  }
});

const sendNotificationEmail = (email, subject, message) => {
  const mailOptions = {
    from: 'info@demomailtrap.com',
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





module.exports = { loginTourist, createTourist,bookActivity, getTourist, getTourists, updateTourist,changePassword,
  sendBirthdayPromos,incrementBookedActivity,decrementBookedActivity ,attendActivity, attendItinerary, PurchaseProduct ,
   getUpcomingPaidActivities , getUpcomingPaidItineraries , getPastPaidActivities , getPastPaidItineraries,bookItinerary,
   cancelActivityBooking,cancelItineraryBooking,sendUpcomingNotifications,
    getUpcomingBookedActivities,getUpcomingBookedItineraries,loginTourist};
