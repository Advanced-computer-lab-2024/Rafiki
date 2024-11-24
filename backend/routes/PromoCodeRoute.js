const express = require('express');
const router = express.Router();
const {
   createPromoCode,
   getAllPromoCodes
} = require('../controllers/PromoCodeController');


router.post('/', createPromoCode);
router.get('/', getAllPromoCodes);



module.exports = router;
