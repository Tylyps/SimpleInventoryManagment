const OrderDB = require("../models/order");

class OrderCommandHandler {
  async createOrder(customerId, productList) {
    //Create new order with items and there quantity
    const order = new OrderDB({
      customerId,
      products: productList.map((p) => ({
        product: p._id,
        quantity: p.quantity,
      })),
    });

    return order.save();
  }
}

const orderCommandHandler = new OrderCommandHandler();

module.exports = orderCommandHandler;
