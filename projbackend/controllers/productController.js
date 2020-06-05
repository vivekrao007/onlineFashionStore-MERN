const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Category = require("../models/category");
exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          err: "no product was found in DB",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        err: "file has a problem",
      });
    }
    // get required fields from product model
    const { name, description, price, stock, category } = fields;
    let product = new Product(fields);
    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({
        err: "required field(s) missing",
      });
    }
    // handling file
    if (file.image) {
      // 3mb = 3145728 ( 1024 x 1024 x 3)
      if (file.image.size > 3145728) {
        return res.status(400).json({
          err: "file size is greater than 3mb",
        });
      }
      product.image.data = fs.readFileSync(file.image.path);
      product.image.contentType = file.image.type;
    }
    // save product to fb
    product.save((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          err: "unable to save product details",
        });
      }
      return res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.image = undefined;
  return res.json(req.product);
};

// middleware
exports.image = (req, res, next) => {
  if (req.product.image.data) {
    res.set("Content-Type", req.product.image.contentType);
    return res.send(req.product.image.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.product._id, (err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        err: "unable to delete product",
      });
    }
    deletedProduct.image = undefined;
    return res.json({
      message: "product deleted sucessfully",
      deletedProduct,
    });
  });
};
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        err: "file has a problem",
      });
    }
    let product = req.product;
    product = _.extend(product, fields);
    // handling file
    if (file.image) {
      // 3mb = 3145728 ( 1024 x 1024 x 3)
      if (file.image.size > 3145728) {
        return res.status(400).json({
          err: "file size is greater than 3mb",
        });
      }
      product.image.data = fs.readFileSync(file.image.path);
      product.image.contentType = file.image.type;
    }
    // save product to fb
    product.save((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          err: "unable to update product details",
        });
      }
      return res.json(product);
    });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-image")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err || !products) {
        return res.status(200).json({
          err: "No Product found",
        });
      }
      return res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if (err || !categories) {
      return res.status(400).json({
        err: "no categories found",
      });
    }
    return res.json(categories);
  });
};
exports.updateStock = (req, res, next) => {
  let operations = req.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: {
          _id: product._id,
        },
        update: {
          $inc: { stock: -product.count, soldUnits: +product.count },
        },
      },
    };
  });
  Product.bulkWrite(operations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        err: "bulk operations failed",
      });
    }
    next();
  });
};
