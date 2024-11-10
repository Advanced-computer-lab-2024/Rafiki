import axios from 'axios';

export const submitRating = async (activityId, rating, comment, name) => {
    try {
        const response = await axios.post(`/api/ActivityRoute/${activityId}/ratings`, {
            name, // Replace with actual user data if available
            rating,
            comment
        });
        console.log("Rating submitted:", response.data);
        fetchActivities(); // Refresh activities to get the latest ratings
    } catch (error) {
        console.error("Error in submitRating:", error);
    }
};

// Fetch ratings for an activity
export const fetchRatings = async (activityId) => {
    try {
        const response = await axios.get(`/api/ActivityRoute/${activityId}/ratings`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ratings:', error);
        throw error;
    }
};

// Fetch all activities
export const fetchActivities = async () => {
    try {
        const response = await axios.get('/api/ActivityRoute');
        return response.data;
    } catch (error) {
        console.error('Error fetching activities:', error);
        throw error;
    }
};
