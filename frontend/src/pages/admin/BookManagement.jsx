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
    setEditingBook({ ...book });
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
    <div className="p-4 sm:p-6">
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <h1 className="text-xl font-bold mb-4">Quản lý sách</h1>
        <table className="min-w-full table-auto text-left text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Tiêu đề</th>
              <th className="p-3">Tác giả</th>
              <th className="p-3">Thể loại</th>
              <th className="p-3">Số lượng</th>
              <th className="p-3">Khả dụng</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((book) => (
              <tr key={book.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{book.id}</td>
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">{book.category}</td>
                <td className="p-3">{book.stock}</td>
                <td className="p-3">{book.available}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleEdit(book)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm"
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

        {/* Modal chỉnh sửa sách */}
        {showModal && editingBook && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-2xl w-[90%] max-w-xl space-y-4 shadow-lg overflow-y-auto max-h-[90vh]">
              <h2 className="text-xl font-bold">Chỉnh sửa sách</h2>

              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  value={editingBook.isbn}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, isbn: e.target.value })
                  }
                  className="p-2 border rounded-lg"
                  placeholder="ISBN"
                />
                <input
                  type="text"
                  value={editingBook.title}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, title: e.target.value })
                  }
                  className="p-2 border rounded-lg"
                  placeholder="Tiêu đề"
                />
                <input
                  type="text"
                  value={editingBook.author}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, author: e.target.value })
                  }
                  className="p-2 border rounded-lg"
                  placeholder="Tác giả"
                />
                <input
                  type="text"
                  value={editingBook.category}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, category: e.target.value })
                  }
                  className="p-2 border rounded-lg"
                  placeholder="Thể loại"
                />
                <input
                  type="date"
                  value={editingBook.publishDate}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      publishDate: e.target.value,
                    })
                  }
                  className="p-2 border rounded-lg"
                  placeholder="Ngày phát hành"
                />
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
                  placeholder="Số lượng"
                />
                <input
                  type="number"
                  value={editingBook.available}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      available: parseInt(e.target.value),
                    })
                  }
                  className="p-2 border rounded-lg"
                  placeholder="Khả dụng"
                />
                <input
                  type="text"
                  value={editingBook.image}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, image: e.target.value })
                  }
                  className="p-2 border rounded-lg"
                  placeholder="Link ảnh"
                />
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
                  rows={8}
                />
              </div>

              <div className="flex flex-wrap justify-between gap-2 pt-4">
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
                  Xóa sách
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
