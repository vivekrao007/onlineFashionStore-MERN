const express = require("express");
const router = express.Router();
const {
  isAdmin,
  isAuthenticated,
  isSignedIn,
} = require("../controllers/authController");
const {
  getUserById,
  pushOrderInPurchaseList,
} = require("../controllers/userController");
const { updateStock } = require("../controllers/productController");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
} = require("../controllers/orderController");

router.param("userId", getUserById);
router.param("orderId", getOrderById);

router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);
router.get(
  "/order/status/:userId/:orderId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);
module.exports = router;
