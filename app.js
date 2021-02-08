const express = require("express");
//no need to write index.js
const db = require("./db/models");
const { Product } = require("./db/models/");
//before all route use middleware
const app = express();

app.use(express.json());

//Product Create
app.post("/products", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Product Update
app.put("/products/:productId", async (req, res) => {
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
});

//Product List

app.get("/products", async (req, res) => {
  try {
    const _products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(_products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Product Delete

app.delete("/products/:productId", async (req, res) => {
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
});

db.sequelize.sync();
db.sequelize.sync({ alter: true });

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
