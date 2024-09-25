const { validationResult } = require("express-validator");

const get404 = (req, res, next) => {
  return res.status(404).json({
    message: "Route not found",
  });
};

const get500 = (error, req, res, next) => {
  console.log(error);
  return res.status(500).json({
    message: "Server error",
  });
};

const validationErrorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //TODO make errors log file or something
    console.log(errors.array()[0]);
    const error = errors.array()[0];
    return res.status(400).json({
      message: error.msg,
      path: error.path,
    });
  }
  next();
};

module.exports = {
  get404,
  get500,
  validationErrorMiddleware,
};
