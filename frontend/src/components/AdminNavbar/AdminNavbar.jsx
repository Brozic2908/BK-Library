import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, BookOpen, RepeatIcon, LogOut, X } from "lucide-react";

export default function AdminNavbar({
  isSidebarOpen,
  setIsSidebarOpen,
  onLogout,
}) {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: <Home size={20} />, title: "Trang chủ" },
    {
      path: "/admin/users",
      icon: <Users size={20} />,
      title: "Quản lý người dùng",
    },
    {
      path: "/admin/books",
      icon: <BookOpen size={20} />,
      title: "Quản lý sách",
    },
    {
      path: "/admin/transactions",
      icon: <RepeatIcon size={20} />,
      title: "Quản lý giao dịch",
    },
  ];

  return (
    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 transition-transform duration-300 ease-in-out bg-gray-900 text-white`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
        <Link to="/admin" className="flex items-center">
          <span className="text-xl font-bold">BK LIBRARY</span>
        </Link>
        <button
          className="lg:hidden text-white"
          onClick={() => setIsSidebarOpen(false)}
        >
          <X size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <div className="px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 transition-colors rounded-md ${
                location.pathname === item.path
                  ? "bg-blue-700 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <div className="mr-3">{item.icon}</div>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Logout button */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-3 text-gray-300 transition-colors rounded-md hover:bg-gray-800 hover:text-white"
        >
          <LogOut size={20} className="mr-3" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}
