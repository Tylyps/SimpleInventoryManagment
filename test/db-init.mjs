import mongoose from "mongoose";

import ProductDB from "../models/product.js";

const MONGODB_URI = process.env.MONGODB_URI;
export const initialProduct1ID = "66f29c73da7e74570619b2be";
export const initialProduct2ID = "66f29c73da7e74570619b2cf";

export const dbBeforeTests = (done) => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      return ProductDB.deleteMany({});
    })
    .then(() => {
      const product = new ProductDB({
        _id: initialProduct1ID,
        name: "Product1",
        description: "DescriptionProduct1",
        price: 1.99,
        stock: 10,
      });
      return product.save();
    })
    .then(() => {
      const product2 = new ProductDB({
        _id: initialProduct2ID,
        name: "Product2",
        description: "DescriptionProduct2",
        price: 2.99,
        stock: 20,
      });
      return product2.save();
    })
    .then(() => {
      done();
    })
    .catch((e) => {
      done(e);
    });
};

export const dbAfterTests = (done) => {
  ProductDB.deleteMany()
    .then(() => {
      return mongoose.disconnect();
    })
    .then(() => {
      done();
    });
};

export default {
  dbBeforeTests,
  dbAfterTests,
  initialProduct1ID,
  initialProduct2ID,
};
