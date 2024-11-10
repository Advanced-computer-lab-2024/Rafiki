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
    addRatingToActivity,    // Import new function
    getActivityRatings      // Import new function
} = require('../controllers/activityController');

// Existing routes...
router.post('/', createActivity);
router.get('/', getAllActivities);
router.get('/:id', getActivityById);
router.put('/:id', updateActivity);
router.delete('/:id', deleteActivity);
router.get('/searchT/:tag', searchActivitiesByTag);
router.get('/searchC/:category', searchActivitiesByCategory);
router.get('/filter/:budget', getActivitiesByBudget);
router.get('/filterDate/:date', getActivitiesByDate);
router.get('/sort/price', getActivitiesSortedByPrice);

// New routes for ratings
router.post('/:id/ratings', addRatingToActivity); // Route to add a rating to an activity
router.get('/:id/ratings', getActivityRatings);   // Route to get all ratings for an activity

module.exports = router;
