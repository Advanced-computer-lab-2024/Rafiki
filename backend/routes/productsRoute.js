const express = require('express');
const router = express.Router();
const { getProduct, createProduct, getProducts, filterProducts, sortProducts, updateProduct } = require('../controllers/productsController'); // Fix the path

router.get("/getProduct/:Name", getProduct);

router.post("/addProduct", createProduct);

router.get('/filterProducts', filterProducts);
router.get("/sortProducts", sortProducts);

router.put('/updateProduct/:name', updateProduct)
router.get("/", getProducts);


module.exports = router;