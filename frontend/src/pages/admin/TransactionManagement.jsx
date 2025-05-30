import React, { useEffect, useState } from "react";
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

  const API_BASE = "http://localhost:3000/api";

  useEffect(() => {
    fetch(`${API_BASE}/transactions`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          // Chuyển đổi dữ liệu từ API thành định dạng FE đang cần
          const transformed = data.data.transactions.map((t) => ({
            id: t.tx_id,
            user: t.member?.name || "Không rõ",
            book: t.book?.title || "Không rõ",
            schedule_date: t.schedule_date,
            borrow_date: t.borrow_date,
            due_date: t.due_date,
            return_date: t.return_date,
            status: t.status,
          }));
          setTransactions(transformed);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu:", error);
      });
  }, []);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  // const handleSave = () => {
  //   setTransactions((prev) =>
  //     prev.map((t) => (t.id === editingTransaction.id ? editingTransaction : t))
  //   );
  //   setShowModal(false);
  // };
  const handleSave = async () => {
    const original = transactions.find((t) => t.id === editingTransaction.id);
    const updates = [];
    let hasStatusChanged = editingTransaction.status !== original.status;
    let hasDateChanged = 
      editingTransaction.schedule_date !== original.schedule_date ||
      editingTransaction.borrow_date !== original.borrow_date ||
      editingTransaction.due_date !== original.due_date ||
      editingTransaction.return_date !== original.return_date;

    try {
      if (hasStatusChanged) {
        const res = await fetch(`${API_BASE}/transactions/${editingTransaction.id}/update`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: editingTransaction.status }),
        });

        const result = await res.json();
        if (result.status !== "success") {
          alert("Cập nhật trạng thái thất bại: " + result.message);
          return;
        }
        updates.push("trạng thái");
      }

      if (hasDateChanged) {
        const res = await fetch(`${API_BASE}/api/transactions/${editingTransaction.id}/updatedate`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            schedule_date: editingTransaction.schedule_date,
            borrow_date: editingTransaction.borrow_date,
            due_date: editingTransaction.due_date,
            return_date: editingTransaction.return_date,
          }),
        });

        const result = await res.json();
        if (result.status !== "success") {
          alert("Cập nhật ngày thất bại: " + result.message);
          return;
        }
        updates.push("ngày");
      }

      // Nếu có thay đổi thì cập nhật local state
      if (updates.length > 0) {
        setTransactions((prev) =>
          prev.map((t) =>
            t.id === editingTransaction.id ? editingTransaction : t
          )
        );
        alert("Đã cập nhật " + updates.join(" và ") + " thành công!");
      }

      setShowModal(false);
    } catch (error) {
      console.error("Lỗi khi lưu thay đổi:", error);
      alert("Đã xảy ra lỗi khi cập nhật giao dịch.");
    }
  };
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn này không?")) {
      fetch(`${API_BASE}/transactions/${id}`, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === "success") {
            alert("Đã hủy đơn thành công!");
            setTransactions((prev) => prev.filter((t) => t.id !== id));
          } else {
            alert(data.message || "Không thể hủy đơn.");
          }
        })
        .catch(err => {
          console.error("Lỗi khi hủy:", err);
          alert("Có lỗi xảy ra khi hủy đơn.");
        });
    }

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
