import axios from 'axios';

export const submitproductRating = async (productId, rating, comment, name) => {
    try {
        const response = await axios.post(`/api/productsRoute/${productId}/ratings`, {
            name, // Replace with actual user data if available
            rating,
            comment
        });
        console.log("Rating submitted:", response.data);
        fetchProductss();
    } catch (error) {
        console.error("Error in submitRating:", error);
    }
};

// Fetch ratings for an activity
export const fetchproductRatings = async (productId) => {
    try {
        const response = await axios.get(`/api/productsRoute/${productId}/ratings`);
        return response.data;
    } catch (error) {
        console.error('Error fetching ratings:', error);
        throw error;
    }
};

// Fetch 
export const fetchProductss = async () => {
    try {
        const response = await axios.get('/api/productsRoute');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
