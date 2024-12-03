const express = require('express');
const { processActivityPayment,processItineraryPayment,processMuseumPayment ,createPaymentIntent} = require('../controllers/paymentController');
const router = express.Router();

router.post("/ActivityPayment", processActivityPayment);
router.post("/ItineraryPayment", processItineraryPayment);
router.post("/MuseumPayment", processMuseumPayment);
router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;
