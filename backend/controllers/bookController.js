const Book = require("../models/bookModel");

// API lấy danh sách tất cả sách (hoặc theo phân trang)
exports.getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const startIndex = (page - 1) * limit;

    // Lấy sách với phân trang
    const books = await Book.findAll({
      offset: startIndex,
      limit: limit,
    });

    const total = await Book.count();

    res.json({
      total,
      books,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// API lấy 4 sách ngẫu nhiên (trừ sách đang xem)
exports.getRandomBooks = async (req, res) => {
  try {
    const excludeId = parseInt(req.query.exclude); // Lấy ID cần loại trừ từ query param

    // Lọc sách loại trừ cuốn đang xem
    const filteredBooks = await Book.findAll({
      where: {
        id: {
          [Op.ne]: excludeId, // Loại trừ sách có id trùng với `excludeId`
        },
      },
    });

    // Xáo trộn và chọn 4 cuốn ngẫu nhiên
    const shuffled = filteredBooks.sort(() => 0.5 - Math.random());
    const randomBooks = shuffled.slice(0, 4);

    res.status(200).json(randomBooks);
  } catch (error) {
    console.error("Error fetching random books:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// API lấy chi tiết 1 sách
exports.getBookById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const book = await Book.findByPk(id); // Tìm sách theo ID

    if (!book) {
      return res.status(404).json({ message: "Sách không tồn tại." });
    }

    res.json(book);
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ API đặt sách
exports.bookBorrow = async (req, res) => {
  try {
    const { id } = req.params;
    const { borrowDate, returnDate } = req.body;

    // Tìm sách theo ID
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: "Sách không tồn tại." });
    }

    if (book.quantity <= 0) {
      return res.status(400).json({ message: "Hết sách, không thể đặt mượn." });
    }

    // Giảm số lượng sách khi mượn (giả lập trong cơ sở dữ liệu)
    book.quantity -= 1;
    await book.save();

    res.json({ message: "Đặt sách thành công.", book });
  } catch (error) {
    console.error("Error borrowing book:", error);
    res.status(500).json({ message: "Server error" });
  }
};
