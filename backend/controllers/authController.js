// authController.js: Xử lý đăng nhập, đăng ký
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

// Tạo JWT Token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Đăng ký tài khoản
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra xem email tồn tại chưa
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email đã được sử dụng",
      });
    }

    // Tạo người dùng mới
    const newUser = await User.create({
      name,
      email,
      password,
      role: "Member",
    });

    // Tạo JWT token
    const token = signToken(newUser.id);

    // Loại bỏ mật khẩu từ response
    newUser.password = undefined;

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Đăng nhập
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra email và password có tồn tại không
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Vui lòng cung cấp đầy đủ email và mật khẩu",
      });
    }

    // Tìm người dùng theo email
    const user = await User.findOne({ where: { email } });

    // Kiểm tra người dùng và mật khẩu có đúng không
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        status: "fail",
        message: "Email hoặc mật khẩu không đúng",
      });
    }

    // Tạo JWT token
    const token = signToken(user.id);

    // Loại bỏ mật khẩu từ response
    user.password = undefined;

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Đổi mật khẩu dựa bằng xác thực mật khẩu cũ ở user
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "Người dùng không tồn tại",
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Kiểm tra mật khẩu cũ
    if (!(await user.matchPassword(currentPassword))) {
      return res.status(401).json({
        status: "fail",
        message: "Mật khẩu cũ không chính xác",
      });
    }

    // Cập nhật mật khẩu mới
    user.password = newPassword;
    await user.save(); // Luư thay đổi vào database

    // Tạo JWT token mới sau khi đổi mật khẩu
    const token = signToken(user.id);

    // Loại bỏ token
    user.password = undefined;

    res.status(200).json({
      status: "success",
      message: "Đổi mật khẩu thành công",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
