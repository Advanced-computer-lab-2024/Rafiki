const Category = require('../models/category'); // Adjust the path as necessary

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

const updateCategories = async (req, res) => {
    const { id } = req.params;
    console.log('Received update request for ID:', id, 'with body:', req.body); // Log the ID and body
    try {
        const updatedcategory = await Category.findByIdAndUpdate(id, req.body, {
            new: true, 
            runValidators: true
        });

        if (!updatedcategory) {
            return res.status(404).json({ error: "Category not found." });
        }

        res.status(200).json(updatedcategory);  // Return the updated category
    } catch (error) {
        console.error('Error updating category:', error); // Log the error
        res.status(400).json({ error: error.message });
    }
};
// Delete Category
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    console.log('Received delete request for ID:', id); // Log the ID

    try {
        const deletedcategory = await Category.findByIdAndDelete(id);

        if (!deletedcategory) {
            return res.status(404).json({ error: "Category not found." });
        }

        res.status(200).json({ message: "Category deleted successfully." });
    } catch (error) {
        console.error('Error deleting category:', error); // Log the error
        res.status(400).json({ error: error.message });
    }
};





module.exports = { createCategory, getCategories , updateCategories, deleteCategory };
