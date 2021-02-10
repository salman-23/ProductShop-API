const express = require("express");
const productRoutes = require("./routes/products");
const app = express();

app.use(express.json());
app.use("/products", productRoutes);

// placement is improtent
// next() to terimaite the middleware

//Not Found Middleware
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
