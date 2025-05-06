// Loan.js              # Model mượn sách
const { sequelize } = require("../config/database");

const Loan = sequelize.define();
module.exports = Loan;
