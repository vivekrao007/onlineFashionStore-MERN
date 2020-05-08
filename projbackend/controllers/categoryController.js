const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        err: "no category is found",
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        err: "unable to create category",
      });
    }
    return res.json(category);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategorys = (req, res) => {
  Category.find((err, categories) => {
    if (err || !categories) {
      return res.status(400).json({
        err: "unable to fetch categories",
      });
    }
    return res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  Category.findByIdAndUpdate(
    { _id: req.category._id },
    { $set: req.body },
    { new: true, userFindAndModify: false },
    (err, category) => {
      if (err || !category) {
        return res.status(400).json({
          err: "unable to update details",
        });
      }
      return res.json(category);
    }
  );
};

exports.removeCategory = (req, res) => {
  Category.findByIdAndDelete({ _id: req.category._id }, (err, category) => {
    if (err || !category) {
      return res.status(400).json({
        err: "unable to delete details",
        err1: err,
      });
    }
    return res.json(category);
  });
};
