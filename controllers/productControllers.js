const { Product } = require("../db/models");

//Product Create
exports.productCreate = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Product Update
exports.productUpdate = async (req, res) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Product.findByPk(productId);
    if (foundProduct) {
      await foundProduct.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Sorry Product Not Found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//Product List

exports.productList = async (req, res) => {
  try {
    const _products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(_products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Product Delete

exports.productDelete = async (req, res) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Product.findByPk(productId);
    if (foundProduct) {
      await foundProduct.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Sorry Product Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
