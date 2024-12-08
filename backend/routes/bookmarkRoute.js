const express = require('express');
const router = express.Router();
const { addToBookmark, getBookmarks, removeFromBookmark ,removeCompleteBookmark,requestToBeNotified} = require('../controllers/bookmarkController'); // Replace with the correct path

// Route to add an item to bookmarks
router.post('/', addToBookmark);
router.post('/request', requestToBeNotified);

// Route to get all bookmarks for a user
router.get('/:username', getBookmarks);

// Route to remove an item from bookmarks
router.delete('/remove', removeFromBookmark);



module.exports = router;

