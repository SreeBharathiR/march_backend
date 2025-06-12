const Product = require("../models/Product.js");

// Create
const createProduct = async (req, res, next) => {
  try {
    const productData = req.body;

    const product = await Product.create(productData);

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Read All
const getAllProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      minRating,
      page = 1,
      limit = 5,
    } = req.query;

    const query = {};

    if (search && search.trim()) {
      query.title = { $regex: search, $options: "i" }; // Case-insensitive
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = parseFloat(maxPrice);
      }
    }

    if (minRating) {
      // query.rating = {};
      // query.rating.rate = { $gte: parseFloat(minRating) };

      query["rating.rate"] = { $gte: parseFloat(minRating) };
    }

    const total = await Product.countDocuments(query);

    const skipNumber = (page - 1) * limit;
    const limitNumber = parseInt(limit);

    const products = await Product.find(query)
      .skip(skipNumber)
      .limit(limitNumber);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      products,
    });
  } catch (error) {
    next(error);
  }
};

// Read by ID
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      return next(error);
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Update
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productData = req.body;

    const product = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Delete
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
      return res.status(404).json({
        message: "Not found",
      });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
