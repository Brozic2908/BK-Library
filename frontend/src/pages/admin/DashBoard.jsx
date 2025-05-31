import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000/api";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/transactions/stats`);
      const stats = res.data.data;

      setTotalUsers(stats.total_users || 0);
      setTotalBooks(stats.total_books || 0);
      setTotalTransactions(stats.total_transactions || 0);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu Dashboard:", error);
    }
  };


    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-500 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold">Tổng người dùng:</h2>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold">Số sản phẩm:</h2>
          <p className="text-3xl font-bold">{totalBooks}</p>
        </div>

        <div className="bg-green-900 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold">Số giao dịch:</h2>
          <p className="text-3xl font-bold">{totalTransactions}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
