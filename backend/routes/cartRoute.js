const express = require('express')
const { getCartProducts,addProductToCart,removeProductFromCart,removeCompleteCart, updateProductAmount} = require('../controllers/cartController');

const router = express.Router()

router.post('/', addProductToCart);
router.delete('/', removeCompleteCart);
router.get('/:username', getCartProducts);
router.post('/remove', removeProductFromCart);
router.post('/updateAmount', updateProductAmount);


module.exports = router