const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "no user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encrypted_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};
exports.updatedUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, userFindAndModify: false },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          err: "unable to update details",
        });
      }
      user.salt = undefined;
      user.encrypted_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      return res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  console.log(req.profile);
  Order.find({ user: req.profile._id })
    .pouplate("user", "_id firstname")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          err: "cannot find user purchase list details",
        });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transactionId: req.body.order.transactionId,
    });
  });
  // store data in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchaseList) => {
      if (err || !purchaseList) {
        return res.status(400).json({
          err: "unable to save purchase list",
        });
      }
      next();
    }
  );
};
