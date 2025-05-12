// Book.js              # Model sách
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").sequelize;

const Book = sequelize.define("Book", {
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING },
  genre: { type: DataTypes.STRING },
  publishYear: { type: DataTypes.DATEONLY },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  available: { type: DataTypes.INTEGER, defaultValue: 0 },
  borrowed: { type: DataTypes.INTEGER, defaultValue: 0 },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING },
});

module.exports = Book;
