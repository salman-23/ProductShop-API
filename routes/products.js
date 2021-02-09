const express = require("express");
const {
  productCreate,
  productUpdate,
  productList,
  productDelete,
} = require("../controllers/productControllers");
const db = require("../db/models");

const router = express.Router();

//Product Create Route
router.post("/", productCreate);

//Product Update Route
router.put("/:productId", productUpdate);

//Product List Route
router.get("/", productList);

//Product Delete Route
router.delete("/:productId", productDelete);

db.sequelize.sync();
db.sequelize.sync({ alter: true });

module.exports = router;
