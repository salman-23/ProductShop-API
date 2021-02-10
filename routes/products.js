const express = require("express");
const {
  productCreate,
  productUpdate,
  productList,
  productDelete,
  fetchProduct,
} = require("../controllers/productControllers");
const db = require("../db/models");

const router = express.Router();

router.param("productId", async (req, res, next, productId) => {
  const foundProduct = await fetchProduct(productId, next);
  if (foundProduct) {
    req.product = foundProduct;
    next();
  } else {
    next({
      status: 404,
      message: "Product Not Found",
    });
  }
});
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
