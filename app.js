const express = require("express");

const app = express();

//Routes import
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");

const errorController = require("./controllers/error");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routers
app.use(productRoute);
app.use(orderRoute);

//Error handlers
app.use(errorController.errorRoute404);
app.use(errorController.catchErrorHandler);

module.exports = app;
