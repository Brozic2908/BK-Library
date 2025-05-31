// TransactionController.js    # Xử lý thao tác mượn/trả sách
const { User, Book, Transaction } = require("../models"); // Đảm bảo các model đã được import

exports.createTransaction = async (req, res, next) => {
  try {
    const { member_id, book_id, schedule_date } = req.body;
    
    // Kiểm tra ngày mượn không được bé hơn hôm nay
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00 để so sánh ngày
    const schedule = new Date(schedule_date);
    schedule.setHours(0, 0, 0, 0);

    if (schedule < today) {
      return res.status(400).json({
        status: "fail",
        message: "Ngày mượn không được nhỏ hơn ngày hôm nay",
      });
    }

    const user = await User.findByPk(member_id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy người dùng với ID này",
      });
    }

    const book = await Book.findByPk(book_id);
    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy sách với ID này",
      });
    }
    book.available_number -= 1;
    book.borrowed_number += 1;
    await book.save();

    const transaction = await Transaction.create({
      member_id,
      book_id,
      schedule_date: schedule_date,
      due_date: new Date(
        new Date(schedule_date).setDate(new Date(schedule_date).getDate() + 30)
      ),
      status: "Pending",
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
          as: "book",
          attributes: ["title", "author", "image_url"],
        },
      ],
      order: [["tx_id", "DESC"]], // Sắp xếp theo mới nhất
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
          attributes: ["name"],
        },
        {
          model: Book,
          as: "book",
          attributes: ["title"],
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

    if (!["Pending", "Borrowing", "Returned", "Cancel"].includes(status)) {
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

    if (status === "Borrowing" || status === "Returned") {
      const book = await Book.findByPk(transaction.book_id);
      if (!book) {
        return res.status(404).json({
          status: "fail",
          message: "Không tìm thấy sách liên quan đến giao dịch",
        });
      }

      if (status === "Borrowing") {
        if (book.available_number <= 0) {
          return res.status(400).json({
            status: "fail",
            message: "Không còn sách để mượn",
          });
        }
      } else if (status === "Returned") {
        if (transaction.status !== "Borrowing") {
          return res.status(400).json({
            status: "fail",
            message: "Chỉ có thể trả sách sau khi đã mượn",
          });
        }
      }
      book.available_number += 1;
      book.borrowed_number = Math.max(0, book.borrowed_number - 1);
      transaction.return_date = new Date();

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

exports.updateTransactionDates = async (req, res, next) => {
  try {
    const { tx_id } = req.params;
    const { schedule_date, borrow_date, due_date, return_date } = req.body;

    const transaction = await Transaction.findByPk(tx_id);
    if (!transaction) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy giao dịch với ID này",
      });
    }

    if (schedule_date !== undefined) transaction.schedule_date = schedule_date;
    if (borrow_date !== undefined) transaction.borrow_date = borrow_date;
    if (due_date !== undefined) transaction.due_date = due_date;
    if (return_date !== undefined) transaction.return_date = return_date;

    await transaction.save();

    res.status(200).json({
      status: "success",
      message: "Cập nhật ngày giao dịch thành công",
      data: { transaction },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const { tx_id } = req.params;

    const transaction = await Transaction.findByPk(tx_id);
    if (!transaction) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy giao dịch với ID này",
      });
    }

    if (["Borrowing", "Returned"].includes(transaction.status)) {
      return res.status(400).json({
        status: "fail",
        message: "Không thể xoá giao dịch đã mượn hoặc đã trả",
      });
    }

    await transaction.destroy();

    res.status(200).json({
      status: "success",
      message: "Xoá giao dịch thành công",
    });
  } catch (error) {
    next(error);
  }
};

exports.extendDueDate = async (req, res, next) => {
  try {
    const { tx_id } = req.params;

    const transaction = await Transaction.findByPk(tx_id);
    if (!transaction) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy giao dịch với ID này",
      });
    }

    if (transaction.status !== "Borrowing") {
      return res.status(400).json({
        status: "fail",
        message: "Chỉ có thể gia hạn với sách đang được mượn",
      });
    }

    const oldDueDate = new Date(transaction.due_date);
    const extendedDate = new Date(
      oldDueDate.setDate(oldDueDate.getDate() + 15)
    );
    transaction.due_date = extendedDate;

    await transaction.save();

    res.status(200).json({
      status: "success",
      message: "Gia hạn hạn trả thành công (+15 ngày)",
      data: { transaction },
    });
  } catch (error) {
    next(error);
  }
};
