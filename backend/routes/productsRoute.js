const express = require('express');
const router = express.Router();
const { getProduct, createProduct, getProducts, filterProducts, sortProducts, updateProduct } = require('../controllers/productsController'); // Fix the path

router.get("/getProduct/:Name", getProduct);

router.post("/addProduct", createProduct);

router.get('/filterProducts', filterProducts);
router.get("/sortProducts", sortProducts);

router.put('/updateProduct/:Name', updateProduct)
router.get("/getProducts", getProducts);


module.exports = router;