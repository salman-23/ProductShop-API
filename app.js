const express = require("express");
const productRoutes = require("./routes/products");
const app = express();

app.use(express.json());
app.use("/products", productRoutes);



const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
