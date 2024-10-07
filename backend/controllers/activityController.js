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

// Get all Activities with filtering
// Get all Activities with filtering
// const getAllActivities = async (req, res) => {
//     const { budget, date, category } = req.query; // Extract query params

//     let filter = {}; // Initialize an empty filter object

//     // Filter by budget if provided
//     if (budget) {
//         filter.price = { $lte: budget }; // Only include activities less than or equal to the budget
//     }

//     // Filter by date if provided
//     if (date) {
//         filter.date = { $gte: new Date(date) }; // Only include activities on or after the specified date
//     }

//     // Filter by category if provided
//     if (category) {
//         filter.category = category; // Filter by the specified category
//     }

//     try {
//         const activities = await Activity.find(filter); // Find activities based on the filter
//         res.status(200).json(activities); // Return the filtered activities
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };
const getAllActivities = async (req, res) => {
    const { budget, date, category, sort, tags } = req.query; // Extract query params

    let filter = {}; // Initialize an empty filter object

    // Filter by budget if provided
    if (budget) {
        filter.price = { $lte: Number(budget) }; // Only include activities less than or equal to the budget
    }

    // Filter by date if provided
    if (date) {
        filter.date = { $gte: new Date(date) }; // Only include activities on or after the specified date
    }

    // Filter by category if provided
    if (category) {
        filter.category = category; // Filter by the specified category
    }

    // Filter by name if provided
    if (tags) {
       filter.tags = tags;
    }

    // Determine sort order
    let sortCriteria = {};
    if (sort === "price") {
        sortCriteria.price = 1; // Ascending order by price
    }

    try {
        const activities = await Activity.find(filter).sort(sortCriteria); // Find activities based on the filter and sort
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

module.exports = { createActivity, getAllActivities, getActivityById, updateActivity, deleteActivity };
