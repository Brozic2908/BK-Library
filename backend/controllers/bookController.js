const { Op } = require("sequelize");
const Book = require("../models/Book");

// ---------------------- NGƯỜI DÙNG ----------------------

// [GET] /api/books?page=1&limit=12 - Lấy danh sách sách có phân trang
exports.getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const startIndex = (page - 1) * limit;

    const books = await Book.findAll({
      offset: startIndex,
      limit: limit,
    });

    const total = await Book.count();

    res.json({ total, books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách sách.", error: error.message });
  }
};

// [GET] /api/books/random?exclude=ID - Lấy 4 sách ngẫu nhiên, loại trừ ID
exports.getRandomBooks = async (req, res) => {
  try {
    const excludeId = parseInt(req.query.exclude);

    const filteredBooks = await Book.findAll({
      where: {
        id: {
          [Op.ne]: excludeId,
        },
      },
    });

    const shuffled = filteredBooks.sort(() => 0.5 - Math.random());
    const randomBooks = shuffled.slice(0, 4);

    res.status(200).json(randomBooks);
  } catch (error) {
    console.error("Error fetching random books:", error);
    res.status(500).json({ message: "Lỗi khi lấy sách ngẫu nhiên.", error: error.message });
  }
};

// [GET] /api/books/:id - Lấy thông tin 1 sách
exports.getBookById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: "Sách không tồn tại." });
    }

    res.json(book);
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    res.status(500).json({ message: "Lỗi khi lấy thông tin sách.", error: error.message });
  }
};

// [POST] /api/books/:id/borrow - Đặt mượn sách
exports.bookBorrow = async (req, res) => {
  try {
    const { id } = req.params;
    const { borrowDate, returnDate } = req.body;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: "Sách không tồn tại." });
    }

    if (book.quantity <= 0) {
      return res.status(400).json({ message: "Hết sách, không thể đặt mượn." });
    }

    book.quantity -= 1;
    await book.save();

    res.json({ message: "Đặt sách thành công.", book });
  } catch (error) {
    console.error("Error borrowing book:", error);
    res.status(500).json({ message: "Lỗi khi đặt mượn sách.", error: error.message });
  }
};

// ---------------------- QUẢN TRỊ VIÊN ----------------------

// [POST] /api/books - Tạo sách mới
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(400).json({ message: "Lỗi khi tạo sách mới.", error: error.message });
  }
};

// [PUT] /api/books/:id - Cập nhật sách
exports.updateBook = async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy sách." });
    }

    const updatedBook = await Book.findByPk(req.params.id);
    res.json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(400).json({ message: "Lỗi khi cập nhật sách.", error: error.message });
  }
};

// [DELETE] /api/books/:id - Xóa sách
exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy sách." });
    }

    res.json({ message: "Đã xóa sách thành công." });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Lỗi khi xóa sách.", error: error.message });
  }
};
