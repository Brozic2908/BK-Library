// index.js # Kết nối các model
// const User = require("./User");
// const Loan = require("./Loan");

// // Thiết lập mối quan hệ
// User.hasMany(Loan, { foreignKey: "userId", as: "loans" }); // Truy cập bằng user.loans để hiển thị tất cả lượt mượn
// Loan.belongsTo(User, { foreignKey: "userId", as: "user" }); // Truy cập loan.user để hiển thị mượn của ai

// module.exports = {
//   User,
//   Loan,
// };

const User = require("./User");
const Book = require("./Book");
const Transaction = require("./Transaction");
// const Report = require("./Report");

// Quan hệ User - Transaction (member)
User.hasMany(Transaction, { foreignKey: "member_id", as: "transactions" });
Transaction.belongsTo(User, { foreignKey: "member_id", as: "member" });

// Quan hệ Book - Transaction
Book.hasMany(Transaction, { foreignKey: "book_id", as: "transactions" });
Transaction.belongsTo(Book, { foreignKey: "book_id", as: "book" });

// Quan hệ User (admin) - Report
// User.hasMany(Report, { foreignKey: "admin_id", as: "reports" });
// Report.belongsTo(User, { foreignKey: "admin_id", as: "admin" });

module.exports = {
  User,
  Book,
  Transaction,
  // Report,
};

