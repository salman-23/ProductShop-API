const { Shop, Product } = require("../db/models");

// fetch is not a controller just a function
exports.fetchShop = async (shopId, next) => {
  try {
    const foundShop = await Shop.findByPk(shopId);
    return foundShop;
  } catch (error) {
    next(error);
  }
};

//Shop Create
exports.shopCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

//Shop Update
exports.shopUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.shop.update(req.body);
    // res(204).end();
    res.json(req.shop);
    //send back the updated shop
  } catch (error) {
    next(error);
  }
};

//Shop List

exports.shopList = async (req, res, next) => {
  try {
    const _shops = await Shop.findAll({
      attributes: req.body,
      include: {
        model: Product,
        as: "products",
        attributes: ["id"],
      },
    });
    res.json(_shops);
  } catch (error) {
    next(error);
  }
};

//Shop Delete

exports.shopDelete = async (req, res, next) => {
  try {
    await req.shop.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

//Product Create
exports.productCreate = async (req, res, next) => {
  try {
    req.body.ShopId = req.shop.id;
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
