const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductInCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});
const orderSchema = new mongoose.Schema(
  {
    products: [ProductInCartSchema],
    transaction_id: {},
    amount: {
      type: Number,
    },
    status: {
      type: String,
      default: "Recieved",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"],
    },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
const ProductsInCart = mongoose.model("ProductsInCart", ProductInCartSchema);
module.exports = { Order, ProductsInCart };
