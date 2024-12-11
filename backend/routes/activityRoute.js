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
    addRatingToActivity,
    getActivityRatings
} = require('../controllers/activityController');

// Define routes here
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
router.post('/:id/ratings', addRatingToActivity);
router.get('/:id/ratings', getActivityRatings);

module.exports = router;
