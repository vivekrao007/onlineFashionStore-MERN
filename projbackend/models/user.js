const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    userinfo: {
      type: String,
      trim: true,
    },
    encrypted_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// virtual
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encrypted_password = this.getEncryptedPassword(password);
  })
  .get(function () {
    this._password;
  });

// method
userSchema.methods = {
  getEncryptedPassword: function (plantext) {
    if (!plantext) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plantext)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },

  authenticate: function (plantext) {
    return this.getEncryptedPassword(plantext) === this.encrypted_password
      ? true
      : false;
  },
};

module.exports = mongoose.model("User", userSchema);
