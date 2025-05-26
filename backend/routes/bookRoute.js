// bookRoutes.js        # Định tuyến sách
const express = require("express");
const router = express.Router();
const bookController = require('../controllers/bookController');

// Test route
router.get("/", (req, res) => {
  res.status(200).json({ message: "Book route active" });
});

// Lấy danh sách tất cả sách (có phân trang)
router.get("/list", bookController.getBooks);

// Lấy 4 sách ngẫu nhiên (trừ sách đang xem)
router.get("/random", bookController.getRandomBooks);

// Lấy chi tiết 1 sách theo ID
router.get("/:id", bookController.getBookById);

// Đặt mượn sách
router.post("/:id/borrow", bookController.bookBorrow);

// Tạo sách mới (admin)
router.post("/", bookController.createBook);

// Cập nhật sách theo ID (admin)
router.put("/:id", bookController.updateBook);

// Xóa sách theo ID (admin)
router.delete("/:id", bookController.deleteBook);

module.exports = router;
