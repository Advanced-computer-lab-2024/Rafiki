const express = require('express');
const { createItinerary, getItinerary, updateItinerary, deleteItinerary, getAllItinerary,getItinerariesSortedByPrice,getItinerariesByBudget,getItinerariesByAvailableDate
    ,getItinerariesByLanguage,   toggleItineraryActiveState,} = require('../controllers/itineraryController');
const router = express.Router();

router.post('/creatingitinerary', createItinerary);
router.get('/itinerary/:id', getItinerary);
router.put('/itinerary/:id', updateItinerary);
router.delete('/itinerary/:id', deleteItinerary);
router.get('/', getAllItinerary); 
router.get('/sort/price', getItinerariesSortedByPrice);
router.get('/filter/:budget', getItinerariesByBudget);  
router.get('/filterDate/:date', getItinerariesByAvailableDate);
router.get('/filterLanguage/:language', getItinerariesByLanguage);  
router.put('/itinerary/:id/toggle-active', toggleItineraryActiveState);


module.exports = router;