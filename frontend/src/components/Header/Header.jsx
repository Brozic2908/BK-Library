// File: src/components/Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSearch } from "react-icons/fa";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <nav className="bg-red-900">
      <div className="flex justify-between p-4 items-center container mx-auto">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-xl text-white font-bold">
              BK Library
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sách..."
                className="py-1 px-3 rounded-ful text-white w-64 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-3 text-white top-2" />
            </div>

            <div className="flex items-center text-sm text-white">
              <span>Đăng nhập</span>
              <FaUser className="ml-2" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
