const Product = require("../models/product");

const getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

const getProducts = (req, res, next) => {
  const itemsPerPage = 10;
  const currentPage = +req.query.page || 1;
  Product.countDocuments()
    .then((totalProducts) => {
      return Product.find()
        .skip((currentPage - 1) * itemsPerPage)
        .limit(itemsPerPage)
        .then((products) => {
          res.json({
            products,
            totalProducts,
          });
        });
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

const postProducts = (req, res, next) => {
  const { name, description, price, stock } = req.body;
  console.log(name, description, price, stock);

  const product = new Product({ name, description, price, stock });

  product
    .save()
    .then((result) => {
      res.json({
        product: result,
      });
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

const patchProduct = (req, res, next) => {
  const productId = req.params.productId;
  const { name, description, price, stock } = req.body;

  Product.findById(productId)
    .then((product) => {
      product.name = name;
      product.description = description;
      product.price = price;
      product.stock = stock;

      return product.save().then((result) => {
        res.json({
          product: result,
        });
      });
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

const postProductsRestock = async (req, res, next) => {
  const productId = req.params.productId;
  const { quantity } = req.body;
  try {
    const product = await Product.findById(productId);

    product.stock += quantity;
    const productResult = await product.save();

    res.json({
      product: productResult,
    });
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};
const postProductsSell = async (req, res, next) => {
  const productId = req.params.productId;
  const { quantity } = req.body;
  try {
    const product = await Product.findById(productId);

    if (product.stock < quantity) {
      let message = "Not enought products to sell.";
      if (product.stock === 0) {
        message += " Product sold out.";
      } else {
        message += ` Max product to order is ${product.stock}`;
      }
      return res.status(400).json({
        message,
      });
    }
    product.stock -= quantity;

    const productResult = await product.save();

    res.json({
      product: productResult,
    });
  } catch (err) {
    const error = new Error(err);
    return next(error);
  }
};

module.exports = {
  getProduct,
  getProducts,
  patchProduct,
  postProducts,
  postProductsRestock,
  postProductsSell,
};
