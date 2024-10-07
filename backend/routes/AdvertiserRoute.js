const express = require('express');
const { createAdvertiser, getAdvertiser, getAdvertisers, updateAdvertiser } = require('../controllers/AdvertiserController'); // Update to your file structure
const router = express.Router();

router.post("/",createAdvertiser);
router.put('/:id',updateAdvertiser);
router.get("/:id", getAdvertiser);
router.get("/", getAdvertisers);


module.exports = router;
