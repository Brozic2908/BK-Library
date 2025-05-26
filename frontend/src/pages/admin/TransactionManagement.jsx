import React, { useState } from "react";
import { transactions as transactionData } from "../../data/Books/Transactions";
import Pagination from "../../components/Pagination/Pagination";

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState(transactionData);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const handleSave = () => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === editingTransaction.id ? editingTransaction : t))
    );
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-6">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Người mượn</th>
              <th className="p-3">Sách</th>
              <th className="p-3">Ngày mượn</th>
              <th className="p-3">Ngày trả</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((transaction) => (
              <tr key={transaction.id} className="border-t">
                <td className="p-3">{transaction.id}</td>
                <td className="p-3">{transaction.user}</td>
                <td className="p-3">{transaction.book}</td>
                <td className="p-3">{transaction.borrow_date || "Chưa mượn"}</td>
                <td className="p-3">{transaction.return_date || "Chưa trả"}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(transaction)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Chỉnh sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          totalItems={transactions.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        {/* Modal */}
        {showModal && editingTransaction && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900/30 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-2xl w-[700px] space-y-4 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Chỉnh sửa giao dịch</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="block font-medium mb-1">Người mượn</label>
                    <input
                      type="text"
                      value={editingTransaction.user}
                      disabled
                      className="w-full p-2 border rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Sách</label>
                    <input
                      type="text"
                      value={editingTransaction.book}
                      disabled
                      className="w-full p-2 border rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Trạng thái</label>
                    <select
                      value={editingTransaction.status}
                      onChange={(e) =>
                        setEditingTransaction({ ...editingTransaction, status: e.target.value })
                      }
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="Pending">Đang chờ</option>
                      <option value="Borrowing">Đang mượn</option>
                      <option value="Returned">Đã trả</option>
                      <option value="Cancel">Đã hủy</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block font-medium mb-1">Ngày đặt</label>
                    <input
                      type="date"
                      value={editingTransaction.schedule_date || ""}
                      onChange={(e) =>
                        setEditingTransaction({ ...editingTransaction, schedule_date: e.target.value })
                      }
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Ngày mượn</label>
                    <input
                      type="date"
                      value={editingTransaction.borrow_date || ""}
                      onChange={(e) =>
                        setEditingTransaction({ ...editingTransaction, borrow_date: e.target.value })
                      }
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Hạn trả</label>
                    <input
                      type="date"
                      value={editingTransaction.due_date || ""}
                      onChange={(e) =>
                        setEditingTransaction({ ...editingTransaction, due_date: e.target.value })
                      }
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">Ngày trả</label>
                    <input
                      type="date"
                      value={editingTransaction.return_date || ""}
                      onChange={(e) =>
                        setEditingTransaction({ ...editingTransaction, return_date: e.target.value })
                      }
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Lưu
                </button>
                <button
                  onClick={() => handleDelete(editingTransaction.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Xóa
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionManagement;
