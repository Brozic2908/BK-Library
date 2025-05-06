// userRoutes.js        # Định tuyến người dùng
const express = require("express");
const router = express.Router();

// Định nghĩa các route người dùng ở đây
router.get("/", (req, res) => {
  res.status(200).json({ message: "User route" });
});

module.exports = router;
