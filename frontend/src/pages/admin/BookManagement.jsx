import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";

const API_BASE = "http://localhost:3000/api/books"; 

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  
  // Lấy dữ liệu sách từ API
  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_BASE);

      setBooks(response.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy sách:", error);
      alert("Không thể tải danh sách sách. Vui lòng kiểm tra backend.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAdd = () => {
    setEditingBook({
      title: "",
      author: "",
      genre: "",
      publish_year: "",
      stock: 0,
      available_number: 0,
      borrowed_number: 0,
      image_url: "",
      description: "",
    });
    setShowModal(true);
  };

  const handleEdit = async (book) => {
    try {
      const resDetail = await axios.get(`${API_BASE}/${book.book_id}`);
      setEditingBook(resDetail.data);
      setShowModal(true);
    } catch (error) {
      console.error("Lỗi khi tải chi tiết sách:", error);
      alert("Không thể tải thông tin cuốn sách này.");
    }
  };

  const handleSave = async () => {
    try {
      if (editingBook.book_id) {
        await axios.put(`${API_BASE}/${editingBook.book_id}`, {
          title: editingBook.title,
          author: editingBook.author,
          genre: editingBook.genre,
          publish_year: editingBook.publish_year,
          stock: editingBook.stock,
          available_number: editingBook.available_number,
          borrowed_number: editingBook.borrowed_number,
          image_url: editingBook.image_url,
          description: editingBook.description,
        });
        alert("Cập nhật sách thành công.");
      } else {
        await axios.post(API_BASE, {
          title: editingBook.title,
          author: editingBook.author,
          genre: editingBook.genre,
          publish_year: editingBook.publish_year,
          stock: editingBook.stock,
          available_number: editingBook.available_number,
          borrowed_number: editingBook.borrowed_number,
          image_url: editingBook.image_url,
          description: editingBook.description,
        });
        alert("Tạo sách mới thành công.");
      }
      fetchBooks();
      setShowModal(false);
      setEditingBook(null);
    } catch (error) {
      console.error("Lỗi khi lưu sách:", error);
      alert(
        error.response?.data?.message ||
          "Đã có lỗi xảy ra khi lưu thông tin sách."
      );
    }
  };

  const handleDelete = async (book_id) => {
    if (!window.confirm("Bạn có chắc muốn xóa cuốn sách này không?")) return;
    try {
      await axios.delete(`${API_BASE}/${book_id}`);
      alert("Đã xóa sách thành công.");
      fetchBooks();
      setShowModal(false);
      setEditingBook(null);
    } catch (error) {
      console.error("Lỗi khi xóa sách:", error);
      alert(
        error.response?.data?.message ||
          "Đã có lỗi xảy ra khi xóa cuốn sách."
      );
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-4 sm:p-6">
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        {/* Header + nút Thêm */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Quản lý sách</h1>
          <button
            onClick={handleAdd}
            className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Thêm sách
          </button>
        </div>

        {/* Bảng danh sách sách */}
        <table className="min-w-full table-auto text-left text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Tiêu đề</th>
              <th className="p-3">Tác giả</th>
              <th className="p-3">Thể loại</th>
              <th className="p-3">Năm phát hành</th>
              <th className="p-3">Số lượng</th>
              <th className="p-3">Sẵn có</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((book) => (
              <tr key={book.book_id} className="border-t hover:bg-gray-50">
                <td className="p-3">{book.book_id}</td>
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">{book.genre}</td>
                <td className="p-3">{book.publish_year}</td>
                <td className="p-3">{book.stock}</td>
                <td className="p-3">{book.available_number}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => handleDelete(book.book_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan={8} className="p-3 text-center">
                  Không có sách nào để hiển thị.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Component*/}
        <Pagination
          totalItems={books.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        {/* === Modal Thêm / Chỉnh sửa sách === */}
        {showModal && editingBook && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-2xl w-[90%] max-w-xl space-y-4 shadow-lg overflow-y-auto max-h-[90vh]">
              <h2 className="text-xl font-bold">
                {editingBook.book_id ? "Chỉnh sửa sách" : "Thêm sách mới"}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {/* Genre */}
                <input
                  type="text"
                  value={editingBook.genre}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, genre: e.target.value })
                  }
                  className="p-2 border rounded-lg"
                  placeholder="Thể loại"
                />

                {/* Title */}
                <input
                  type="text"
                  value={editingBook.title}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, title: e.target.value })
                  }
                  className="p-2 border rounded-lg"
                  placeholder="Tiêu đề"
                />

                {/* Author */}
                <input
                  type="text"
                  value={editingBook.author}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, author: e.target.value })
                  }
                  className="p-2 border rounded-lg"
                  placeholder="Tác giả"
                />

                {/* Năm phát hành */}
                <input
                  type="number"
                  value={editingBook.publish_year}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      publish_year: parseInt(e.target.value),
                    })
                  }
                  className="p-2 border rounded-lg"
                  placeholder="Năm phát hành"
                />

                {/* Stock */}
                <input
                  type="number"
                  value={editingBook.stock}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      stock: parseInt(e.target.value),
                    })
                  }
                  className="p-2 border rounded-lg"
                  placeholder="Số lượng (stock)"
                />

                {/* Available */}
                <input
                  type="number"
                  value={editingBook.available_number}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      available_number: parseInt(e.target.value),
                    })
                  }
                  className="p-2 border rounded-lg"
                  placeholder="Số lượng khả dụng"
                />

                {/* Borrowed */}
                <input
                  type="number"
                  value={editingBook.borrowed_number}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      borrowed_number: parseInt(e.target.value),
                    })
                  }
                  className="p-2 border rounded-lg"
                  placeholder="Số lượng đã mượn"
                />

                {/* Image URL */}
                <input
                  type="text"
                  value={editingBook.image_url}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      image_url: e.target.value,
                    })
                  }
                  className="p-2 border rounded-lg"
                  placeholder="Link ảnh"
                />

                {/* Description */}
                <textarea
                  value={editingBook.description}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      description: e.target.value,
                    })
                  }
                  className="p-2 border rounded-lg"
                  placeholder="Mô tả"
                  rows={4}
                />
              </div>

              <div className="flex flex-wrap justify-between gap-2 pt-4">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Lưu
                </button>
                {editingBook.book_id && (
                  <button
                    onClick={() => handleDelete(editingBook.book_id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Xóa sách
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingBook(null);
                  }}
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

export default BookManagement;
