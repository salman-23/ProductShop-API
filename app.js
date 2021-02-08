const express = require("express");
let products = require("./data");
//no need to write index.js
const db = require("./db/models");
//before all route use middleware
const app = express();
const { Product } = require("./db/models/");

app.use(express.json());

//Product Create

app.post("/products", (req, res) => {
  const id = products[products.length - 1].id + 1;
  const newProduct = { id, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

//Product Update

app.put("/products/:productId", (req, res) => {
  const foundProduct = products.find(
    (product) => product.id === +req.params.productId
  );
  if (foundProduct) {
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

app.delete("/products/:productId", (req, res) => {
  const foundProduct = products.find(
    (product) => product.id === +req.params.productId
  );
  if (foundProduct) {
    products = products.filter((product) => product !== foundProduct);
    res.status(204).end();
  } else {
    res.status(404).json({ em: "Sorry Product Not Found!" });
  }
});

db.sequelize.sync();

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
