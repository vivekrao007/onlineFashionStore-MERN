const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Category", categorySchema);