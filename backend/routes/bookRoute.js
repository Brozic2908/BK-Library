// bookRoutes.js        # Định tuyến sách
const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Định nghĩa các route sách ở đây
router.get("/", (req, res) => {
  res.status(200).json({ message: "Book route" });
});

// GET /api/books/:id
router.get("/:id", bookController.getBookById);

// POST /api/books (admin)
router.post("/", bookController.createBook);

// PUT /api/books/:id (admin)
router.put("/:id", bookController.updateBook);

// DELETE /api/books/:id (admin)
router.delete("/:id", bookController.deleteBook);

module.exports = router;
