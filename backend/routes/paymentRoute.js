const express = require('express');
const { processActivityPayment,processItineraryPayment,processMuseumPayment } = require('../controllers/paymentController');
const router = express.Router();

router.post("/ActivityPayment", processActivityPayment);
router.post("/ItineraryPayment", processItineraryPayment);
router.post("/MuseumPayment", processMuseumPayment);

module.exports = router;
