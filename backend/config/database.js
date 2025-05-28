const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: false,

    dialectOptions: {
      charset: "utf8mb4",
    },
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("\nKết nối database thành công.");
  } catch (error) {
    console.error("\nKhông thể kết nối đến database:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
