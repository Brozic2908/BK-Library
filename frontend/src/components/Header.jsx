
import React from "react";

export default function Header() {
  return (
    <header className="bg-[#800000] text-white py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold">BK Library</div>
      <nav className="space-x-6">
        <a href="#" className="hover:underline">Trang chủ</a>
        <a href="#" className="hover:underline">Sách</a>
        <a href="#" className="hover:underline">Tài khoản</a>
      </nav>
      <div className="flex items-center space-x-2">
        <input type="text" placeholder="Tìm kiếm..." className="rounded px-2 py-1 text-black" />
        <span className="material-icons">person</span>
      </div>
    </header>
  );
}
