const { body } = require("express-validator");
const { validationErrorMiddleware } = require("../controllers/error");

const orderValidator = () => [
  //Check if products is an array with only object of correct items in it
  body("products")
    .isArray()
    .custom((products) => {
      for (let product of products) {
        const cartItemKeys = Object.keys(product);
        const allowedKeys = ["_id", "quantity"];

        const isValidOperation = cartItemKeys.every((productKey) =>
          allowedKeys.includes(productKey)
        );

        if (!isValidOperation) {
          return Promise.reject("Order have invalid items in it!");
        }
      }
      return true;
    }),
  body("products.*.quantity").isInt({ min: 1 }),

  validationErrorMiddleware,
];

module.exports = {
  orderValidator,
};
