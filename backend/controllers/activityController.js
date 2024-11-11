const Activity = require('../models/activity');

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


const getAllActivities = async (req, res) => {
    
    try {
        const activities = await Activity.find({}); 
        res.status(200).json(activities); // Return the filtered activities
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

// Update an Activity by ID
const updateActivity = async (req, res) => {
    const { id } = req.params;
    const { date, time, location, price, category, tags, specialDiscounts, isBookingOpen } = req.body;
    try {
        const activity = await Activity.findByIdAndUpdate(id, { date, time, location, price, category, tags, specialDiscounts, isBookingOpen }, { new: true });
        if (!activity) {
            return res.status(404).json({ message: "Activity not found." });
        }
        res.status(200).json(activity);
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
    const { tag } = req.params; // Get the tag from the request parameters
    try {
        const activities = await Activity.find({ tags: { $regex: tag, $options: 'i' } }); // Case-insensitive search
        if (activities.length === 0) {
            return res.status(404).json({ message: "No activities found with that tag." });
        }
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const searchActivitiesByCategory = async (req, res) => {
    const { category } = req.params; // Get the tag from the request parameters
    try {
        const activities = await Activity.find({ category: { $regex: category, $options: 'i' } }); // Case-insensitive search
        if (activities.length === 0) {
            return res.status(404).json({ message: "No activities found with that category." });
        }
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get activities by budget
// Get activities by budget using req.params
const getActivitiesByBudget = async (req, res) => {
    const { budget } = req.params; // Get the budget from URL parameters

    // Ensure budget is a number
    const budgetNumber = Number(budget);
    if (isNaN(budgetNumber)) {
        return res.status(400).json({ message: "Invalid budget. Please provide a numeric value." });
    }

    try {
        // Find activities with price less than or equal to the specified budget
        const activities = await Activity.find({ price: { $lte: budgetNumber } });
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getActivitiesByDate = async (req, res) => {
    const { date } = req.params; // Get the date from URL parameters

    // Convert the date string to a Date object
    const activityDate = new Date(date);
    
    // Check if the date is valid
    if (isNaN(activityDate.getTime())) {
        return res.status(400).json({ message: "Invalid date. Please provide a valid date." });
    }

    try {
        // Find activities that match the specified date
        const activities = await Activity.find({
            date: {
                $gte: activityDate.setHours(0, 0, 0, 0), // Set to the start of the day
                $lt: activityDate.setHours(23, 59, 59, 999) // Set to the end of the day
            }
        });
        
        // If no activities are found
        if (activities.length === 0) {
            return res.status(404).json({ message: "No activities found for this date." });
        }

        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getActivitiesSortedByPrice = async (req, res) => {
    try {
        const activities = await Activity.find({}).sort({ price: 1 }); // Ascending order
        if (activities.length === 0) {
            return res.status(404).json({ message: "No activities found." });
        }
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const addRatingToActivity = async (req, res) => {
    const { id } = req.params; // Activity ID
    const { name, rating, comment } = req.body; // Rating details from request body

    try {
        // Find the activity by ID
        const activity = await Activity.findById(id);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found." });
        }

        // Add the new rating to the activity
        activity.ratings.push({ name, rating, comment });
        await activity.save(); // Save the updated activity

        res.status(200).json({ message: "Rating added successfully", activity });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getActivityRatings = async (req, res) => {
    const { id } = req.params; // Activity ID

    try {
        const activity = await Activity.findById(id).select('ratings'); // Get only ratings field
        if (!activity) {
            return res.status(404).json({ message: "Activity not found." });
        }

        res.status(200).json(activity.ratings); // Return all ratings
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





//module.exports = { createActivity, getAllActivities, getActivityById, updateActivity, deleteActivity, searchActivitiesByTag,searchActivitiesByCategory,getActivitiesByBudget 
//<<<<<<< Updated upstream
    //,getActivitiesByDate,getActivitiesSortedByPrice, getActivityRatings, addRatingToActivity};
//=======
 //   ,getActivitiesByDate,getActivitiesSortedByPrice};




 
//>>>>>>> Stashed changes
