const express = require("express");
const router = express.Router();
const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategorys,
  updateCategory,
  removeCategory,
} = require("../controllers/categoryController");
const {
  isAdmin,
  isAuthenticated,
  isSignedIn,
} = require("../controllers/authController");
const { getUserById } = require("../controllers/userController");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);
router.put(
  "/category/update/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);
router.delete(
  "/category/delete/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategorys);

module.exports = router;
