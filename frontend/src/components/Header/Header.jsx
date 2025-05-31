// File: src/components/Header.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSearch,
  FaHistory,
  FaLock,
  FaSignOutAlt,
} from "react-icons/fa";
import { userService } from "../../services";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    acc_status: "",
    email: "",
    gender: "",
    name: "",
    role: "",
    user_id: 0,
  });

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
  // const avatar = "/asset/images/avatar.png";
  const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=random`;


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/all-books?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <nav className="bg-primary sticky top-0 z-50">
      <div className="flex justify-between p-4 items-center container mx-auto max-w-screen-1200">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl text-white font-bold hidden md:block">
            BK Library
          </Link>
          <Link to="/" className="text-xl text-white font-bold block md:hidden">
            BL
          </Link>
        </div>

        {/* Menu */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-base text-white hidden md:block hover:underline"
          >
            Trang chủ
          </Link>
          <Link
            to="/my/history"
            className="text-base text-white hidden md:block hover:underline"
          >
            Lịch sử mua hàng
          </Link>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex items-center mx-4 ml-6 flex-1 justify-center"
        >
          <button
            type="submit"
            className="bg-white text-white rounded-l-xl p-2 hover:bg-gray-200 h-10"
          >
            <FaSearch className="w-5 h-5 text-gray-500" />
          </button>
          <input
            type="text"
            placeholder="Tìm kiếm sách..."
            className="bg-white border rounded-r-xl p-5 h-10 w-full lg:w-4/6 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* User Dropdown */}
        {isLoggedIn ? (
          <div className="relative">
            <div className="flex items-center space-x-2 text-white">
              <span className="hidden md:block">{userData.name}</span>
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-10 bg-white border rounded-lg shadow-lg">
                  <div className="pt-4 pb-4 pr-3 pl-3 w-72">
                    <div className="flex gap-2 w-full">
                      <img
                        src={avatar}
                        alt="user avatar"
                        className="w-10 h-10 rounded-full cursor-pointer"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-black">
                          {userData.name}
                        </div>
                        <div className="text-sm text-gray-700">
                          {userData.email}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 pt-2">
                      Quản lý tài khoản
                    </div>
                    <ul className="pt-2 text-sm text-black">
                      <li>
                        <Link
                          to="/my/profile"
                          className="px-3 py-2 hover:bg-gray-200 cursor-pointer rounded-lg flex gap-1 items-center"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FaUser className="h-6 mr-2" />
                          <div>Thông tin tài khoản</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/my/history"
                          className="px-3 py-2 hover:bg-gray-200 cursor-pointer rounded-lg flex gap-1 items-center"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FaHistory className="h-6 mr-2" />
                          <div>Lịch sử mua hàng</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/my/account"
                          className="px-3 py-2 hover:bg-gray-200 cursor-pointer rounded-lg flex gap-1 items-center"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FaLock className="h-6 mr-2" />
                          <div>Thay đổi mật khẩu</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/"
                          className="px-3 py-2 hover:bg-red-500 hover:text-white cursor-pointer rounded-lg flex gap-1 items-center"
                          onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("role");
                            localStorage.removeItem("userId");
                            setDropdownOpen(false);
                            setIsLoggedIn(false);
                          }}
                        >
                          <FaSignOutAlt className="h-6 mr-2" />
                          <div>Đăng xuất</div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="flex items-center text-base border-2 border-white rounded-full px-2 py-1 hover:bg-white transition duration-300 hover:text-gray-500 text-white"
            >
              <span className="hidden md:block mr-2">Đăng nhập</span>
              <FaUser className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
