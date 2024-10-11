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
    const { budget, date, preferences, accessibility, sort, language, name } = req.query; // Extract query params

    let filter = {}; // Initialize an empty filter object

    // Filter by budget if provided
    if (budget) {
        filter.price = { $lte: Number(budget) }; // Only include itineraries less than or equal to the budget
    }

    // Filter by date if provided
    if (date) {
        const parsedDate = new Date(date);
        if (!isNaN(parsedDate.getTime())) {
            filter.availableDates = { $elemMatch: { $gte: parsedDate } }; // Only include itineraries with dates on or after the specified date
        }
    }

    // Filter by accessibility if provided
    if (accessibility) {
        filter.accessibility = accessibility;
    }

    // Filter by preferences (activities) if provided
    if (preferences) {
        filter.activities = { $in: preferences.split(',') };
    }

    // Filter by language if provided
    if (language) {
        filter.language = language.replace(/"/g, ""); // Remove any double quotes from the query value
    }

    // Filter by name if provided
    if (name) {
        filter.$or = [
            { "activities": { $regex: name, $options: "i" } }, // Match activities
            { "locations": { $regex: name, $options: "i" } }   // Match locations
        ];
    }

    // Sort order by price if specified
    let sortCriteria = {};
    if (sort === "price") {
        sortCriteria.price = 1; // Ascending order by price
    }

    try {
        const itineraries = await ItineraryModel.find(filter).sort(sortCriteria); // Apply the filter and sorting
        res.status(200).json(itineraries); // Send the filtered itineraries
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle errors
    }
};




// Get All Itineraries with Filtering and Sorting
// const getAllItinerary = async (req, res) => {
//     const { budget, date, preferences } = req.query; // Extract query parameters
//     let filter = {}; // Initialize an empty filter object
//     let sort = {};   // Initialize an empty sort object

//     // Filter by budget if provided
//     if (budget) {
//         filter.price = { $lte: budget }; // Only include itineraries less than or equal to the budget
//     }

//     // Filter by date if provided
//     if (date) {
//         const dateObj = new Date(date);
//         filter.availableDates = { $gte: dateObj }; // Only include itineraries available on or after the specified date
//     }

//     // Filter by preferences if provided
//     if (preferences) {
//         filter.accessibility = { $regex: preferences, $options: 'i' }; // Assuming 'preferences' can match the accessibility field
//     }

//     // Sort by price in ascending order
//     sort.price = 1; // Change to -1 for descending order if needed

//     try {
//         const itineraries = await ItineraryModel.find(filter).sort(sort); // Find and sort itineraries based on filters
//         res.status(200).json(itineraries); // Return the filtered itineraries
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

module.exports = { createItinerary, getItinerary, getAllItinerary, updateItinerary, deleteItinerary };