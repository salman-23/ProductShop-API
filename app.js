const express = require("express");
let products = require("./data");

const app = express();
//before all route use middleware
app.use(express.json());

//Product Create
app.post("/products", (req, res) => {
  const id = products[products.length - 1].id + 1;
  const newProduct = { id, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get("/products", (req, res) => {
  res.json({ products });
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

app.listen(8000);
