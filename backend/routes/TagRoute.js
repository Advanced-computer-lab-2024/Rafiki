const express = require('express');
const { createTag, getTag, updateTag, deleteTag } = require('../controllers/tagController');
const router = express.Router();

router.post('/', createTag);
router.get('/', getTag);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);


module.exports = router;
