const express = require('express')
const { getCartProducts,addProductToCart,removeProductFromCart,removeCompleteCart} = require('../controllers/cartController');

const router = express.Router()

router.post('/', addProductToCart);
router.get('/:username', getCartProducts);
router.post('/remove', removeProductFromCart);
router.delete('/', removeCompleteCart);


module.exports = router