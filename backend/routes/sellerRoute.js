const express = require('express');
const router = express.Router();
const { createSeller, getSeller, updateSeller, getAllSellers } = require('../controllers/sellerController');

// Routes
router.post('/', createSeller);
router.get('/:id', getSeller);
router.put('/:id', updateSeller);
router.get('/', getAllSellers);

module.exports = router;
