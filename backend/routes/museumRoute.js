const express = require('express');
const { createMuseum, getMuseum, getMuseums, updateMuseum, deleteMuseum,searchMuseumbyName,searchMuseumbyTag } = require('../controllers/museumController');
const router = express.Router();

// Create a new museum
router.post('/', createMuseum);

// Get all museums
router.get('/', getMuseums);

// Get a single museum by ID
router.get('/:id', getMuseum);

// Update a museum by ID
router.put('/:id', updateMuseum);

// Delete a museum by ID
router.delete('/:id', deleteMuseum);


router.get('/search/:name', searchMuseumbyName);
router.get('/searchT/:tag', searchMuseumbyTag);

module.exports = router;
