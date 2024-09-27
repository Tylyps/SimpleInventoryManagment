const ProductDB = require("../models/product");

class ProductCommandHandler {
  async addProduct(productPayload) {
    const { name, description, price, stock } = productPayload;

    const product = await new ProductDB({
      name,
      description,
      price,
      stock,
    }).save();

    return product;
  }

  async updateProduct(productId, productData) {
    const { name, description, price, stock } = productData;

    const updatedProduct = await ProductDB.findById(productId);
    updatedProduct.name = name;
    updatedProduct.description = description;
    updatedProduct.price = price;
    updatedProduct.stock = stock;

    return updatedProduct.save();
  }

  async restockProduct(productId, quantity) {
    const product = await ProductDB.findById(productId);

    product.stock += quantity;
    if (product.stock > 999999) {
      const error = new Error("Product will pass a stock limit at 999999!");
      error.statusCode = 400;
      throw error;
    }
    return product.save();
  }

  async sellProduct(productId, quantity) {
    const product = await ProductDB.findById(productId);

    if (product.stock < quantity) {
      let message = "Not enought products to sell.";
      if (product.stock === 0) {
        message += " Product sold out.";
      } else {
        message += ` Max product to order is ${product.stock}`;
      }
      const error = new Error(message);
      error.statusCode = 400;
      throw error;
    }
    product.stock -= quantity;

    return product.save();
  }

  async handleStockForOrder(orderedProducts) {
    const productsId = orderedProducts.map((productData) => productData._id);
    const products = await ProductDB.find({ _id: productsId }); //Get all products that are in order

    if (products.length !== orderedProducts.length) {
      const error = new Error("Wrong product in order");
      error.statusCode = 400;
      throw error;
    }

    //For each product check if there is enought items in stock to make an order, if there is some problems return error
    for (const product of products) {
      const orderProduct = orderedProducts.find(
        (p) => p._id === product._id.toString()
      );

      if (product.stock < orderProduct.quantity) {
        const error = new Error("Not enought products on stock");
        error.statusCode = 400;
        throw error;
      }

      product.stock -= orderProduct.quantity;
    }

    //When every item could be ordered remove them from stock
    return await ProductDB.bulkSave(products);
  }
}

const productCommandHandler = new ProductCommandHandler();

module.exports = productCommandHandler;
