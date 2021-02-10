const { Product } = require("../db/models");

// fetch is not a controller just a function
exports.fetchProduct = async (productId, next) => {
  try {
    const foundProduct = await Product.findByPk(productId);
    return foundProduct;
  } catch (error) {
    next(error);
  }
};

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
  try {
    await req.product.update(req.body);
    res.status(204).end();
  } catch (error) {
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
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
