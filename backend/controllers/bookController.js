//backend/controllers/bookController.js
const { Op } = require("sequelize");
const Book = require("../models/Book");

// ---------------------- NGƯỜI DÙNG ----------------------

// [GET] /api/books?page=1&limit=12 - Lấy danh sách sách có phân trang
exports.getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const startIndex = (page - 1) * limit;
    const searchTerm = req.query.search || "";

    const whereCondition = searchTerm
      ? {
          title: {
            [Op.like]: `%${searchTerm}%`,
          },
        }
      : {};

    const books = await Book.findAll({
      where: whereCondition,
      offset: startIndex,
      limit: limit,
      attributes: ["book_id", "title", "author", "genre", "publish_year", "stock", "available_number", "borrowed_number", "image_url", "description"],
    });

    const total = await Book.count({ where: whereCondition });

    res.json({ total, books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách sách.", error: error.message });
  }
};

// [GET] /api/books/random?exclude=ID - Lấy 4 sách ngẫu nhiên, loại trừ ID
exports.getRandomBooks = async (req, res) => {
  try {
    const excludeId = parseInt(req.query.exclude);
    const whereClause = {};

    if (!isNaN(excludeId)) {
      whereClause.book_id = {
        [Op.ne]: excludeId,
      };
    }

    // Lấy tất cả sách thoả điều kiện (ngoại trừ sách bị loại)
    const filteredBooks = await Book.findAll({
      where: whereClause,
      attributes: ["book_id", "title", "image_url"],
    });

    // Xáo trộn mảng ngẫu nhiên
    const shuffled = filteredBooks.sort(() => 0.5 - Math.random());

    // Lấy 4 cuốn sách đầu tiên
    const randomBooks = shuffled.slice(0, 4);

    res.status(200).json(randomBooks);
  } catch (error) {
    console.error("Error fetching random books:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi lấy sách ngẫu nhiên.", error: error.message });
  }
};

// [GET] /api/books/:id - Lấy thông tin 1 sách
exports.getBookById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "Invalid book ID" });
    }
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    // Cố gắng set charset header
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    // Để chắc chắn dùng JSON stringify chuẩn
    res.send(JSON.stringify(book));
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// [PATCH] /api/books/:id/update-quantity - Cập nhật số lượng sách
exports.updateBookQuantity = async (req, res) => {
  try {
    const bookId = req.params.id;
    const { available_number } = req.body;

    if (available_number == null || isNaN(available_number) || available_number < 0) {
      return res.status(400).json({ message: "Số lượng sách không hợp lệ" });
    }

    const [updated] = await Book.update(
      { available_number },
      { where: { book_id: bookId } }
    );

    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy sách." });
    }

    const updatedBook = await Book.findByPk(bookId);
    res.json({ message: "Cập nhật số lượng sách thành công", book: updatedBook });
  } catch (error) {
    console.error("Error updating book quantity:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật số lượng sách.", error: error.message });
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
    res
      .status(400)
      .json({ message: "Lỗi khi tạo sách mới.", error: error.message });
  }
};

// [PUT] /api/books/:id - Cập nhật sách
exports.updateBook = async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: { book_id: req.params.id },
    });

    if (!updated) {
      return res.status(404).json({ message: "Không tìm thấy sách." });
    }

    const updatedBook = await Book.findByPk(parseInt(req.params.id));
    res.json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res
      .status(400)
      .json({ message: "Lỗi khi cập nhật sách.", error: error.message });
  }
};

// [DELETE] /api/books/:id - Xóa sách
exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.destroy({ where: { book_id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy sách." });
    }

    res.json({ message: "Đã xóa sách thành công." });
  } catch (error) {
    console.error("Error deleting book:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi xóa sách.", error: error.message });
  }
};

// [GET] /api/books/all
exports.getBooksAll = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: [
        "book_id",
        "title",
        "author",
        "genre",
        "publish_year",
        "stock",
        "available_number",
        "borrowed_number",
        "image_url",
        "description"
      ],
    });

    res.json({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({
      message: "Lỗi khi lấy danh sách sách.",
      error: error.message,
    });
  }
};
