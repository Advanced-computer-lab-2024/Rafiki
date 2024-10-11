const express = require('express');
const { createItinerary, getItinerary, updateItinerary, deleteItinerary, getAllItinerary,getItinerariesSortedByPrice } = require('../controllers/itineraryController');
const router = express.Router();

router.post('/creatingitinerary', createItinerary);
router.get('/itinerary/:id', getItinerary);
router.put('/itinerary/:id', updateItinerary);
router.delete('/itinerary/:id', deleteItinerary);
router.get('/', getAllItinerary); 
router.get('/sort/price', getItinerariesSortedByPrice);



module.exports = router;