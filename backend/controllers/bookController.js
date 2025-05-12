// bookController.js    # Xử lý thao tác với sách
const { Book } = require("../models");

// GET /books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: "Không tìm thấy sách." });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server.", error: err.message });
  }
};

// POST /books (admin)
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: "Lỗi tạo sách.", error: err.message });
  }
};

// PUT /books/:id (admin)
exports.updateBook = async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ message: "Không tìm thấy sách." });
    const updatedBook = await Book.findByPk(req.params.id);
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: "Lỗi cập nhật sách.", error: err.message });
  }
};

// DELETE /books/:id (admin)
exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy sách." });
    res.json({ message: "Đã xóa sách thành công." });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server.", error: err.message });
  }
};
