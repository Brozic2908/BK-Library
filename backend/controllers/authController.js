// authController.js: Xử lý đăng nhập, đăng ký
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const sendMail = require("../services/sendMail");
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
    const token = signToken(newUser.user_id);

    // Loại bỏ mật khẩu từ response
    newUser.password = undefined;

    // Gửi mail thống báo thành công
    await sendMail({
      emailReceiver: email,
      subject: "Chúc mừng bạn đã đăng ký thành công hội viên BK Library",
      html: `
        <h1>Cảm ơn bạn đã tham gia làm hội viên của <span style="color: #82181a">BK Library</span></h1>
        <p>Hiện tại bạn đã có thể tham gia mượn sách tại thư viện BK Library</p>
      `,
    });

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
    const token = signToken(user.user_id);

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
    const user = await User.findByPk(req.user.user_id);

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
    const token = signToken(user.user_id);

    // Loại bỏ token
    user.password = undefined;

    res.status(200).json({
      status: "success",
      token: token,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         message:
 *           type: string
 *           example: Đã có lỗi xảy ra
 *     login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: example@gmail.com
 *         password:
 *           type: string
 *           example: "12345678"
 *     register:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Nguyen Van A
 *         email:
 *           type: string
 *           example: example@gmail.com
 *         password:
 *           type: string
 *           example: "12345678"
 *     successAuth:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "success"
 *         token:
 *           type: string
 *           example: $2b$10$8deahvzYJj3tpHu...
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Nguyen Van A
 *                 email:
 *                   type: string
 *                   example: example@gmail.com
 *                 acc_status:
 *                   type: string
 *                   enum: [active, banned]
 *                 role:
 *                   type: string
 *                   enum: [member, admin]
 *                 gender:
 *                   type: string
 *                   enum: [male, female, other]
 *                 address:
 *                   type: string
 *                   example: Dong Hoa, Di An, Binh Duong
 *                 createdAt:
 *                   type: string
 *                   format: date
 *                   description: Ngày tạo tài khoản
 *                   example: 2025-05-29T06:18:51.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date
 *                   description: Ngày cập nhật tài khoản
 *                   example: 2025-05-29T06:18:51.000Z
 */
