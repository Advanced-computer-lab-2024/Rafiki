const express = require('express'); 
const { createTourguide, updateTourguide, getTourguide, getAlltour } = require('../controllers/tourguideController');
const router = express.Router();

// Define your routes here
router.post('/', createTourguide); 
router.get('/:id', getTourguide); // Fixed route to include ':id' properly
router.put('/:id', updateTourguide); 
router.get('/', getAlltour); // Get all tour guides

module.exports = router;