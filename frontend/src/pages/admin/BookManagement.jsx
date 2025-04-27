import React, { useState } from "react";
import { books as bookData } from "../../data/Books/Books";
import Pagination from "../../components/Pagination/Pagination";

const BookManagement = () => {
  const [books, setBooks] = useState(bookData);
  const [editingBook, setEditingBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(books.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = books.slice(indexOfFirstItem, indexOfLastItem);

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowModal(true);
  };

  const handleSave = () => {
    setBooks((prevBooks) =>
      prevBooks.map((b) => (b.id === editingBook.id ? editingBook : b))
    );
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setBooks((prevBooks) => prevBooks.filter((b) => b.id !== id));
    setShowModal(false);
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý sách</h1>
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-6">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Tiêu đề</th>
              <th className="p-3">Tác giả</th>
              <th className="p-3">Danh mục</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((book) => (
              <tr key={book.id} className="border-t">
                <td className="p-3">{book.id}</td>
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">{book.category}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(book)}
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
          totalItems={books.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        {/* Modal */}
        {showModal && editingBook && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900/30 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-2xl w-96 space-y-4 shadow-lg">
              <h2 className="text-xl font-bold">Chỉnh sửa sách</h2>
              <input
                type="text"
                value={editingBook.title}
                onChange={(e) =>
                  setEditingBook({ ...editingBook, title: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="Tiêu đề"
              />
              <input
                type="text"
                value={editingBook.author}
                onChange={(e) =>
                  setEditingBook({ ...editingBook, author: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="Tác giả"
              />
              <input
                type="text"
                value={editingBook.category}
                onChange={(e) =>
                  setEditingBook({ ...editingBook, category: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="Danh mục"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Lưu
                </button>
                <button
                  onClick={() => handleDelete(editingBook.id)}
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

export default BookManagement;
