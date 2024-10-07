const Category = require('../models/Catogery'); // Adjust the path as necessary

// Create a new category
const createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createCategory, getCategories };
