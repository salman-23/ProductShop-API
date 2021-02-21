const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");
const shopRoutes = require("./routes/shops");
const userRoutes = require("./routes/users");
const app = express();
const db = require("./db/models");
const path = require("path");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");

// placement is improtent
app.use(express.json());
app.use(cors());
app.use("/products", productRoutes);
app.use("/shops", shopRoutes);
app.use(userRoutes);
app.use(passport.initialize());
passport.use(localStrategy);

app.use("/media", express.static(path.join(__dirname, "media")));

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

// db.sequelize.sync();
db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
