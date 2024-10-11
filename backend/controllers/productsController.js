const productsModel = require('../models/products');

const getProduct = async (req, res) => {
  const { name } = req.params;

  try {
    const product = await productsModel.findOne({ Name: { $regex: new RegExp(name, "i") } });
    
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getProducts = async (req, res) => {
  try {
    const products = await productsModel.find({}).sort({ createdAt: -1 });

    if (!products.length) {
      return res.status(404).json({ message: "No products found." });
    }

    res.status(200).json(products); // Return the list of advertisers
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  const { Name, Picture, Price, Description, Seller, Ratings, Reviews, AvailableQuantity } = req.body;

  try {
    const product = await productsModel.create({
      Name,
      Picture,
      Price,
      Description,
      Seller,
      Ratings,
      Reviews,
      AvailableQuantity
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const filterProducts = async (req, res) => {
  const maxPrice = parseFloat(req.query.price);

  if (isNaN(maxPrice)) {
    return res.status(400).json({ error: "Please provide a valid number for the price filter." });
  }

  try {
    const products = await productsModel.find({ Price: { $lte: maxPrice } });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found under this price." });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sortProducts = async (req, res) => {
  try {
    // Get sort order from query parameters; default to descending if not provided
    const sortOrder = req.query.order === 'asc' ? 1 : -1; // 1 for ascending, -1 for descending

    const products = await productsModel.find().sort({ Ratings: sortOrder });

    if (products.length === 0) {
      return res.status(200).json({ message: "No products found.", products: [] });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const {name} = req.params; // Get the product name from the request parameters
  const { Description, Price } = req.body; // Get the fields to update from the request body

  try {
    const product = await productsModel.findOneAndUpdate(
      {Name:name}, // Search for the product by name
      {Description, Price}, // Update the specified fields
      {new: true, runValidators: true} // Return the updated document and run validators
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(product); // Return the updated product
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createProduct, getProduct, getProducts, filterProducts, sortProducts, updateProduct };