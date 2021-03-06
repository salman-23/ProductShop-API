const express = require("express");
const {
  productUpdate,
  productList,
  productDelete,
  fetchProduct,
} = require("../controllers/productControllers");
const passport = require("passport");

const router = express.Router();
const upload = require("../middleware/multer");

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

//Product List Route
router.get("/", productList);

//Product Update Route
router.put(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productUpdate
);

//Product Delete Route
router.delete(
  "/:productId",
  passport.authenticate("jwt", { session: false }),
  productDelete
);

module.exports = router;
