// const express = require('express');
// const router = express.Router();
// const { createActivity, getAllActivities, getActivityById, updateActivity, deleteActivity } = require('../controllers/activityController');

// // Create a new Activity
// router.post('/', createActivity);

// // Get all Activities
// router.get('/', getAllActivities);

// // Get a single Activity by ID
// router.get('/:id', getActivityById);

// // Update an Activity by ID
// router.put('/:id', updateActivity);

// // Delete an Activity by ID
// router.delete('/:id', deleteActivity);

// module.exports = router;
const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/activityController');

// Routes
router.post('/', createActivity);
router.get('/', getAllActivities); // This route now supports query parameters
router.get('/:id', getActivityById);
router.put('/:id', updateActivity);
router.delete('/:id', deleteActivity);
router.get('/searchT/:tag', searchActivitiesByTag); // New search route
router.get('/searchC/:category', searchActivitiesByCategory);
router.get('/filter/:budget', getActivitiesByBudget); // Add this line for budget filtering
router.get('/filterDate/:date', getActivitiesByDate); // Add this line for date filtering   
router.get('/sort/price', getActivitiesSortedByPrice); // Add this line for sorting


module.exports = router;
