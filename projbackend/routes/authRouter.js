const express = require("express");
const router = express.Router();
const {
  signout,
  signup,
  signin,
  isSignedIn,
} = require("../controllers/authController");
const { check } = require("express-validator");

router.get("/signout", signout);
router.post(
  "/signup",
  [
    check("password")
      .isLength({ min: 5 })
      .withMessage("password must be atleast 5 digits"),
    check("email").isEmail().withMessage("invalid email"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("email is field required"),
    check("password")
      .isLength({ min: 1 })
      .withMessage("password is field required"),
  ],
  signin
);

router.get("/test", (req, res) => {
  return res.json({ message: "working" });
});

module.exports = router;
