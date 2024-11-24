const Wishlist = require('../models/wishlist'); 
const Product = require('../models/products');

const addProductToWishlist = async (req, res) => {
    const { username } = req.body; // Username from the request body
    const { productId } = req.body; // Product ID from the request body

    try {
        // Find the product to ensure it exists
        
        let wishlist = await Wishlist.findOne({ Username: username });
        if (!wishlist) {
            wishlist = new Wishlist({ Username: username, Products: [] });
        }

        // Check if the product is already in the wishlist
        if (wishlist.Products.includes(productId)) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        // Add the product ID to the wishlist
        wishlist.Products.push(productId);

        // Save the updated wishlist
        await wishlist.save();

        res.status(200).json({
            wishlist: wishlist
        });
    } catch (error) {
        console.error('Error adding product to wishlist:', error);
        res.status(500).json({ message: 'An error occurred while adding the product to the wishlist' });
    }
};

// Controller to get all products in a user's wishlist
const getWishlistProducts = async (req, res) => {
    const { username } = req.params; // Assume username is passed as a route parameter
    try {
        // Find the wishlist by username and populate the Products field
        const wishlist = await Wishlist.findOne({ Username: username }).populate('Products');
        res.status(200).json({
            products: wishlist.Products
        });
    } catch (error) {
        console.error('Error retrieving wishlist:', error);
        res.status(500).json({ message: 'An error occurred while retrieving the wishlist' });
    }
};

const removeProductFromWishlist = async (req, res) => {
    const { username } = req.body; // Username from the request body
    const { productId } = req.body; // Product ID from the request body

    try {
        // Find the wishlist by username
        const wishlist = await Wishlist.findOne({ Username: username });
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found for the specified user' });
        }

        // Check if the product exists in the wishlist
        const productIndex = wishlist.Products.indexOf(productId);

        // Remove the product from the wishlist
        wishlist.Products.splice(productIndex, 1);

        // Save the updated wishlist
        await wishlist.save();

        res.status(200).json({
            message: 'Product removed from wishlist successfully',
            wishlist: wishlist
        });
    } catch (error) {
        console.error('Error removing product from wishlist:', error);
        res.status(500).json({ message: 'An error occurred while removing the product from the wishlist' });
    }
};

module.exports = {
    getWishlistProducts,addProductToWishlist,removeProductFromWishlist
};
