const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// ##  REGISTER USER ##
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      err: errors.errors[0].msg,
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err1: "unable to save user to DB",
        err: errors.errors[0].msg,
      });
    }
    return res.json({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      id: user._id,
    });
  });
};

// ## LOGIN USER ##
exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log();
    return res.status(422).json({
      err: errors.errors[0].msg,
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "email is incorrect",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        err: "incorrect password",
      });
    }

    // generate token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET
    );
    // assign cookie
    res.cookie("token", token, { expirse: new Date() + 9999 });

    // return response
    return res.json({
      token: token,
      user: {
        id: user._id,
        firstname: user.firstname,
        email: user.email,
        role: user.role,
      },
    });
  });
};

// ## LOGOUT USER ##
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User sign out",
  });
};

// ### Protected Routs ###

exports.isSignedIn = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth.id;
  if (!checker) {
    return res.status(403).json({
      err: "ACCESS DENIED",
    });
  }
  next();
};
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      err: "not an admin, access denied",
    });
  }
  next();
};
