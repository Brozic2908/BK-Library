// loanRoutes.js        # Định tuyến mượn/trả sách
const express = require("express");
const router = express.Router();

// Định nghĩa các route mượn trả ở đây
router.get("/", (req, res) => {
  res.status(200).json({ message: "Loan route" });
});

module.exports = router;
