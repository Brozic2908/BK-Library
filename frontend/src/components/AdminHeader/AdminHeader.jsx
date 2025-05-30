// components/admin/Header.jsx
import { Bell, Menu, LogOut, Lock } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminHeader({ toggleSidebar, pageTitle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const menuRef = useRef();
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const requestLogout = () => {
    setConfirmAction("logout");
  };

  const requestLock = () => {
    setConfirmAction("lock");
  };

  const handleConfirmYes = () => {
    if (confirmAction === "logout" || confirmAction === "lock") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      navigate("/login");
    }
    setConfirmAction(null);
  };

  const handleConfirmNo = () => {
    setConfirmAction(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 mr-4 rounded-md bg-primary text-white hover:bg-red-800 focus:outline-none lg:hidden"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl hidden lg:block font-semibold text-gray-800">
            {pageTitle}
          </h1>
        </div>
        <h1 className="text-xl lg:hidden font-semibold text-gray-800">
          {pageTitle}
        </h1>

        <div className="flex items-center space-x-4">
          <button className="relative p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
            <Bell size={20} />
            <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Avatar + Dropdown */}
          <div className="relative" ref={menuRef}>
            <div
              className="flex items-center cursor-pointer"
              onClick={handleToggleMenu}
            >
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                A
              </div>
              <span className="ml-2 text-sm font-medium">Admin</span>
            </div>

            {menuOpen && (
              <div className="absolute right-0 mt-4 w-48 bg-white border rounded-md shadow-lg py-2 z-50">
                <button
                  onClick={requestLogout}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={18} className="mr-2" />
                  Đăng xuất
                </button>
                <button
                  onClick={requestLock}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <Lock size={18} className="mr-2" />
                  Khóa tài khoản
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Xác nhận hành động */}
      {confirmAction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 space-y-4 text-center">
            <h2 className="text-lg font-bold">
              {confirmAction === "logout"
                ? "Bạn có muốn đăng xuất?"
                : "Bạn có muốn khóa tài khoản?"}
            </h2>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={handleConfirmYes}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Có
              </button>
              <button
                onClick={handleConfirmNo}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
