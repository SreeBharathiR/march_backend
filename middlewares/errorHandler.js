const globalErrorHandler = async (err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;

  console.log(err);

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path} : ${err.value}`;
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    const value = Object.values(err.keyValue)[0];
    message = `Duplicate value for the field: "${field}". With a value of "${value}"`;
  }

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

module.exports = globalErrorHandler;
