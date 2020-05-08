const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  getUserById,
  getUser,
  updatedUser,
  userPurchaseList,
} = require("../controllers/userController");
const {
  isAuthenticated,
  isAdmin,
  isSignedIn,
} = require("../controllers/authController");

router.param("userId", getUserById);
// this route must be last
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updatedUser);
router.get(
  "/user/:userId/order",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
