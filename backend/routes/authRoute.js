// authRoutes.js        # Định tuyến xác thực
const express = require("express");
const router = express.Router();

// Định nghĩa các route xác thực ở đây
router.post("/login", (req, res) => {
  res.status(200).json({ message: "Login route" });
});

router.post("/register", (req, res) => {
  res.status(200).json({ message: "Register route" });
});

module.exports = router;
