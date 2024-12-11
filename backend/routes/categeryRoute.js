const express = require('express');
const { createCategory, getCategories, updateCategories, deleteCategory } = require('../controllers/categoryController');
const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.put('/:id', updateCategories);
router.delete('/:id', deleteCategory);


module.exports = router;
