const express = require('express')
const { getWishlistProducts,addProductToWishlist,removeProductFromWishlist} = require('../controllers/wishlistController');

const router = express.Router()

router.post('/', addProductToWishlist);
router.get('/:username', getWishlistProducts);
router.post('/remove', removeProductFromWishlist);


module.exports = router