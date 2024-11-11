import axios from 'axios';
export const submitItineraryRating = async (itineraryId, rating, comment, name) => {
    try {
        console.log("Submitting to server:", { itineraryId, rating, comment, name }); // Log request data
        const response = await axios.post(`/api/itineraryRoute/${itineraryId}/ratings`, {
            name,
            rating,
            comment
        });
        console.log("Response data:", response.data); // Log response data
        return response.data;
    } catch (error) {
        console.error("Error in submitItineraryRating:", error.response?.data || error.message);
        throw error;
    }
};



// Fetch ratings for an activity
export const fetchItineraryRatings = async (itineraryId) => {
    try {
        const response = await axios.get(`/api/itineraryRoute/${itineraryId}/ratings`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ratings:', error);
        throw error;
    }
};

// Fetch all activities
export const fetchItineraries = async () => {
    try {
        const response = await axios.get('/api/itineraryRoute');
        return response.data;
    } catch (error) {
        console.error('Error fetching itineraries:', error);
        throw error;
    }
};
