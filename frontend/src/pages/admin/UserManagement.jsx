import React, { useState } from "react";
import { users as userData } from "../../data/Books/Users";
import Pagination from "../../components/Pagination/Pagination";

const currentUser = {
  id: 1,
  role: "admin",
  name: "Admin",
};

const UserManagement = () => {
  const [users, setUsers] = useState(userData);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = (user) => {
    setEditingUser({ ...user });
    setShowModal(true);
  };

  const handleStatusChange = (newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === editingUser.id ? { ...u, status: newStatus } : u
      )
    );
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== id));
    setShowModal(false);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h1 className="text-xl font-bold mb-4">Quản lý người dùng</h1>
        <table className="min-w-full table-auto text-left text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Họ và tên</th>
              <th className="p-3">Email</th>
              <th className="p-3">Sđt</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs sm:text-sm ${
                      user.status === "active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {user.status === "active" ? "Hoạt động" : "Bị cấm"}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm"
                  >
                    Quản lý
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          totalItems={users.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        {/* Modal: chỉ thay đổi trạng thái hoặc xóa */}
        {showModal && editingUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md space-y-4 shadow-lg">
              <h2 className="text-xl font-bold mb-2">Tài khoản: {editingUser.name}</h2>
              <p>Email: {editingUser.email}</p>
              <p>Số điện thoại: {editingUser.phone}</p>
              <p>
                Trạng thái hiện tại:{" "}
                <span
                  className={`font-semibold ${
                    editingUser.status === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {editingUser.status === "active" ? "Hoạt động" : "Bị cấm"}
                </span>
              </p>

              <div className="flex flex-col gap-2 pt-2">
                {editingUser.status === "active" ? (
                  <button
                    onClick={() => handleStatusChange("banned")}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Đình chỉ tài khoản
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusChange("active")}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Mở khóa tài khoản
                  </button>
                )}
                <button
                  onClick={() => handleDelete(editingUser.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Xóa tài khoản
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
