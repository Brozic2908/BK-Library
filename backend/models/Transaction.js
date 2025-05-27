// // Loan.js              # Model mượn sách
// const { sequelize } = require("../config/database");

// const Loan = sequelize.define();
// module.exports = Loan;

// loanController.js    # Xử lý thao tác mượn/trả sách
const { sequelize } = require("../config/database");
const { DataTypes } = require("sequelize");

const Transaction = sequelize.define("Transaction", {
  tx_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  schedule_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  borrow_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  due_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  return_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Borrowing", "Returned", "Cancel"),
    allowNull: false,
    defaultValue: "Pending",
  },
}, {
  tableName: "Transaction",
  freezeTableName: true,
  timestamps: false,
});

module.exports = Transaction;