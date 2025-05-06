// middleware/errorHandler.js: Middleware xử lý lỗi
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log lỗi để debug
  console.error(err);

  // Lỗi do Sequelize
  if (err.message === "SequelizeValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error.message = message.join(", ");
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }

  // lỗi do trùng lặp dữ liệu (Unique constrant)
  if (err.name === "SequelizeUniqueConstraintError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error.message = message.join(", ");
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }

  // Lỗi do JWT
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: "fail",
      message: "Token không hợp lệ. Vui lòng đăng nhập lại!",
    });
  }

  // Lỗi do JWT hết hạn
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      status: "fail",
      message: "Token đã hết hạn! Vui lòng đăng nhập lại",
    });
  }

  // Default error
  res.status(error.statusCode || 500).json({
    status: "error",
    message: error.message || "Lỗi máy chủ",
  });
};

module.exports = errorHandler;
