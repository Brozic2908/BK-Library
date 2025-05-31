const app = require("./app");
const { sequelize, connectDB } = require("./config/database");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Xử lý lỗi không được xử lý
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Đang tắt...");
  console.error(err.name, err.message);
  process.exit(1);
});

// Khởi tạo bảng và đồng bộ hóa với cơ sở dữ liệu
const initializeDatabase = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: false });
    console.log("Đã đồng bộ hóa Database thành công.");
  } catch (error) {
    console.error("Lỗi khi đồng bộ hóa Database:", error);
    process.exit(1);
  }
};

// Khởi động server
const start = async () => {
  try {
    await initializeDatabase();
    const server = app.listen(PORT, () => {
      console.log(`Server đang chạy trên cổng http://localhost:${PORT}\n`);
    });

    // Xử lý lỗi Promise bị từ chối không được xử lý
    process.on("unhandledRejection", (err) => {
      console.error("UNHANDLED REJECTION! 💥 Đang tắt...");
      console.error(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (error) {
    console.error("Lỗi khi khởi động server:", error);
    process.exit(1);
  }
};

start();
