const express = require('express');
const { createTourguide, getTourguide, updateTourguide, getAlltour, changePassword, uploadTourGuidePicture } = require('../controllers/tourguideController');
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

// Route for uploading Tour Guide picture
router.post('/:id/upload-picture', upload.single('picture'), uploadTourGuidePicture);

module.exports = router;
