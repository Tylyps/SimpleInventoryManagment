// require("@dotenvx/dotenvx").config();
const express = require("express");

const app = express();

const productRoute = require("./routes/product");
const errorController = require("./controllers/error");

//Middleware
app.use(express.json());

//Routers
app.use(productRoute);

//Error handlers
app.use(errorController.get404);
app.use(errorController.get500);

module.exports = app;
