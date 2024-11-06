// routes/redemptionRoute.js
const express = require('express');
const { redeemPoints } = require('../controllers/redemptionController');
const router = express.Router();

router.post('/redeem', redeemPoints); // Define the redemption endpoint

module.exports = router;
