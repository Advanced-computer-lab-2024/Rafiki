const express = require('express');
const {
    createTourguide,
  getTourguide,
  acceptTerms,
  loginTourGuide,
  updateTourguide,
  getAlltour,
  changePassword,
  uploadTourGuidePicture,
  addRatingToTourGuide,
  getTourguideRatings,
    getTotalTouristsForTourGuide
} = require('../controllers/tourguideController');

const multer = require('multer'); // Import multer if not already imported
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/tourGuidePictures')); // Ensure directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });
// Middleware for handling non-file `FormData`
const parseFormData = multer().none();

// Routes
router.post('/', parseFormData, createTourguide); // Parse FormData for `createTourguide`
// Routes for tour guide functionalities
router.post('/', createTourguide);

router.get('/:id', getTourguide);
router.put('/:id', updateTourguide);
router.get('/', getAlltour);
router.post('/changePassword', changePassword);
router.post('/accept-terms', acceptTerms);
router.post('/login', loginTourGuide);

// Route for uploading Tour Guide picture
router.post('/:id/upload-picture', upload.single('picture'), uploadTourGuidePicture);

// Routes for ratings
router.post('/:id/ratings', addRatingToTourGuide); // Add a rating
router.get('/:id/ratings', getTourguideRatings);   // Get all ratings for a tour guide
router.get('/:tourGuideId/tourists-total', getTotalTouristsForTourGuide);
// Add this to your routes configuration

module.exports = router;
