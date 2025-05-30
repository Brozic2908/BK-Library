import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import { userService } from "../../services";
import { toast } from "react-toastify";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await userService.getAllUsers();
      if (response?.status === "success" && response?.data?.users) {
        setUsers(response.data.users);
      } else {
        setUsers([]);
        toast.error("Không thể tải danh sách người dùng");
      }
    } catch (err) {
      console.error("Lỗi khi lấy danh sách người dùng: ", err);
      toast.error("Không thể tải danh sách người dùng. Vui lòng thử lại sau.");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser({ ...user });
    setEditedUser({ ...user });
    setShowModal(true);
  };

  const handleStatusChange = async (newStatus) => {
    if (!editingUser) return;

    try {
      setIsProcessing(true);
      const updated = await userService.updateUserInfoByAdmin(
        editingUser.user_id,
        {
          acc_status: newStatus,
          role: editedUser.role,
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.user_id === editingUser.user_id ? updated : u))
      );
      setShowModal(false);
      toast.success(
        `Đã ${
          newStatus === "active" ? "mở khóa" : "đình chỉ"
        } tài khoản thành công`
      );
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      toast.error("Không thể cập nhật trạng thái. Vui lòng thử lại sau.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditUserInfo = async () => {
    if (!editedUser) return;

    try {
      setIsProcessing(true);
      const updated = await userService.updateUserInfoByAdmin(
        editedUser.user_id,
        {
          name: editedUser.name,
          email: editedUser.email,
          gender: editedUser.gender,
          role: editedUser.role,
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.user_id === editedUser.user_id ? updated : u))
      );
      setShowEditForm(false);
      toast.success("Cập nhật thông tin thành công");
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error);
      toast.error("Không thể cập nhật thông tin. Vui lòng thử lại sau.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h1 className="text-xl font-bold mb-4">Quản lý người dùng</h1>

        {users.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Không có người dùng nào
          </div>
        ) : (
          <>
            <table className="min-w-full table-auto text-left text-sm sm:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Họ và tên</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Vai trò</th>
                  <th className="p-3">Trạng thái</th>
                  <th className="p-3">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user) => (
                  <tr key={user.user_id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{user.user_id}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs sm:text-sm ${
                          user.role === "admin"
                            ? "bg-purple-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {user.role === "admin" ? "Admin" : "Thành viên"}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs sm:text-sm ${
                          user.acc_status === "active"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {user.acc_status === "active" ? "Hoạt động" : "Bị cấm"}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm"
                        disabled={isProcessing}
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
          </>
        )}

        {/* Modal */}
        {showModal && editingUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md space-y-4 shadow-lg">
              {!showEditForm ? (
                <>
                  <h2 className="text-xl font-bold mb-2">
                    Tài khoản: {editingUser.name}
                  </h2>
                  <p>Email: {editingUser.email}</p>
                  <p>
                    Vai trò:{" "}
                    {editingUser.role === "admin" ? "Admin" : "Thành viên"}
                  </p>
                  <p>
                    Trạng thái hiện tại:{" "}
                    <span
                      className={`font-semibold ${
                        editingUser.acc_status === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {editingUser.acc_status === "active"
                        ? "Hoạt động"
                        : "Bị cấm"}
                    </span>
                  </p>

                  <div className="flex flex-col gap-2 pt-2">
                    {editingUser.acc_status === "active" ? (
                      <button
                        onClick={() => handleStatusChange("banned")}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 disabled:opacity-50"
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Đang xử lý..." : "Đình chỉ tài khoản"}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange("active")}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Đang xử lý..." : "Mở khóa tài khoản"}
                      </button>
                    )}
                    <button
                      onClick={() => setShowEditForm(true)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                      disabled={isProcessing}
                    >
                      Sửa thông tin
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                      disabled={isProcessing}
                    >
                      Đóng
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold mb-2">
                    Sửa thông tin tài khoản
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Giới tính
                    </label>
                    <select
                      name="gender"
                      value={editedUser.gender}
                      onChange={handleInputChange}
                      className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleEditUserInfo}
                      className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Đang xử lý..." : "Lưu thay đổi"}
                    </button>
                    <button
                      onClick={() => setShowEditForm(false)}
                      className="flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                      disabled={isProcessing}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
