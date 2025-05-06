// bookRoutes.js        # Định tuyến sách
const express = require("express");
const router = express.Router();

// Định nghĩa các route sách ở đây
router.get("/", (req, res) => {
  res.status(200).json({ message: "Book route" });
});

module.exports = router;
