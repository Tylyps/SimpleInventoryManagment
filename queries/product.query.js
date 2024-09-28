const ProductDB = require("../models/product");

class ProductQueryHandler {
  async getProduct(productId) {
    const product = await ProductDB.findById(productId);

    return product;
  }

  async getProductsByIds(productsId) {
    const products = await ProductDB.find({ _id: productsId });

    return products;
  }

  async getProductsPerPage(currentPage = 1, pageSize = 10) {
    if (pageSize > 200) {
      pageSize = 200;
    }

    const totalProductsCount = await ProductDB.countDocuments();

    const productList = await ProductDB.find()
      .skip(currentPage - 1)
      .limit(pageSize);

    return { productList, totalProductsCount };
  }
}

const productQueryHandler = new ProductQueryHandler();

module.exports = productQueryHandler;
