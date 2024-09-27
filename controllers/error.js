const { validationResult } = require("express-validator");

const error404 = (req, res, next) => {
  return res.status(404).json({
    message: "Route not found",
  });
};

const catchErrorHandler = (error, req, res, next) => {
  if (error.statusCode && error.statusCode < 500) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  //TODO make errors log file or something
  console.log(error);
  return res.status(500).json({
    message: "Server error",
  });
};

const validationErrorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstErrorData = errors.array()[0];
    const error = new Error(`${firstErrorData.msg} - ${firstErrorData.path}`);
    error.statusCode = 400;
    throw error;
  }
  next();
};

module.exports = {
  error404,
  catchErrorHandler,
  validationErrorMiddleware,
};
