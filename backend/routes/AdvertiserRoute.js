const express = require('express');
const {
  createAdvertiser,
  getAdvertiser,
  getAdvertisers,
  updateAdvertiser,
  changePassword,
  requestAccountDeletion
} = require('../controllers/AdvertiserController');
const multer = require('multer');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // generate a unique filename
  }
});
const upload = multer({ storage: storage });

// Route to create a new advertiser with a profile picture upload
router.post("/", upload.single('profilePicture'), createAdvertiser);

// Route to update an advertiser's details by ID
router.put('/:id', updateAdvertiser);

// Route to get a single advertiser by ID
router.get("/:id", getAdvertiser);

// Route to get a list of all advertisers
router.get("/", getAdvertisers);

// Route to change an advertiser's password
router.post('/changePassword', changePassword);

// Route to request account deletion with specific conditions
router.delete('/deleteAccount/:id', requestAccountDeletion);

module.exports = router;
