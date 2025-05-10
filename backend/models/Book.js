// Book.js              # Model sách
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
      allowNull: true, // URL hoặc tên file ảnh bìa
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    acc_state: {
      type: DataTypes.ENUM("available", "unavailable"),
      defaultValue: "available",
    },
  },
  {
    timestamps: true, 
    hooks: {
      //...
    },
  }
);

// Phương thức để kiểm tra trạng thái sách (available/unavailable)
Book.prototype.checkAvailability = function () {
  return this.acc_state === "available";
};

module.exports = Book;
