// TransactionController.js    # Xử lý thao tác mượn/trả sách
const { User, Book, Transaction } = require("../models"); // Đảm bảo các model đã được import

exports.createTransaction = async (req, res, next) => {
  try {
    const { member_id, book_id, schedule_date } = req.body;

    // Kiểm tra người dùng tồn tại
    const user = await User.findByPk(member_id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy người dùng với ID này",
      });
    }

    // Kiểm tra sách tồn tại
    const book = await Book.findByPk(book_id);
    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy sách với ID này",
      });
    }

    // Tạo giao dịch mới
    const transaction = await Transaction.create({
      member_id,
      book_id,
      schedule_date: schedule_date,
      due_date: new Date(new Date(schedule_date).setDate(new Date(schedule_date).getDate() + 30)),
      status: 'Pending'
    });

    res.status(200).json({
      status: "success",
      data: {
        transaction,
      },
    });
  } catch (error) {
    next(error);
  }
};


exports.getAllTransactionsByUser = async (req, res, next) => {
  try {
    const { member_id } = req.params;

    const transactions = await Transaction.findAll({
      where: {
        member_id: member_id,
      },
      include: [
        {
          model: Book,
          as: 'book',
          attributes: ['title', 'author', 'genre'],
        }
      ],
      order: [['tx_id', 'DESC']]  // Sắp xếp theo mới nhất
    });

    if (transactions.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Không có giao dịch nào cho người dùng này",
      });
    }

    res.status(200).json({
      status: "success",
      results: transactions.length,
      data: {
        transactions,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        {
          model: User,
          as: "member", 
          attributes: ['name'],
        },
        {
          model: Book,
          as: 'book',
          attributes: ['title', 'author', 'genre', 'publish_year', 'image_url'],
        },
      ],
    });

    if (transactions.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Không có giao dịch nào",
      });
    }

    res.status(200).json({
      status: "success",
      results: transactions.length,
      data: {
        transactions,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTransactionStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { tx_id } = req.params;

    if (!['Pending', 'Borrowing', 'Returned', 'Cancel'].includes(status)) {
      return res.status(400).json({
        status: "fail",
        message: "Trạng thái không hợp lệ",
      });
    }

    const transaction = await Transaction.findByPk(tx_id);
    if (!transaction) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy giao dịch với ID này",
      });
    }

    // Nếu là trạng thái thay đổi sang Borrowing hoặc Returned thì cần cập nhật Book
    if (status === 'Borrowing' || status === 'Returned') {
      const book = await Book.findByPk(transaction.book_id);
      if (!book) {
        return res.status(404).json({
          status: "fail",
          message: "Không tìm thấy sách liên quan đến giao dịch",
        });
      }

      if (status === 'Borrowing') {
        // Kiểm tra còn sách hay không
        if (book.stock <= 0) {
          return res.status(400).json({
            status: "fail",
            message: "Không còn sách để mượn",
          });
        }

        book.stock -= 1;
        book.borrowed_number += 1;
      } else if (status === 'Returned') {
        // Chỉ trả sách nếu trước đó thực sự đang mượn
        if (transaction.status !== 'Borrowing') {
          return res.status(400).json({
            status: "fail",
            message: "Chỉ có thể trả sách sau khi đã mượn",
          });
        }

        book.stock += 1;
        book.borrowed_number = Math.max(0, book.borrowed_number - 1); // tránh âm
        transaction.return_date = new Date(); // Cập nhật ngày trả
      }

      await book.save();
    }

    transaction.status = status;
    await transaction.save();

    res.status(200).json({
      status: "success",
      data: { transaction },
    });

  } catch (error) {
    next(error);
  }
};