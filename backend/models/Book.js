const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true, // URL hoặc tên file ảnh
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    acc_state: {
      type: DataTypes.ENUM("available", "unavailable"),
      allowNull: false,
      defaultValue: "available",
    },
  },
  {
    tableName: "books", // tên bảng trong DB (nếu muốn)
    timestamps: true, // tự động tạo createdAt & updatedAt
  }
);

// 📘 Method: Kiểm tra trạng thái sẵn sàng mượn
Book.prototype.checkAvailability = function () {
  return this.acc_state === "available" && this.quantity > 0;
};

module.exports = Book;
