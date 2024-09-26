const mongoose = require("mongoose");

const OrderDB = require("../models/order");
const ProductDB = require("../models/product");

const postOrders = async (req, res, next) => {
  //TODO: get customer id from auth token
  const customerId = new mongoose.Types.ObjectId();
  const { products: orderedProducts } = req.body;

  try {
    const productsId = orderedProducts.map((productData) => productData._id);
    const products = await ProductDB.find({ _id: productsId }); //Get all products that are in order

    //For each product check if there is enought items in stock to make an order, if there is some problems return error
    for (const product of products) {
      const orderProduct = orderedProducts.find(
        (p) => p._id === product._id.toString()
      );

      if (product.stock < orderProduct.quantity) {
        return res.status(400).json({
          message: "Not enought products on stock",
        });
      }

      product.stock -= orderProduct.quantity;
    }

    //When every item could be ordered remove them from stock
    await ProductDB.bulkSave(products);

    //Create new order with items and there quantity
    const order = new OrderDB({
      customerId,
      products: orderedProducts.map((p) => ({
        product: p._id,
        quantity: p.quantity,
      })),
    });

    const newOrder = await order.save();

    //Return new created order data
    res.json({ order: newOrder });
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

module.exports = {
  postOrders,
};
