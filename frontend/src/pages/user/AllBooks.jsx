import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";
import Pagination from "../../components/Pagination/Pagination"; // <-- import component Pagination

export default function AllBooks() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const itemsPerPage = 12;

  // Hàm lấy danh sách sách từ API
  const fetchBooks = async (page) => {
    try {
      const response = await fetch(
        `/api/books?page=${page}&limit=${itemsPerPage}&search=${searchTerm}` // Gửi searchTerm tới backend
      );
      const data = await response.json();
      setBooks(data.books); // Lưu dữ liệu sách vào state
      setTotalBooks(data.total); // Lưu tổng số sách để phân trang
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Lấy sách khi trang đổi hoặc searchTerm thay đổi
  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage, searchTerm]);

  // Lấy sách theo page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBooks = books.slice(startIndex, startIndex + itemsPerPage); // Cắt dữ liệu sách theo trang

  const handleBookClick = (id) => {
    navigate(`/book-detail/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        {searchTerm ? `Kết quả cho "${searchTerm}"` : "Tất cả sách"}
      </h1>

      {currentBooks.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentBooks.map((book) => (
              <div
                key={book.id}
                className="cursor-pointer transform hover:scale-105 hover:shadow-lg transition-all duration-300"
                onClick={() => handleBookClick(book.id)}
              >
                <BookCard title={book.title} image={book.cover} />
              </div>
            ))}
          </div>

          {/* Phân trang */}
          <Pagination
            totalItems={totalBooks}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage} // Cập nhật trang khi chuyển trang
          />
        </>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          Không tìm thấy sách phù hợp 😢
        </div>
      )}
    </div>
  );
}
