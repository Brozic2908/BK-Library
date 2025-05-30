// const { DataTypes } = require("sequelize");
// const bcrypt = require("bcrypt");
// const { sequelize } = require("../config/database");

// const User = sequelize.define(
//   "User",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false,
//       validate: {
//         isEmail: true,
//       },
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [8, 100],
//       },
//     },
//     role: {
//       type: DataTypes.ENUM("Member", "Admin"),
//       defaultValue: "Member",
//     },
//     phone: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     genger: {
//       type: DataTypes.ENUM("male", "female", "other"),
//       defaultValue: "male",
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     acc_status: {
//       type: DataTypes.ENUM("active", "banned"),
//       defaultValue: "active",
//     },
//   },
//   {
//     timestamps: true,
//     hooks: {
//       beforeCreate: async (user) => {
//         if (user.password) {
//           const salt = await bcrypt.genSalt(10);
//           user.password = await bcrypt.hash(user.password, salt);
//         }
//       },
//       beforeUpdate: async (user) => {
//         if (user.changed("password")) {
//           const salt = await bcrypt.genSalt(10);
//           user.password = await bcrypt.hash(user.password, salt);
//         }
//       },
//     },
//   }
// );

// // Phương thức kiểm tra mật khẩu
// User.prototype.matchPassword = async function (enterdPassword) {
//   return await bcrypt.compare(enterdPassword, this.password);
// };

// module.exports = User;

//thay đổi vì data sai
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { sequelize } = require("../config/database");

const User = sequelize.define(
  "User",
  {
    user_id: {
      // sửa tên đúng với DB
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
    acc_status: {
      // đổi theo DB
      type: DataTypes.ENUM("active", "banned"),
      allowNull: false,
      defaultValue: "active",
    },
    role: {
      type: DataTypes.ENUM("admin", "member"),
      allowNull: false,
      defaultValue: "member",
    },
    gender: {
      // sửa typo
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
      defaultValue: "male",
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "User", // tên bảng đúng
    timestamps: false, // bảng không có createdAt, updatedAt
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

// Phương thức kiểm tra mật khẩu
User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User;
