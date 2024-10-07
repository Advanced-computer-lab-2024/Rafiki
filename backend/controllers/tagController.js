const Tag = require('../models/Tag'); // Adjust the path as necessary

// Create a new Tag
const createTag = async (req, res) => {
    const { name } = req.body;

    try {
        const newTag = await Tag.create({ name });
        res.status(201).json(newTag);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all categories
const getTag = async (req, res) => {
    try {
        const categories = await Tag.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createTag, getTag };
