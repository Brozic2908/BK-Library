# 📁 Folder Structure

```bash
library-management-system/
├── config/
│   ├── config.js            # Cấu hình MySQL và các biến môi trường
│   └── database.js          # Kết nối đến cơ sở dữ liệu
├── controllers/
│   ├── authController.js    # Xử lý đăng nhập, đăng ký
│   ├── bookController.js    # Xử lý thao tác với sách
│   ├── userController.js    # Xử lý thao tác với người dùng
│   └── loanController.js    # Xử lý thao tác mượn/trả sách
├── middlewares/
│   ├── auth.js              # Middleware xác thực người dùng
│   └── errorHandler.js      # Middleware xử lý lỗi
├── models/
│   ├── Book.js              # Model sách
│   ├── User.js              # Model người dùng
│   ├── Loan.js              # Model mượn sách
│   └── index.js             # Kết nối các model
├── routes/
│   ├── authRoutes.js        # Định tuyến xác thực
│   ├── bookRoutes.js        # Định tuyến sách
│   ├── userRoutes.js        # Định tuyến người dùng
│   ├── loanRoutes.js        # Định tuyến mượn/trả sách
│   └── index.js             # Tập hợp các routes
├── utils/
│   ├── validation.js        # Các hàm xác thực đầu vào
│   └── helpers.js           # Các hàm tiện ích
├── .env                     # Biến môi trường
├── app.js                   # Cấu hình ứng dụng
└── server.js                # Điểm khởi đầu ứng dụng
```
