const express = require('express');
const { createTourist, getTourist, getTourists, updateTourist } = require('../controllers/touristController'); // Update to your file structure
const router = express.Router();

router.post("/",createTourist);
router.put('/:id',updateTourist);
router.get("/:id", getTourist);
router.get("/", getTourists);

module.exports = router;
