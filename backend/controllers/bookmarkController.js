const Bookmark = require('../models/bookmark'); // Replace with the correct path to your bookmark model
const Activity = require('../models/activity'); // Replace with the correct path to your activity model
const Itienary = require('../models/itinerary'); // Replace with the correct path to your itinerary model
const Museum = require('../models/museum'); // Replace with the correct path to your museum model
const Notification=require('../models/notification');

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

const requestToBeNotified = async (req, res) => {
    const { username, activityId } = req.body;

    try {
        // Check if a notification request already exists
        const existingNotification = await Notification.findOne({ username, activityId });
        if (existingNotification) {
            return res.status(400).json({ message: 'You are already subscribed for notifications on this activity.' });
        }

        // Create a new notification request
        const notification = new Notification({ username, activityId });
        await notification.save();

        res.status(200).json({ message: 'You will be notified by mail when booking opens.' });
    } catch (error) {
        console.error('Error requesting notification:', error);
        res.status(500).json({ message: 'Failed to request notification' });
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

        res.status(200).json({ bookmark });
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

const removeCompleteBookmark = async (req, res) => {
    const { username } = req.body; // Get the username from the request body

    try {
        // Find and delete the bookmark document by username
        const deletedBookmark = await Bookmark.findOneAndDelete({ Username: username });

        if (!deletedBookmark) {
            return res.status(404).json({ message: 'Bookmark not found for the specified user' });
        }

        res.status(200).json({
            message: 'Bookmark deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting bookmark:', error);
        res.status(500).json({ message: 'An error occurred while deleting the bookmark' });
    }
};

module.exports = {
    addToBookmark, getBookmarks,removeFromBookmark,removeCompleteBookmark,requestToBeNotified
};
