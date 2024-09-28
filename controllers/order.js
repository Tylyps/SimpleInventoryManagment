const mongoose = require("mongoose");

const productCommandHandler = require("../commands/product.command");
const orderCommandHandler = require("../commands/order.command");

class OrderController {
  async postOrders(req, res, next) {
    //TODO: get customer id from auth token
    const customerId = new mongoose.Types.ObjectId();
    const { products: orderedProducts } = req.body;

    try {
      await productCommandHandler.handleStockForOrder(orderedProducts);

      const newOrder = await orderCommandHandler.createOrder(
        customerId,
        orderedProducts
      );

      //Return new created order data
      return res.json({ order: newOrder });
    } catch (e) {
      next(e);
    }
  }
}

const orderController = new OrderController();

module.exports = orderController;
