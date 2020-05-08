const { Order, ProductsInCart } = require("../models/order");
exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "firstname price")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          err: "no order was found in DB",
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err || !order) {
      return res.status(400).json({
        err: "unable to create the order",
      });
    }
    return res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id firstname")
    .exec((err, orders) => {
      if (err || !orders) {
        return res.status(400).json({
          err: "unable to fetch orders",
        });
      }
      return res.json(orders);
    });
};

exports.updateStatus = (req, res) => {
  Order.update(
    {
      _id: req.body.orderId,
    },
    { $set: { status: req.status.body } },
    (err, order) => {
      if (err || !order) {
        return res.status(400).json({
          err: "unable to update order status",
        });
      }
      return res.json(order);
    }
  );
};
exports.getOrderStatus = (req, res) => {
  return res.json(Order.schema.path("status").enumValues);
};
