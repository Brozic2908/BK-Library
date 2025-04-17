import { Link, Links } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { CiFaceFrown } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";

function Support() {
  const mockOrders = [
    {
        id: 1,
        ten_sp: "React Native Note for Professionals",
        hinh: ["/asset/images/database_systems7th.png"],
        ngay_muon: "23-03-2025",
        so_luong: 1,
        trang_thai: "Đang mượn"
    },
    {
        id: 2,
        ten_sp: "Fundamentals of database systems 7th",
        hinh: ["/asset/images/database_systems7th.png"],
        ngay_muon: "2025-04-10",
        so_luong: 1,
        trang_thai: "Đã trả"
    },
    {
        id: 3,
        ten_sp: "Fundamentals of database systems 7th",
        hinh: ["/asset/images/database_systems7th.png"],
        ngay_muon: "2025-04-10",
        so_luong: 1,
        trang_thai: "Đã trả"
    },
  ];

  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;
  const getStatusColor = (trang_thai) => {
    switch (trang_thai) {
      case 'Đã trả': return 'text-sm px-3 py-1 font-medium rounded-full inline bg-green-200 text-green-800';
      case 'Đang mượn': return 'text-sm px-3 py-1 font-medium rounded-full inline bg-blue-200 text-blue-800';
      case 'Đã hủy': return 'text-sm px-3 py-1 font-medium rounded-full inline bg-red-200 text-red-800';
      default: return 'text-sm px-3 py-1 font-medium rounded-full inline bg-gray-200 text-gray-700';
    }
  };
  useEffect(() => {
    // Giả lập fetch từ API
    setOrders(mockOrders);
  }, [])
  const totalPages = Math.ceil(orders.length / ordersPerPage);
//   const paginated = orders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);
  const paginated = orders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  return (
    <div className="bg-gray-100">
      <div className="overflow-y-auto">
        <main className="container max-w-screen-1200 min-h-screen mx-auto px-1 lg:px-0">
          <div className="flex gap-4 pt-6">
            <div className="w-1/4 bg-white hidden lg:block flex flex-col text-gray-800 p-4 shadow-md rounded-lg ">
                <nav>
                    <ul>
                        <li className="mb-4">
                            <Link to="/my/profile" className="block py-2 px-4 text-gray-800 rounded hover:bg-gray-300 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200">
                                Trang chủ
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/my/account" className="block py-2 px-4 text-gray-800 rounded hover:bg-gray-300 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200 border-t border-gray-500">
                                Tài khoản của bạn
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/my/history" className="block py-2 px-4 text-gray-800 rounded hover:bg-gray-300 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200">
                                Lịch sử mua hàng
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/my/support" className="block py-2 px-4 bg-primary text-white rounded shadow-lg">
                                Hỗ trợ
                            </Link>
                        </li>
                        <li>
                            <Link 
                              to="/"
                              className="block py-2 px-4 text-gray-800 rounded hover:bg-red-500 hover:shadow-lg hover:-translate-y-1 hover:text-white transform transition-all duration-200 border-t border-gray-500"
                              onClick={() => {
                                setDropdownOpen(false)
                                setIsLoggedIn(false);
                              }}
                            >
                                Thoát tài khoản
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 w-full lg:w-3/4 rounded-lg">
                <div className="flex-1 bg-white p-5 shadow-md rounded-xl flex items-center">
                    <div className="w-16 h-16 flex-shrink-0 mr-4">
                        <img src="/asset/images/complaint.png" alt="khiếu nại" className="w-full h-full object-cover rounded-full"/>
                    </div>
                    <div>
                        <h5 className="font-bold text-lg text-gray-800 capitalize">Khiếu Nại</h5>
                        <p className="text-lg text-yellow-500">+84 123 456 789</p>
                    </div>
                </div>
                <div className="flex-1 bg-white p-5 shadow-md rounded-xl flex items-center">
                    <div className="w-16 h-16 flex-shrink-0 mr-4">
                        <img src="/asset/images/consultation.png" alt="tư vấn" className="w-full h-full object-cover rounded-full"/>
                    </div>
                    <div>
                        <h5 className="font-bold text-lg text-gray-800 capitalize">Tư Vấn Hổ Trợ</h5>
                        <p className="text-lg text-yellow-500">+84 123 456 789</p>
                    </div>
                </div>
                <div className="flex-1 bg-white p-5 shadow-md rounded-xl flex items-center">
                    <div className="w-16 h-16 flex-shrink-0 mr-4">
                        <img src="/asset/images/facebook.png" alt="Facebook" className="w-full h-full object-cover rounded-full"/>
                    </div>
                    <div>
                        <h5 className="font-bold text-lg text-gray-800 capitalize">Facebook</h5>
                        <p className="text-lg text-yellow-500">www.facebook.com/BKLibrary</p>
                    </div>
                </div>
                <div className="flex-1 bg-white p-5 shadow-md rounded-xl flex items-center">
                    <div className="w-16 h-16 flex-shrink-0 mr-4">
                        <img src="/asset/images/email.png" alt="Email" className="w-full h-full object-cover rounded-full"/>
                    </div>
                    <div>
                        <h5 className="font-bold text-lg text-gray-800 capitalize">Email</h5>
                        <p className="text-lg text-yellow-500">conctact@website.com</p>
                    </div>
                </div>
            </div>                
          </div>
        </main>
      </div>
    </div>
  )
}

export default Support