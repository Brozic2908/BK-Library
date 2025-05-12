// index.js # Kết nối các model
const User = require("./User");
const Loan = require("./Loan");

// Thiết lập mối quan hệ
User.hasMany(Loan, { foreignKey: "userId", as: "loans" }); // Truy cập bằng user.loans để hiển thị tất cả lượt mượn
Loan.belongsTo(User, { foreignKey: "userId", as: "user" }); // Truy cập loan.user để hiển thị mượn của ai

module.exports = {
  User,
  Loan,
};
