function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Ocorreu um erro interno no servidor";

  res.status(statusCode).json({
    error: err.name || "InternalServerError",
    statusCode: statusCode,
    message: message,
  });
}

module.exports = {
  errorHandler,
};
