// sellerRoute.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { 
    createSeller, 
    getSeller, 
    updateSeller, 
    getAllSellers, 
    changePassword, 
    uploadSellerPicture, 
    deleteSellerIfAllowed ,
    loginSeller
} = require('../controllers/sellerController');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/sellerPictures')); // Ensure this path exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Routes
router.post('/login', loginSeller);
router.post('/', upload.single('picture'), createSeller); // Use multer middleware here for file upload
router.get('/:id', getSeller);
router.put('/:id', updateSeller);
router.get('/', getAllSellers);
router.post('/changePassword', changePassword);
router.delete('/deleteRequest/:id', deleteSellerIfAllowed); // Fixed the reference here

module.exports = router;
