import { Link, Links } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { CiFaceFrown } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";

function History() {
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
                            <Link to="/my/history" className="block py-2 px-4 bg-primary text-white rounded shadow-lg">
                                Lịch sử mua hàng
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/my/support" className="block py-2 px-4 text-gray-800 rounded hover:bg-gray-300 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200">
                                Hỗ trợ
                            </Link>
                        </li>
                        <li>
                            <Link 
                              to="/"
                              className="block py-2 px-4 text-gray-800 rounded hover:bg-red-500 hover:shadow-lg hover:-translate-y-1 hover:text-white transform transition-all duration-200 border-t border-gray-500"
                              onClick={() => {
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
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 pb-4">
                        <select 
                            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option value="all">Tất cả</option>
                            <option value="Đang mượn">Đang mượn</option>
                            <option value="Đã trả">Đã trả</option>
                            <option value="Đã hủy">Đã hủy</option>
                        </select>
                    </div>
                    <div id="order-list" class="space-y-6">
                        {orders.length === 0 ? (
                            <div className="text-center text-gray-500 pt-10">
                                <CiFaceFrown className="mx-auto w-8 h-8"/>
                                <div>Chưa có sản phẩm nào trong trạng thái "{status}"</div>
                            </div>
                        ) : (
                            paginated.map(order => (
                            <div key={order.id} className="flex flex-col md:flex-row bg-white border rounded-lg p-4 mb-4">
                                <div className="w-24">
                                    <img src={order.hinh[0]} alt="product"/>
                                </div>
                                <div className="flex-1">
                                    <div className="h-full w-full">
                                        <div className="flex flex-col justify-between md:flex-1 md:px-4">
                                            <div className="flex">
                                                <div>
                                                    <p className="text-gray-700 font-medium">{order.ten_sp}</p>
                                                    <p className="text-gray-600">Ngày mượn: <span class="font-medium text-gray-700">{order.ngay_muon}</span></p>
                                                    <p className="text-gray-600">Số lượng: <span class="font-medium text-gray-700">{order.so_luong}</span></p>
                                                </div>
                                            </div>
                                            <div className="md:flex md:flex-col md:justify-between md:items-end mt-2 md:mt-0">
                                                <p className={getStatusColor(order.trang_thai)}>{order.trang_thai}</p>
                                                <Link to="/my/order/detail?id=1" className="text-blue-500 hover:underline font-medium">
                                                    <div>Xem chi tiết &gt;&gt;</div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))
                        )}
                    </div>
                    
                    <div className="flex justify-center mt-4 gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button
                            key={p}
                            onClick={() => setCurrentPage(p)}
                            className={`px-4 py-2 rounded ${p === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            {p}
                        </button>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default History