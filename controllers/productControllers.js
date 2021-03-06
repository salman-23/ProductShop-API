const { Product, Shop } = require("../db/models");

// fetch is not a controller just a function
exports.fetchProduct = async (productId, next) => {
  try {
    const foundProduct = await Product.findByPk(productId);
    return foundProduct;
  } catch (error) {
    next(error);
  }
};

//Product Update
exports.productUpdate = async (req, res, next) => {
  try {
    const foundShop = await Shop.findByPk(req.product.shopId);
    if (req.user.id === foundShop.userId) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      await req.product.update(req.body);
      res.status(200).json(req.product);
      //send back the updated product
    } else {
      next({
        status: 401,
        message: "You Shall Not Pass!!",
      });
    }
  } catch (error) {
    next(error);
  }
};

//Product List

exports.productList = async (req, res, next) => {
  try {
    const _products = await Product.findAll({
      // attributes: req.body,
      // include: {
      //   model: Shop,
      //   as: "shops",
      //   attributes: ["id"],
      // },
    });
    res.status(200).json(_products);
  } catch (error) {
    next(error);
  }
};

//Product Delete

exports.productDelete = async (req, res, next) => {
  try {
    const foundShop = await Shop.findByPk(req.product.shopId);
    if (req.user.id === foundShop.userId) {
      await req.product.destroy();
      res.status(204).end();
    } else {
      next({
        status: 401,
        message: "You Shall Not Pass!!",
      });
    }
  } catch (error) {
    next(error);
  }
};
