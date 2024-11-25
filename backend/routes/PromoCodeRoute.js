const express = require('express');
const router = express.Router();
const {
   createPromoCode,
   getAllPromoCodes,
   usePromoCode
} = require('../controllers/PromoCodeController');


router.post('/', createPromoCode);
router.get('/', getAllPromoCodes);
router.post('/use', usePromoCode);


module.exports = router;
