const express = require('express');
const { createTourist, getTourist, getTourists, updateTourist,changePassword,incrementBookedActivity,decrementBookedActivity,attendActivity } = require('../controllers/touristController'); // Update to your file structure
const router = express.Router();

router.post("/",createTourist);
router.put('/:id',updateTourist);
router.get("/:id", getTourist);
router.get("/", getTourists);
router.post('/changePassword', changePassword);
router.post('/attendActivity', attendActivity); // Add this line
router.put('/:id/inc', incrementBookedActivity);
router.put('/:id/dec', decrementBookedActivity);

module.exports = router;
