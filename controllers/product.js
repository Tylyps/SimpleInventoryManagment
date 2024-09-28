const productCommandHandler = require("../commands/product.command");
const productQueryHandler = require("../queries/product.query");

class ProductController {
  async getProduct(req, res, next) {
    const productId = req.params.productId;
    try {
      const product = await productQueryHandler.getProduct(productId);

      if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
      }

      return res.json({
        product,
      });
    } catch (e) {
      next(e);
    }
  }

  async getProducts(req, res, next) {
    const pageSize = 10;
    const currentPage = +req.query.page || 1;

    try {
      const products = await productQueryHandler.getProductsPerPage(
        currentPage,
        pageSize
      );
      return res.json({ products });
    } catch (e) {
      next(e);
    }
  }

  async postProducts(req, res, next) {
    const { name, description, price, stock } = req.body;

    try {
      const product = await productCommandHandler.addProduct({
        name,
        description,
        price,
        stock,
      });

      return res.json({
        product,
      });
    } catch (e) {
      next(e);
    }
  }

  async patchProduct(req, res, next) {
    const productId = req.params.productId;
    const { name, description, price, stock } = req.body;

    try {
      const updatedProduct = await productCommandHandler.updateProduct(
        productId,
        {
          name,
          description,
          price,
          stock,
        }
      );

      return res.json({
        product: updatedProduct,
      });
    } catch (e) {
      next(e);
    }
  }

  async deleteProduct(req, res, next) {
    const productId = req.params.productId;

    try {
      const deletedProduct = await productCommandHandler.deleteProduct(
        productId
      );

      if (!deletedProduct) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
      }

      return res.json({
        deletedProduct,
      });
    } catch (e) {
      next(e);
    }
  }

  async postProductsRestock(req, res, next) {
    const productId = req.params.productId;
    const { quantity } = req.body;

    try {
      const restockedProduct = await productCommandHandler.restockProduct(
        productId,
        quantity
      );

      return res.json({
        product: restockedProduct,
      });
    } catch (e) {
      next(e);
    }
  }

  async postProductsSell(req, res, next) {
    const productId = req.params.productId;
    const { quantity } = req.body;

    try {
      const selledProduct = await productCommandHandler.sellProduct(
        productId,
        quantity
      );

      return res.json({
        product: selledProduct,
      });
    } catch (e) {
      next(e);
    }
  }
}

const productController = new ProductController();
module.exports = productController;
