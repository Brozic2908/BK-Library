# BK Library Project

BK Library là một ứng dụng web thư viện sách được xây dựng bằng ReactJS, Vite và Tailwind CSS. Dự án này mô phỏng một trang web thư viện sách, cho phép người dùng duyệt qua các đầu sách, xem chi tiết sách và lọc sách theo danh mục.

## Tính năng

- 📚 Hiển thị danh sách sách mới nhất
- 🔍 Tìm kiếm sách
- 📑 Xem chi tiết sách
- 🗂️ Lọc sách theo danh mục
- 📱 Giao diện responsive

## Công nghệ sử dụng

- [ReactJS](https://reactjs.org/) - Thư viện UI
- [Vite](https://vitejs.dev/) - Build tool
- [React Router](https://reactrouter.com/) - Điều hướng trong ứng dụng
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [React Icons](https://react-icons.github.io/react-icons/) - Thư viện icon
- [Font awesome](https://fontawesome.com/search?q=gaming&o=r&ic=free) - Thư viện icon

## Cài đặt

### Yêu cầu

- Node.js (phiên bản 14.x trở lên)
- npm (phiên bản 6.x trở lên)

### Các bước cài đặt

1. Clone repository về máy:
```bash
git clone https://github.com/your-username/bk-library.git
cd bk-library
```

2. Cài đặt các dependencies:
```bash
npm install
```

3. Chạy ứng dụng ở môi trường development:
```bash
npm run dev
```

4. Mở trình duyệt và truy cập: `http://localhost:5173`

## Cấu trúc dự án

```
bk-library/
├── public/                 # Tài nguyên tĩnh
│   ├── books/              # Hình ảnh sách
├── src/
│   ├── assets/             # Tài nguyên của ứng dụng
│   ├── components/         # Các component có thể tái sử dụng
│   ├── data/               # Dữ liệu mẫu
│   ├── layouts/            # Các layout component
│   ├── pages/              # Các trang trong ứng dụng
│   ├── App.jsx             # Component gốc của ứng dụng
│   ├── index.css           # CSS global
│   └── main.jsx            # Entry point
├── .gitignore
├── package.json
├── tailwind.config.js      # Cấu hình Tailwind CSS
├── vite.config.js          # Cấu hình Vite
└── README.md
```

## Cách sử dụng

### Trang chủ
- Trang chủ hiển thị banner chào mừng và danh sách sách mới
- Người dùng có thể nhấp vào "Xem thêm" để xem tất cả sách

### Xem chi tiết sách
- Nhấp vào bất kỳ sách nào để xem thông tin chi tiết
- Trang chi tiết hiển thị bìa sách, tên sách, tác giả, đánh giá và mô tả

### Lọc sách
- Trên trang "Tất cả sách", người dùng có thể lọc sách theo danh mục
- Các danh mục hiện có: Tất cả, Lập trình, Cơ sở dữ liệu, Web

### Tìm kiếm sách
- Sử dụng thanh tìm kiếm ở header để tìm sách theo tên

## Deployment

Để build ứng dụng cho production:

```bash
npm run build
```

Kết quả build sẽ nằm trong thư mục `dist/` và có thể được deploy lên các dịch vụ hosting như Netlify, Vercel, hay Firebase Hosting.

## Giấy phép

[MIT](LICENSE)
