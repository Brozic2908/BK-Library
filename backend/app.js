// app.js # Cấu hình ứng dụng
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();

// Khởi tạo ứng dụng Express
const app = express();

// Middleware Bảo mật
app.use(helmet());

// Middleware CORS cho frontend kết nối backend
app.use(cors());

// Middleware xử lý body của request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware ghi log trong môi trường phát triển
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Định nghĩa routes
app.use("/api", routes);

// Route mặc định
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Chào mừng đến với API hệ thống quản lý thư viện!",
  });
});

// Middleware xử lý lỗi
app.use(errorHandler);

module.exports = app;
