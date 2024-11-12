const express = require('express');
const router = express.Router();
const { getProduct, upload, createProduct, getProducts, filterProducts, sortProducts, updateProduct, archiveProduct,  getArchivedProducts, addRatingToProduct,getproductRating } = require('../controllers/productsController');

// Route to get a product by name
router.get("/getProduct/:name", getProduct);

// Route to create a new product
router.post("/addProduct", upload.single('Picture'), createProduct);

// Route to filter products by price
router.get('/filterProducts', filterProducts);

// Route to sort products by ratings
router.get("/sortProducts", sortProducts);

// Route to update a product by name (add multer for file upload)
router.put('/updateProduct/:name', upload.single('Picture'), updateProduct);

// Route to get all products
router.get("/", getProducts);

router.put('/archiveProduct/:id', archiveProduct);

router.get('/viewArchived', getArchivedProducts);

// New routes for ratings
router.post('/:id/ratings', addRatingToProduct); 
router.get('/:id/ratings', getproductRating);   

module.exports = router;

