const express = require("express");
const { checkout } = require("../controllers/orderControllers");
const passport = require("passport");

const router = express.Router();

router.post(
  "/checkout",
  passport.authenticate("jwt", { session: false }),
  checkout
);

module.exports = router;
