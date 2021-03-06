const express = require("express");
const passport = require("passport");
const {
  shopCreate,
  shopUpdate,
  shopList,
  shopDelete,
  fetchShop,
  productCreate,
} = require("../controllers/shopControllers");

const router = express.Router();
const upload = require("../middleware/multer");

router.param("shopId", async (req, res, next, shopId) => {
  const foundShop = await fetchShop(shopId, next);
  if (foundShop) {
    req.shop = foundShop;
    next();
  } else {
    next({
      status: 404,
      message: "Shop Not Found",
    });
  }
});

//Shop List Route
router.get("/", shopList);

//Shop Update Route
router.put(
  "/:shopId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopUpdate
);

//Shop Create Route
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopCreate
);

//Product Create Route
router.post(
  "/:shopId/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productCreate
);

//Shop Delete Route
router.delete(
  "/:shopId",
  passport.authenticate("jwt", { session: false }),
  shopDelete
);

module.exports = router;
