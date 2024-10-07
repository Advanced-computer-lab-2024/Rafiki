const express = require('express');
const { createTag, getTag } = require('../controllers/tagController');
const router = express.Router();

router.post('/', createTag);
router.get('/', getTag);

module.exports = router;
