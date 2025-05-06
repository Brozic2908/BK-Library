// middleware/auth.js: Middleware xác thực người dùng
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

exports.protect = async (req, res, next) => {
  let token;

  // Kiểm tra token từ header Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Kiểm tra nếu không có token
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Bạn chưa đăng nhập! Vui lòng đăng nhập để tiếp tục.",
    });
  }

  try {
    // Xác thực token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // Tìm người dùng từ id được mã hóa trong token
    const currentUser = await User.findByPk(decode.id);

    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "Người dùng sở hữu token này không còn tồn tại.",
      });
    }

    // Gán người dùng vào request để sử dụng trong các xử lý tiếp theo
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Token không hợp lệ hoặc hết hạn!",
    });
  }
};

// Kiểm tra quyền truy cập
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "Bạn không có quyền thực hiện hành động này!",
      });
    }
    next();
  };
};
