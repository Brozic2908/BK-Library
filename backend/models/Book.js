// Book.js              # Model sách
// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database").sequelize;

// const Book = sequelize.define("Book", {
//   title: { type: DataTypes.STRING, allowNull: false },
//   author: { type: DataTypes.STRING },
//   genre: { type: DataTypes.STRING },
//   publishYear: { type: DataTypes.DATEONLY },
//   stock: { type: DataTypes.INTEGER, defaultValue: 0 },
//   available: { type: DataTypes.INTEGER, defaultValue: 0 },
//   borrowed: { type: DataTypes.INTEGER, defaultValue: 0 },
//   description: { type: DataTypes.TEXT },
//   image: { type: DataTypes.STRING },
// });

// module.exports = Book;
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").sequelize;

const Book = sequelize.define("Book", {
  book_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  genre: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  publish_year: {
    type: DataTypes.INTEGER, // Sequelize không có YEAR, dùng INTEGER thay thế
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  available_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  borrowed_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  image_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
}, {
  tableName: "Book",
  timestamps: false, // vì bảng bạn không có createdAt, updatedAt
});

module.exports = Book;