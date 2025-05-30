// loanRoutes.js        # Định tuyến mượn/trả sách
const express = require("express");
const transactionController = require("../controllers/transactionController");
const { protect, restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.post("/", transactionController.createTransaction);
router.get("/:member_id", transactionController.getAllTransactionsByUser);
router.get("/", transactionController.getAllTransactions);
// router.get("/", protect, restrictTo("Admin"), transactionController.getAllTransactions);
// router.patch(
//   "/:tx_id/update", 
//   protect, 
//   restrictTo("Admin"),  // Chỉ admin mới có quyền thay đổi
//   transactionController.updateTransactionStatus
// );
router.patch(
  "/:tx_id/update", 
  transactionController.updateTransactionStatus
);

router.patch(
  "/:tx_id/updatedate", 
  transactionController.updateTransactionDates
);
router.delete('/:tx_id', transactionController.deleteTransaction);
router.patch('/:tx_id/extend', transactionController.extendDueDate);
module.exports = router;
