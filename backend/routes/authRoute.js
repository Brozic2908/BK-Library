// authRoutes.js        # Định tuyến xác thực
const express = require("express");
const authController = require("../controllers/authController");
const { protect } = require("../middlewares/auth");
const router = express.Router();

// Đăng nhập
router.post("/login", authController.login);

// Đăng ký người dùng mới
router.post("/register", authController.register);

// Update mất khẩu mới
router.patch("/updatePassword", protect, authController.updatePassword);

module.exports = router;
