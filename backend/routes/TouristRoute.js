const express = require('express');
const { createTourist, getTourist, getTourists, updateTourist,changePassword
    ,incrementBookedActivity,decrementBookedActivity,attendActivity,
     PurchaseProduct, attendItinerary, getUpcomingPaidActivities , getUpcomingPaidItineraries ,
      getPastPaidActivities , getPastPaidItineraries, bookActivity, bookItinerary,sendUpcomingNotifications
    ,cancelActivityBooking,cancelItineraryBooking, getUpcomingBookedActivities,getUpcomingBookedItineraries,loginTourist,
    viewWalletBalance , cancelMuseumBooking,addAddress,getAddresses} = require('../controllers/touristController'); // Update to your file structure
const router = express.Router();

router.post("/",createTourist);
router.put('/:id',updateTourist);
router.get("/:id", getTourist);
router.get("/", getTourists);
router.post('/changePassword', changePassword);
router.post('/attendActivity', attendActivity); 
router.post('/attendItinerary', attendItinerary); 
router.post('/PurchaseProduct', PurchaseProduct); 
router.put('/:id/inc', incrementBookedActivity);
router.put('/:id/dec', decrementBookedActivity);
router.get('/:id/upcoming-paid-activities', getUpcomingPaidActivities);
router.get('/:id/upcoming-paid-Itineraries', getUpcomingPaidItineraries);
router.get('/:id/past-paid-Activities', getPastPaidActivities);
router.get('/:id/past-paid-Itineraries', getPastPaidItineraries);
router.post('/login', loginTourist);
router.post('/bookActivity', bookActivity);
router.post('/bookItinerary', bookItinerary);
router.post('/cancelActivityBooking', cancelActivityBooking);
router.post('/cancelItineraryBooking', cancelItineraryBooking);
router.post('/cancelMuseumBooking', cancelMuseumBooking);
router.get('/:id/upcoming-booked-activities', getUpcomingBookedActivities);
router.get('/:id/upcoming-booked-Itineraries', getUpcomingBookedItineraries);
router.post('/sendUpcomingNotifications', sendUpcomingNotifications);
router.get('/:touristId/wallet', viewWalletBalance);
// Route to add a new address
router.post('/:username/addAddress', addAddress);

// Route to get all addresses for a tourist
router.get('/:username/addresses', getAddresses);

module.exports = router;