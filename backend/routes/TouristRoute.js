const express = require('express');
const { createTourist, getTourist, getTourists, updateTourist,changePassword ,attendActivity} = require('../controllers/touristController'); // Update to your file structure
const router = express.Router();

router.post("/",createTourist);
router.put('/:id',updateTourist);
router.get("/:id", getTourist);
router.get("/", getTourists);
router.post('/changePassword', changePassword);
router.post('/attendActivity', attendActivity); // Add this line

module.exports = router;
