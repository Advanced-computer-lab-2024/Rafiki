const Activity = require('../models/activity');
const nodemailer=require('nodemailer');
const Notification=require('../models/notification');
const Tourist=require('../models/Tourist');

// Create an Activity
const createActivity = async (req, res) => {
    const { date, time, location, price, category, tags, specialDiscounts, isBookingOpen } = req.body;
    try {
        const activity = await Activity.create({
            date, 
            time, 
            location, 
            price, 
            category, 
            tags, 
            specialDiscounts, 
            isBookingOpen
        });
        res.status(201).json(activity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Activities
const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find({});
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single Activity by ID
const getActivityById = async (req, res) => {
    const { id } = req.params;
    try {
        const activity = await Activity.findById(id);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found." });
        }
        res.status(200).json(activity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const notifyUsers = async (activityId) => {
    try {
        // Find all users subscribed to notifications for this activity
        const notifications = await Notification.find({ activityId, isNotified: false });

        for (const notification of notifications) {
            const tourist=await Tourist.findOne({Username:notification.username});
            console.log(`Notifying user ${tourist.Username} about activity ${activityId}`);
            const subject=`booking has opened`;
            const message=`dear ${tourist.Username} the booking has opened for avtivity: ${activityId}`;
            sendNotificationEmail(tourist.Email,subject,message);

            // Mark notification as sent
            notification.isNotified = true;
            await notification.save();
        }
    } catch (error) {
        console.error('Error notifying users:', error);
    }
};

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

// Update an Activity by ID
const updateActivity = async (req, res) => {
    const { id } = req.params;
    const { date, time, location, price, category, tags, specialDiscounts, isBookingOpen } = req.body;

    try {
        // Find the current activity
        const currentActivity = await Activity.findById(id);
        if (!currentActivity) {
            return res.status(404).json({ message: "Activity not found." });
        }

        // Update the activity
        const updatedActivity = await Activity.findByIdAndUpdate(id, { date, time, location, price, category, tags, specialDiscounts, isBookingOpen }, { new: true });

        // Check if the booking status changed from false to true
        if (currentActivity.isBookingOpen === false && updatedActivity.isBookingOpen === true) {
            // Notify users who requested notifications for this activity
            await notifyUsers(id);
        }

        res.status(200).json(updatedActivity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an Activity by ID
const deleteActivity = async (req, res) => {
    const { id } = req.params;
    try {
        const activity = await Activity.findByIdAndDelete(id);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found." });
        }
        res.status(200).json({ message: "Activity deleted successfully." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Search Activities by Tag
const searchActivitiesByTag = async (req, res) => {
    const { tag } = req.params;
    try {
        const activities = await Activity.find({ tags: { $regex: tag, $options: 'i' } });
        if (activities.length === 0) {
            return res.status(404).json({ message: "No activities found with that tag." });
        }
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Search Activities by Category
const searchActivitiesByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const activities = await Activity.find({ category: { $regex: category, $options: 'i' } });
        if (activities.length === 0) {
            return res.status(404).json({ message: "No activities found with that category." });
        }
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Activities by Budget
const getActivitiesByBudget = async (req, res) => {
    const { budget } = req.params;
    const budgetNumber = Number(budget);
    if (isNaN(budgetNumber)) {
        return res.status(400).json({ message: "Invalid budget. Please provide a numeric value." });
    }

    try {
        const activities = await Activity.find({ price: { $lte: budgetNumber } });
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Activities by Date
const getActivitiesByDate = async (req, res) => {
    const { date } = req.params;
    const activityDate = new Date(date);
    
    if (isNaN(activityDate.getTime())) {
        return res.status(400).json({ message: "Invalid date. Please provide a valid date." });
    }

    try {
        const activities = await Activity.find({
            date: {
                $gte: activityDate.setHours(0, 0, 0, 0),
                $lt: activityDate.setHours(23, 59, 59, 999)
            }
        });
        
        if (activities.length === 0) {
            return res.status(404).json({ message: "No activities found for this date." });
        }

        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Activities Sorted by Price
const getActivitiesSortedByPrice = async (req, res) => {
    try {
        const activities = await Activity.find({}).sort({ price: 1 });
        if (activities.length === 0) {
            return res.status(404).json({ message: "No activities found." });
        }
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add a Rating to an Activity
const addRatingToActivity = async (req, res) => {
    const { id } = req.params;
    const { name, rating, comment } = req.body;

    try {
        const activity = await Activity.findById(id);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found." });
        }

        activity.ratings.push({ name, rating, comment });
        await activity.save();

        res.status(200).json({ message: "Rating added successfully", activity });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Ratings for an Activity
const getActivityRatings = async (req, res) => {
    const { id } = req.params;

    try {
        const activity = await Activity.findById(id).select('ratings');
        if (!activity) {
            return res.status(404).json({ message: "Activity not found." });
        }

        res.status(200).json(activity.ratings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Export all controller functions
module.exports = { 
    createActivity, 
    getAllActivities, 
    getActivityById, 
    updateActivity, 
    deleteActivity, 
    searchActivitiesByTag,
    searchActivitiesByCategory,
    getActivitiesByBudget,
    getActivitiesByDate,
    getActivitiesSortedByPrice,
    addRatingToActivity,
    getActivityRatings,
    notifyUsers
};
