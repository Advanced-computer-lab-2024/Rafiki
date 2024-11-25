const express = require('express');
const { createTourist, getTourist, getTourists, updateTourist,changePassword,sendBirthdayPromos,incrementBookedActivity,decrementBookedActivity,attendActivity, PurchaseProduct, attendItinerary} = require('../controllers/touristController'); // Update to your file structure
const router = express.Router();

router.post("/",createTourist);
router.post('/sendBirthdayPromos', sendBirthdayPromos);
router.put('/:id',updateTourist);
router.get("/:id", getTourist);
router.get("/", getTourists);
router.post('/changePassword', changePassword);
router.post('/attendActivity', attendActivity); 
router.post('/attendItinerary', attendItinerary); 
router.post('/PurchaseProduct', PurchaseProduct); 
router.put('/:id/inc', incrementBookedActivity);
router.put('/:id/dec', decrementBookedActivity);

module.exports = router;
