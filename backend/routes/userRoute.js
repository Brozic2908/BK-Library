// userRoutes.js        # Định tuyến người dùng
const express = require("express");
const userController = require("../controllers/userController");
const { protect, restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.use(protect);

// Routes dành cho admin
router.get("/", restrictTo("Admin"), userController.getAllUsers);
router.get("/:id", restrictTo("Admin"), userController.getUserById);
router.patch(
  "/:id/update",
  restrictTo("Admin"),
  userController.updateUserByAdmin
);

// Routes cho người dùng cập nhật thông tin cá nhân hoặc admin có thể cập nhật cho người dùng
router.patch("/:id", userController.updateUser);

module.exports = router;
