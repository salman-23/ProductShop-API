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
    const foundShop = await Shop.findOne({ where: { userId: req.user.id } });

    if (foundShop) {
      next({
        status: 400,
        message: "You Can Not Create A Shop!!",
      });
    } else {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      req.body.userId = req.user.id; // req.user is coming from jwt strategy
      //no id in URL for post in shops
      const newShop = await Shop.create(req.body);
      res.status(201).json(newShop);
    }
  } catch (error) {
    next(error);
  }
};

//Shop Update
exports.shopUpdate = async (req, res) => {
  if (req.file) {
    req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
  }
  await req.shop.update(req.body);
  res.status(200).json(req.shop);
  //send back the updated shop
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

//Product Create
exports.productCreate = async (req, res, next) => {
  try {
    // passport vs model
    if (req.user.id === req.shop.userId) {
      if (req.file) {
        // coming form route parmes middleare
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      req.body.shopId = req.shop.id;
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } else {
      next({
        status: 404,
        message: "You Shall Not Pass!!",
      });
    }
  } catch (error) {
    next(error);
  }
};

//Shop Delete
exports.shopDelete = async (req, res, next) => {
  await req.shop.destroy();
  res.status(204).end();
};
