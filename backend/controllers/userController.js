// userController.js    # Xử lý thao tác với người dùng
const { User } = require("../models");

// Lấy danh sách tất cả người dùng
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Lấy thông tin một người dùng theo ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy người dùng với ID này",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, phone, address, gender } = req.body;

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy người dùng nào với id này",
      });
    }

    // Cập nhật thông tin người dùng
    await user.update({
      name: name || user.name,
      email: email || user.email,
      phone: phone || user.phone,
      address: address || user.address,
      gender: gender || user.gender,
    });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Cập nhật thông tin của người dùng (chỉ admin)
exports.updateUserByAdmin = async (req, res, next) => {
  try {
    const { name, email, phone, address, gender, role, acc_state } = req.body;

    if (!role || !["Member", "Admin"].includes(role)) {
      return res.status(400).json({
        status: "fail",
        message: "Vui lòng cung cấp vai trò hợp lệ (User, Admin)",
      });
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy người dùng với ID này.",
      });
    }

    // Cập nhật thông tin người dùng
    await user.update({
      name: name || user.name,
      email: email || user.email,
      phone: phone || user.phone,
      address: address || user.address,
      gender: gender || user.gender,
      role: role || user.role,
      acc_state: acc_state || user.acc_state,
    });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};
