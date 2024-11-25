const Cart = require('../models/cart'); 
const Product = require('../models/products');

const addProductToCart = async (req, res) => {
    const { username, productId, amount } = req.body; // Extract username, product ID, and amount from the request body

    try {
        // Ensure the product exists (optional, you can remove if not needed)
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the cart for the user
        let cart = await Cart.findOne({ Username: username });
        if (!cart) {
            // Create a new cart if one doesn't exist
            cart = new Cart({ Username: username, Products: [] });
        }

        // Check if the product already exists in the cart
        const productIndex = cart.Products.findIndex(p => p.product.toString() === productId);

        if (productIndex > -1) {
            // If the product exists, update the amount
            cart.Products[productIndex].amount += amount;
        } else {
            // If the product doesn't exist, add it to the cart
            cart.Products.push({ product: productId, amount });
        }

        // Save the updated cart
        await cart.save();

        res.status(200).json({
            message: 'Product added to cart successfully',
            cart: cart
        });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'An error occurred while adding the product to the cart' });
    }
};


// Controller to get all products in a user's cart
const getCartProducts = async (req, res) => {
    const { username } = req.params; // Assume username is passed as a route parameter
    try {
        // Find the cart by username and populate the Products field
        const cart = await Cart.findOne({ Username: username }).populate('Products.product');
        res.status(200).json({
            products: cart.Products
        });
    } catch (error) {
        console.error('Error retrieving cart:', error);
        res.status(500).json({ message: 'An error occurred while retrieving the cart' });
    }
};

const removeProductFromCart = async (req, res) => {
    const { username, productId, amount } = req.body; // Extract username, product ID, and amount from the request body

    try {
        // Find the cart by username
        const cart = await Cart.findOne({ Username: username });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for the specified user' });
        }

        // Find the product in the cart
        const productIndex = cart.Products.findIndex(p => p.product.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }

        // Reduce the amount or remove the product entirely
        if (cart.Products[productIndex].amount > amount) {
            // Reduce the amount
            cart.Products[productIndex].amount -= amount;
        } else {
            // Remove the product if the amount to remove is greater than or equal to the current amount
            cart.Products.splice(productIndex, 1);
        }

        // Save the updated cart
        await cart.save();

        res.status(200).json({
            message: 'Product updated/removed from cart successfully',
            cart: cart
        });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ message: 'An error occurred while updating the product in the cart' });
    }
};


const removeCompleteCart = async (req, res) => {
    const { username } = req.body; // Get the username from the request body

    try {
        // Find and delete the bookmark document by username
        const deletedBookmark = await Cart.findOneAndDelete({ Username: username });

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
    getCartProducts,addProductToCart,removeProductFromCart,removeCompleteCart
};


