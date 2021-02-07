const express = require("express");
let products = require("./data");

const app = express();

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
