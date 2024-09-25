// const express = require("express");
const express = require("express");

const orderController = require("../controllers/order");
const { orderValidator } = require("../validators/order");

const router = express.Router();

router.post("/orders", orderValidator(), orderController.postOrders);

module.exports = router;
