//const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  products: [
    {
      _id: false,
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  customerId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

orderSchema.methods.toJSON = function () {
  const order = this;
  const orderObj = order.toObject();

  delete orderObj.__v;

  return orderObj;
};

module.exports = model("Order", orderSchema);
