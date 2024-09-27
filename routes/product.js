// const express = require("express");
const express = require("express");

const productController = require("../controllers/product");
const { productValidator, stockValidator } = require("../validators/product");

const router = express.Router();

router.get("/products", productController.getProducts);

router.get("/products/:productId", productController.getProduct);

router.post("/products", productValidator, productController.postProducts);

router.patch(
  "/products/:productId",
  productValidator,
  productController.patchProduct
);

router.post(
  "/products/:productId/restock",
  // stockValidator,
  productController.postProductsRestock
);

router.post(
  "/products/:productId/sell",
  // stockValidator,
  productController.postProductsSell
);

module.exports = router;
