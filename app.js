// require("@dotenvx/dotenvx").config();
const express = require("express");

const app = express();

const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const errorController = require("./controllers/error");

//Middleware
app.use(express.json());

//Routers
app.use(productRoute);
app.use(orderRoute);

//Error handlers
app.use(errorController.get404);
app.use(errorController.get500);

module.exports = app;
