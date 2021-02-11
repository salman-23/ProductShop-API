const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");
const app = express();

// placement is improtent
app.use(express.json());
app.use(cors());
app.use("/products", productRoutes);

//Not Found Middleware
// next() to terimaite the middleware
app.use((req, res, next) => {
  next({ status: 404, message: "Path Not Found" });
});

// Eror Handeling Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status ? err.status : 500)
    .json({ message: err.message ? err.message : "Internal Server Error" });
});

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
