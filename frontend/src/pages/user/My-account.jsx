import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { userService } from "../../services";
import { toast } from "react-toastify";

function Myaccount() {
  const [userData, setUserData] = useState({
    acc_status: "",
    email: "",
    gender: "",
    name: "",
    role: "",
    user_id: 0,
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("UserID:", userId);
    if (userId) {
      userService
        .getUserById(userId)
        .then((data) => {
          console.log("User Data:", data);
          if (data) setUserData(data.data.user);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    const userId = localStorage.getItem("userId");
    try {
      await userService.updateUserInfo(userId, userData);
      toast.success("Cập nhật thành công");
    } catch (err) {
      toast.error("Lỗi cập nhật thông tin. Vui lòng thử lại sau");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("Xác nhận mật khẩu mới không khớp!");
      return;
    }
    try {
      if (await userService.updatePassword({ currentPassword, newPassword })) {
        toast.success("Đổi mật khẩu thành công.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        toast.error("Lỗi đổi mật khẩu. Vui lòng thử lại sau");
      }
    } catch (err) {
      toast.error("Lỗi đổi mật khẩu. Vui lòng thử lại sau");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="overflow-y-auto">
        <main className="container max-w-screen-1200 min-h-screen mx-auto px-1 lg:px-0">
          <div className="flex gap-4 pt-6">
            <div className="w-1/4 bg-white hidden lg:block flex flex-col text-gray-800 p-4 shadow-md rounded-lg  ">
              <nav>
                <ul>
                  <li className="mb-4">
                    <Link
                      to="/my/profile"
                      className="block py-2 px-4 text-gray-800 rounded hover:bg-gray-300 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200"
                    >
                      Trang chủ
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      to="/my/account"
                      className="block py-2 px-4 bg-primary text-white rounded shadow-lg border-t border-gray-500"
                    >
                      Tài khoản của bạn
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      to="/my/history"
                      className="block py-2 px-4 text-gray-800 rounded hover:bg-gray-300 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200"
                    >
                      Lịch sử mượn sách
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      to="/my/support"
                      className="block py-2 px-4 text-gray-800 rounded hover:bg-gray-300 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200"
                    >
                      Hỗ trợ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="block py-2 px-4 text-gray-800 rounded hover:bg-red-500 hover:shadow-lg hover:-translate-y-1 hover:text-white transform transition-all duration-200 border-t border-gray-500"
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                        localStorage.removeItem("userId");
                        setDropdownOpen(false);
                        setIsLoggedIn(false);
                      }}
                    >
                      Thoát tài khoản
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="w-full lg:w-3/4 rounded-lg space-y-6">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 bg-white p-10 shadow-md rounded-lg">
                  <h2 className="text-3xl font-bold mb-6">
                    Thông tin tài khoản
                  </h2>
                  <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                    <div className="flex-1">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Họ và Tên
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        value={userData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-100 cursor-not-allowed"
                        value={userData.email}
                        onChange={handleChange}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-1">
                      Giới tính
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          id="Male"
                          name="gender"
                          value="Male"
                          checked={userData.gender === "male"}
                          onChange={handleChange}
                          className="form-radio text-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Nam</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          id="Female"
                          name="gender"
                          value="Female"
                          checked={userData.gender === "female"}
                          onChange={handleChange}
                          className="form-radio text-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Nữ</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          id="other"
                          name="gender"
                          value="Other"
                          checked={userData.gender === "Other"}
                          onChange={handleChange}
                          className="form-radio text-blue-500"
                        />
                        <span className="ml-2 text-gray-700">Khác</span>
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="level"
                      className="block text-gray-700 font-semibold mb-2"
                    >
                      Cấp độ
                    </label>
                    <input
                      type="text"
                      id="level"
                      value={userData.role}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-gray-100 cursor-not-allowed"
                      readOnly
                    />
                  </div>
                  <div className="text-right">
                    <button
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={handleSaveChanges}
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
                <div className="flex-1 bg-white p-10 shadow-md rounded-lg">
                  <h2 className="text-3xl font-bold mb-6">Đổi mật khẩu</h2>
                  <form id="changePasswordForm" onSubmit={handleChangePassword}>
                    <div className="mb-4">
                      <label
                        htmlFor="old-password"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Mật khẩu cũ
                      </label>
                      <input
                        type="password"
                        id="old-password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Nhập mật khẩu cũ"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="new-password"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Mật khẩu mới
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Nhập mật khẩu mới"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="auth-password"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Xác nhận mật khẩu mới
                      </label>
                      <input
                        type="password"
                        id="auth-password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Xác nhận mật khẩu"
                        required
                      />
                    </div>

                    <div className="text-right">
                      <button
                        id="change-password-btn"
                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Thay đổi
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Myaccount;
