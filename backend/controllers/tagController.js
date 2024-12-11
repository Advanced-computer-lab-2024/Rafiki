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


const updateTag = async (req, res) => {
    const { id } = req.params;
    console.log('Received update request for ID:', id, 'with body:', req.body); // Log the ID and body
    try {
        const updatedTag = await Tag.findByIdAndUpdate(id, req.body, {
            new: true, 
            runValidators: true
        });

        if (!updatedTag) {
            return res.status(404).json({ error: "Tag not found." });
        }

        res.status(200).json(updatedTag);  // Return the updated category
    } catch (error) {
        console.error('Error updating Tag:', error); // Log the error
        res.status(400).json({ error: error.message });
    }
};



const deleteTag = async (req, res) => {
    const { id } = req.params;
    console.log('Received delete request for ID:', id); // Log the ID

    try {
        const deletedTag = await Tag.findByIdAndDelete(id);

        if (!deletedTag) {
            return res.status(404).json({ error: "Tag not found." });
        }

        res.status(200).json({ message: "Tag deleted successfully." });
    } catch (error) {
        console.error('Error deleting Tag:', error); // Log the error
        res.status(400).json({ error: error.message });
    }
};







module.exports = { createTag, getTag, updateTag,deleteTag   };
