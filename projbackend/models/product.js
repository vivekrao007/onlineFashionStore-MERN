const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      maxlength: 32,
    },
    description: {
      type: String,
      require: true,
      trim: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      require: true,
      maxlength: 32,
      trim: true,
    },
    stock: {
      type: Number,
    },
    soldUnits: {
      type: Number,
      default: 0,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      require: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);