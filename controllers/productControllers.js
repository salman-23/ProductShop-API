const { Product } = require("../db/models");

//Product Create
exports.productCreate = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

//Product Update
exports.productUpdate = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Product.findByPk(productId);
    if (foundProduct) {
      await foundProduct.update(req.body);
      res.status(204).end();
    } else {
      err = {
        status: 404,
        message: "Sorry Product Not Found!",
      };
      next(err);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Product List

exports.productList = async (req, res, next) => {
  try {
    const _products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(_products);
  } catch (error) {
    next(error);
  }
};

//Product Delete

exports.productDelete = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Product.findByPk(productId);
    if (foundProduct) {
      await foundProduct.destroy();
      res.status(204).end();
    } else {
      err = {
        status: 404,
        message: "Sorry Product Not Found!",
      };
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
