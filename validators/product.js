const { body } = require("express-validator");
const { validationErrorMiddleware } = require("../controllers/error");

const productValidator = [
  body("name").isString().trim().isLength({ min: 1, max: 50 }),
  body("description").isString().trim().isLength({ min: 1, max: 50 }),
  body("price").isFloat({ min: 0 }),
  body("stock").isInt({ min: 0 }),

  validationErrorMiddleware,
];

const stockValidator = [
  body("quantity").isInt({ min: 1 }),
  validationErrorMiddleware,
];

module.exports = {
  productValidator,
  stockValidator,
};
