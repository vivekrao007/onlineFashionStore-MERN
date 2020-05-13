const express = require("express");
const router = express.Router();
const { makePayment } = require("../controllers/stripePaymentController");

router.post("/stripepayment", makePayment);

module.exports = router;
