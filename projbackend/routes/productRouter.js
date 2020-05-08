const express = require("express");
const router = express.Router();
const {
  isAdmin,
  isAuthenticated,
  isSignedIn,
} = require("../controllers/authController");
const { getUserById } = require("../controllers/userController");
const {
  getProductById,
  createProduct,
  getProduct,
  image,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/productController");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories);
router.get("/product/:productId", getProduct);
router.get("/product/image/:productId", image);

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

module.exports = router;
