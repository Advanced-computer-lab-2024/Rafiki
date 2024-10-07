const ItineraryModel = require('../models/itinerary'); 
const Tourguide = require('../models/Tourguide');

// Create Itinerary
const createItinerary = async (req, res) => {
    const { tourGuideUsername, activities, locations, timeline, duration, language, price, availableDates, accessibility, pickupLocation, dropOffLocation } = req.body;

    try {
        const tourGuide = await Tourguide.findOne({ Username: tourGuideUsername });
        if (!tourGuide) {
            return res.status(404).json({ message: 'Tour guide not found.' });
        }

        const newItinerary = await ItineraryModel.create({
            tourGuideId: tourGuide._id,
            activities,
            locations,
            timeline,
            duration,
            language,
            price,
            availableDates,
            accessibility,
            pickupLocation,
            dropOffLocation,
        });

        res.status(201).json(newItinerary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Itinerary
const getItinerary = async (req, res) => {
    const { id } = req.params;
    try {
        const itinerary = await ItineraryModel.findById(id);

        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found." });
        }

        if (req.tourguide && itinerary.tourGuideId.toString() !== req.tourguide.id) {
            return res.status(403).json({ message: "Unauthorized access." });
        }

        res.status(200).json(itinerary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Itinerary
const updateItinerary = async (req, res) => {
    const { id } = req.params;
    try {
        const itinerary = await ItineraryModel.findById(id);
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found." });
        }

        if (req.tourguide && itinerary.tourGuideId.toString() !== req.tourguide.id) {
            return res.status(403).json({ message: "Unauthorized access." });
        }

        const updatedItinerary = await ItineraryModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        res.status(200).json(updatedItinerary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Itinerary
const deleteItinerary = async (req, res) => {
    const { id } = req.params;
    const { tourGuideUsername } = req.body;

    try {
        const tourGuide = await Tourguide.findOne({ Username: tourGuideUsername });
        if (!tourGuide) {
            return res.status(404).json({ message: "Tour guide not found." });
        }

        const itinerary = await ItineraryModel.findById(id);
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found." });
        }

        if (itinerary.tourGuideId.toString() !== tourGuide._id.toString()) {
            return res.status(403).json({ message: "Unauthorized access." });
        }

        await ItineraryModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Itinerary deleted successfully." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getAllItinerary = async (req, res) => {
    try {
        const itineraries = await ItineraryModel.find({}); 
        res.status(200).json(itineraries); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = { createItinerary, getItinerary, getAllItinerary, updateItinerary, deleteItinerary };