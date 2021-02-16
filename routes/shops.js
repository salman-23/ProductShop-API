const express = require("express");
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

//Shop Create Route
router.post("/", upload.single("image"), shopCreate);

//Shop Update Route
router.put("/:shopId", upload.single("image"), shopUpdate);

//Shop List Route
router.get("/", shopList);

//Shop Delete Route
router.delete("/:shopId", shopDelete);

//Product Create Route
router.post("/:shopId/products", upload.single("image"), productCreate);

module.exports = router;
