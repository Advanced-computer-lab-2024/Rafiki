const Bookmark = require('../models/bookmark'); // Replace with the correct path to your bookmark model

// Function to add an item to the bookmark
const addToBookmark = async (req, res) => {
    const { username, itemId, type } = req.body; // Get username, item ID, and type from request body (type: 'Activities', 'Itineraries', or 'Museums')

    try {
        // Find the user's bookmark or create a new one
        let bookmark = await Bookmark.findOne({ Username: username });

        if (!bookmark) {
            bookmark = new Bookmark({ Username: username });
        }

        // Add the item to the correct field based on the type
        if (type === 'Activities') {
            if (!bookmark.Activities.includes(itemId)) {
                bookmark.Activities.push(itemId);
            }
        } else if (type === 'Itineraries') {
            if (!bookmark.Itineraries.includes(itemId)) {
                bookmark.Itineraries.push(itemId);
            }
        } else if (type === 'Museums') {
            if (!bookmark.Museums.includes(itemId)) {
                bookmark.Museums.push(itemId);
            }
        } else {
            return res.status(400).json({ message: 'Invalid type specified' });
        }

        // Save the bookmark
        await bookmark.save();

        res.status(200).json({ message: `${type} added to bookmarks`, bookmark });
    } catch (error) {
        console.error('Error adding to bookmark:', error);
        res.status(500).json({ message: 'Failed to add to bookmarks' });
    }
};  

const getBookmarks = async (req, res) => {
    const { username } = req.params; // Get username from request parameters

    try {
        // Find the user's bookmarks and populate all fields
        const bookmark = await Bookmark.findOne({ Username: username })
            .populate('Activities') // Populate Activities field
            .populate('Itineraries') // Populate Itineraries field
            .populate('Museums'); // Populate Museums field

        if (!bookmark) {
            return res.status(404).json({ message: 'No bookmarks found for this user' });
        }

        res.status(200).json({ message: 'Bookmarks retrieved successfully', bookmark });
    } catch (error) {
        console.error('Error retrieving bookmarks:', error);
        res.status(500).json({ message: 'Failed to retrieve bookmarks' });
    }
};

const removeFromBookmark = async (req, res) => {
    const { username, itemId, type } = req.body; // Get username, item ID, and type from request body (type: 'Activities', 'Itineraries', or 'Museums')

    try {
        // Find the user's bookmark
        const bookmark = await Bookmark.findOne({ Username: username });

        if (!bookmark) {
            return res.status(404).json({ message: 'Bookmark not found for the specified user' });
        }

        // Remove the item from the correct field based on the type
        if (type === 'Activities') {
            bookmark.Activities = bookmark.Activities.filter(id => id.toString() !== itemId);
        } else if (type === 'Itineraries') {
            bookmark.Itineraries = bookmark.Itineraries.filter(id => id.toString() !== itemId);
        } else if (type === 'Museums') {
            bookmark.Museums = bookmark.Museums.filter(id => id.toString() !== itemId);
        } else {
            return res.status(400).json({ message: 'Invalid type specified' });
        }

        // Save the updated bookmark
        await bookmark.save();

        res.status(200).json({ message: `${type} removed from bookmarks`, bookmark });
    } catch (error) {
        console.error('Error removing from bookmark:', error);
        res.status(500).json({ message: 'Failed to remove from bookmarks' });
    }
};

module.exports = {
    addToBookmark, getBookmarks,removeFromBookmark
};
