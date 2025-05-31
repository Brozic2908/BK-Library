# 📚 BK Library - Hệ thống quản lý thư viện trực tuyến

BK Library là một hệ thống web được phát triển nhằm hỗ trợ việc quản lý sách, độc giả và hoạt động mượn/trả sách tại các thư viện trường học. Dự án bao gồm hai phần chính: frontend cho người dùng và backend cho quản trị viên, giúp tự động hóa quy trình nghiệp vụ thư viện một cách hiệu quả.

---

## 🚀 Tính năng nổi bật

### Người dùng (User)

- 📖 Duyệt và tìm kiếm sách theo tên hoặc danh mục
- 📑 Xem thông tin chi tiết của từng cuốn sách
- 🛒 Đăng nhập và thực hiện mượn sách

### Quản trị viên (Admin)

- 👤 Quản lý người dùng
- 📚 Quản lý danh mục và thông tin sách
- 📆 Theo dõi lịch sử mượn/trả sách

---

## 🧠 Kiến trúc hệ thống

### Backend

- **Node.js + Express** phục vụ các API RESTful
- Mô hình **MVC** (Model - View - Controller) tách biệt rõ ràng giữa logic, dữ liệu và API
- Bảo mật:
  - Băm mật khẩu bằng **bcrypt**
  - Xác thực người dùng bằng **JWT**
- Kết nối cơ sở dữ liệu SQL thông qua **ORM**

### Frontend

- **ReactJS + Vite** cho tốc độ build nhanh và trải nghiệm mượt mà
- **Tailwind CSS** giúp thiết kế giao diện responsive nhanh chóng
- **React Router** để điều hướng nhiều trang
- Triển khai giao diện quản lý (Admin UI) và người dùng (User UI) độc lập nhưng đồng bộ

---

## 🧰 Công nghệ sử dụng

| Layer         | Công nghệ chính                           |
| ------------- | ----------------------------------------- |
| Frontend      | ReactJS, Vite, Tailwind CSS, React Router |
| Backend       | Node.js, Express, JWT, bcrypt, ORM, CORS  |
| Cơ sở dữ liệu | MySQL (qua file SQLInput.sql)             |
| Icons         | React Icons, Font Awesome                 |

---

## 🗂️ Cấu trúc dự án

```bash
BK_Library/
├── backend/
│ ├── config/ # Thiết lập cơ sở dữ liệu
│ ├── controllers/ # Xử lý logic cho API
│ ├── middlewares/ # Xác thực JWT, xử lý lỗi
│ ├── models/ # ORM models
│ ├── routes/ # Định nghĩa API endpoints
│ ├── server.js # Khởi chạy máy chủ
│ └── app.js # Cấu hình Express app
│ └── db.sql # Tạo database
│ └── SQLInput.sql # Input database
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/ # Các component giao diện
│ │ ├── pages/ # Các trang chính (Home, Book Detail, Admin, v.v.)
│ │ ├── assets/ # Ảnh, icon, font
│ │ ├── layouts/ # Cấu hình các khung của member/admin
│ │ ├── data/ # Mockup data phụ vụ test frontend
│ │ ├── services/ # Định nghĩa hàm truy xuất dữ liệu
│ │ └── main.jsx # Điểm khởi đầu ứng dụng
│ └── index.html # Khởi tạo root đầu tiên
```

---

## 💻 Cài đặt & chạy thử

### 1. Clone repository

```bash
git clone https://github.com/your-username/bk-library.git
cd bk-library
```

### 2. Cài đặt backend

```bash
cd backend
npm install
npm run dev
```

Server mặc định chạy tại: [http://localhost:3000](http://localhost:3000)

### 3. Cài đặt frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend mặc định chạy tại: [http://localhost:5173](http://localhost:5173)

---

## 🔐 Ghi chú bảo mật

Tất cả mật khẩu đều được mã hóa bằng thuật toán bcrypt trước khi lưu.

Các endpoint yêu cầu xác thực sẽ kiểm tra JWT hợp lệ ở Authorization Header.

---

## 📦 Build cho production

```bash
cd frontend
npm run build
```

Kết quả sẽ nằm trong thư mục dist/ sẵn sàng để deploy lên Vercel, Netlify hoặc Firebase Hosting.

---

## 📃 License

Phát hành theo giấy phép [MIT](LICENSE)

---

## ✨ Đóng góp

Nếu bạn muốn đóng góp cho dự án, hãy tạo một pull request hoặc liên hệ với nhóm phát triển qua email.
