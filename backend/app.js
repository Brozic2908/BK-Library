// app.js # Cấu hình ứng dụng
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

// Tạo swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BK Library API",
      version: "1.0.0",
      description: "API Docs của hệ thống quản lý mượn sách thư viện",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js", "./controllers/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);

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

// Document about api
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

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
