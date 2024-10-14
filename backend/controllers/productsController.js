// const productsModel = require('../models/products');

// const getProduct = async (req, res) => {
//   const { name } = req.params;

//   try {
//     const product = await productsModel.findOne({ Name: { $regex: new RegExp(name, "i") } });
    
//     if (!product) {
//       return res.status(404).json({ message: "Product not found." });
//     }
    
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };


// const getProducts = async (req, res) => {
//   try {
//     const products = await productsModel.find({}).sort({ createdAt: -1 });

//     if (!products.length) {
//       return res.status(404).json({ message: "No products found." });
//     }

//     res.status(200).json(products); // Return the list of advertisers
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const createProduct = async (req, res) => {
//   const { Name, Picture, Price, Description, Seller, Ratings, Reviews, AvailableQuantity } = req.body;

//   try {
//     const product = await productsModel.create({
//       Name,
//       Picture,
//       Price,
//       Description,
//       Seller,
//       Ratings,
//       Reviews,
//       AvailableQuantity
//     });

//     res.status(201).json(product);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const filterProducts = async (req, res) => {
//   const maxPrice = parseFloat(req.query.price);

//   if (isNaN(maxPrice)) {
//     return res.status(400).json({ error: "Please provide a valid number for the price filter." });
//   }

//   try {
//     const products = await productsModel.find({ Price: { $lte: maxPrice } });

//     if (products.length === 0) {
//       return res.status(404).json({ message: "No products found under this price." });
//     }

//     res.status(200).json(products);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const sortProducts = async (req, res) => {
//   try {
//     // Get sort order from query parameters; default to descending if not provided
//     const sortOrder = req.query.order === 'asc' ? 1 : -1; // 1 for ascending, -1 for descending

//     const products = await productsModel.find().sort({ Ratings: sortOrder });

//     if (products.length === 0) {
//       return res.status(200).json({ message: "No products found.", products: [] });
//     }

//     res.status(200).json(products);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const updateProduct = async (req, res) => {
//   const {name} = req.params; // Get the product name from the request parameters
//   const { Description, Price } = req.body; // Get the fields to update from the request body

//   try {
//     const product = await productsModel.findOneAndUpdate(
//       {Name:name}, // Search for the product by name
//       {Description, Price}, // Update the specified fields
//       {new: true, runValidators: true} // Return the updated document and run validators
//     );

//     if (!product) {
//       return res.status(404).json({ message: "Product not found." });
//     }

//     res.status(200).json(product); // Return the updated product
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = { createProduct, getProduct, getProducts, filterProducts, sortProducts, updateProduct };
// controllers/productsController.js
const productsModel = require('../models/products');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Save files to the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
  }
});

// Initialize multer
const upload = multer({ storage });

// Function to handle getting a single product by name
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

// Function to handle getting all products
const getProducts = async (req, res) => {
  try {
    const products = await productsModel.find({}).sort({ createdAt: -1 });

    if (!products.length) {
      return res.status(404).json({ message: "No products found." });
    }

    res.status(200).json(products); // Return the list of products
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to handle creating a new product
const createProduct = async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);

  const { Name, Price, Description, Seller, Ratings = 0, Reviews = 0, AvailableQuantity } = req.body;
  const Picture = req.file ? req.file.filename : null; // Save only the filename

  try {
    // Validate required fields
    if (!Name || !Price || !Description || !Seller || !AvailableQuantity) {
      return res.status(400).json({ error: "All fields are required." });
    }

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
    console.error('Error creating product:', error); // Log the error for debugging
    res.status(400).json({ error: error.message });
  }
};

// Function to filter products by price
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

// Function to sort products by ratings
const sortProducts = async (req, res) => {
  try {
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
  const { name } = req.params;
  const { Description, Price, Seller, Ratings, Reviews, AvailableQuantity } = req.body;
  let Picture;

  try {
    const product = await productsModel.findOne({ Name: name });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    console.log('Uploaded File:', req.file);

    if (req.file) {
      const oldImagePath = path.join(__dirname, '../uploads', product.Picture);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log(`Deleted old image: ${oldImagePath}`);
      } else {
        console.log(`No old image found at: ${oldImagePath}`);
      }

      Picture = req.file.filename; 
    } else {
      Picture = product.Picture; 
    }

    const updatedProduct = await productsModel.findOneAndUpdate(
      { Name: name },
      { Description, Price, Seller, Ratings, Reviews, AvailableQuantity, Picture },
      { new: true, runValidators: true }
    );

    console.log('Updated Product:', updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Update Error:', error);
    res.status(400).json({ error: error.message });
  }
};




module.exports = { createProduct, getProduct, getProducts, filterProducts, sortProducts, updateProduct, upload };
