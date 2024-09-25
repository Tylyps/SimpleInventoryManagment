//const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    maxLength: 50,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 1,
  },
});

productSchema.methods.toJSON = function () {
  const product = this;
  const productObj = product.toObject();

  delete productObj.__v;

  return productObj;
};

module.exports = model("Product", productSchema);
