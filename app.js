const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

const keys = require("./config/keys");

const analyticsRoutes = require("./routes/analytics");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const positionRoutes = require("./routes/position");

app.use(morgan("dev"));
app.use(cors());
mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

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
