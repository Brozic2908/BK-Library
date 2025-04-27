import React from "react";
import { users } from "../../data/Books/Users";
import { books } from "../../data/Books/Books";
import { transactions } from "../../data/Books/Transactions";

const Dashboard = () => {
  const totalUsers = users.length;
  const totalBooks = books.length;
  const totalTransactions = transactions.length;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Bảng điều khiển</h1>

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