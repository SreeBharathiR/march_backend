const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, authorize } = require("../middlewares/authMiddlewares");

const productRoutes = express.Router();

// Anyone - done
productRoutes.get("/", getAllProducts);

// Login users - Done
productRoutes.get("/:id", protect, getProductById);

// Login users and Admin or Super_admin
productRoutes.post(
  "/",
  protect,
  authorize(["admin", "super_admin"]),
  createProduct
);
productRoutes.put(
  "/:id",
  protect,
  authorize(["admin", "super_admin"]),
  updateProduct
);

// Login users and Super_admin
productRoutes.delete(
  "/:id",
  protect,
  authorize(["super_admin"]),
  deleteProduct
);

module.exports = productRoutes;
