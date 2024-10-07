const express = require('express');
const router = express.Router();
const { createActivity, getAllActivities, getActivityById, updateActivity, deleteActivity } = require('../controllers/activityController');

// Create a new Activity
router.post('/', createActivity);

// Get all Activities
router.get('/', getAllActivities);

// Get a single Activity by ID
router.get('/:id', getActivityById);

// Update an Activity by ID
router.put('/:id', updateActivity);

// Delete an Activity by ID
router.delete('/:id', deleteActivity);

module.exports = router;
