const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const analyticsRoutes = require("./routes/analytics");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const positionRoutes = require("./routes/position");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//*  http://localhost:5000/api/auth/login

app.use("/api/analytics", analyticsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/position", positionRoutes);

module.exports = app;
