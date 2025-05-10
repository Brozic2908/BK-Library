// bookRoutes.js        # Định tuyến sách
const express = require("express");
const router = express.Router();
const bookController = require('../controllers/bookController');

// Định nghĩa các route sách ở đây
router.get('/', bookController.getBooks); // GET /api/books sẽ gọi bookController.getBooks
router.get('/random', bookController.getRandomBooks); 
router.get('/:id', bookController.getBookById);
router.post('/:id/borrow', bookController.bookBorrow);

module.exports = router;
