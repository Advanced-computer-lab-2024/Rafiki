const express = require('express');
const { createTourguide, getTourguide,acceptTerms,loginTourGuide, updateTourguide, getAlltour, changePassword, uploadTourGuidePicture ,addRatingToTourGuide,getTourguideRatings} = require('../controllers/tourguideController');
const multer = require('multer'); // Import multer if not already imported
const path = require('path');

const router = express.Router();

// Configure multer for uploading pictures
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/tourGuidePictures')); // Ensure directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

router.post('/', createTourguide);
router.get('/:id', getTourguide);
router.put('/:id', updateTourguide);
router.get('/', getAlltour);
router.post('/changePassword', changePassword);
router.post('/accept-terms', acceptTerms);
router.post('/login', loginTourGuide);

// Route for uploading Tour Guide picture
router.post('/:id/upload-picture', upload.single('picture'), uploadTourGuidePicture);
router.post('/:id/ratings', addRatingToTourGuide); // Add a rating
router.get('/:id/ratings', getTourguideRatings);   // Get all ratings for a tour guide

module.exports = router;
