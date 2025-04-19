frontend/
├── public/                   # Chứa các file tĩnh (hình ảnh sách, favicon,...)
│
├── src/                      # Source code chính
│   ├── assets/              # Tài nguyên bổ sung (ví dụ: icons, hình ảnh nội bộ)
│   ├── components/          # Các component tái sử dụng (Header, Footer, BookCard, ...)
│   ├── App.css              # CSS chính của App
│   ├── App.jsx              # Component gốc, cấu hình route
│   ├── index.css            # Nạp Tailwind và định dạng CSS toàn cục
│   ├── index.js             # Điểm khởi đầu ứng dụng React
│   └── main.jsx             # Mount App vào DOM
│
├── index.html               # HTML chính do Vite sử dụng
├── tailwind.config.js       # Cấu hình Tailwind CSS
├── postcss.config.js        # Cấu hình PostCSS
├── vite.config.js           # Cấu hình Vite
├── package.json             # Khai báo thư viện và script
├── .gitignore               # Bỏ qua file/thư mục khi commit
└── README.md                # Tài liệu mô tả dự án