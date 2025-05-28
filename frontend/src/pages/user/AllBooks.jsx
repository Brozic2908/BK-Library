import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";
import Pagination from "../../components/Pagination/Pagination";

export default function AllBooks() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 12;

  const fetchBooks = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/books/list?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();

      // Normalize data if necessary
      const normalizedBooks = (data.books || []).map((book) => ({
        ...book,
        book_id: book.book_id || book.id, // fallback
        image_url: book.image_url || book.cover || "", // fallback
      }));

      setBooks(normalizedBooks);
      setTotalBooks(data.total || 0);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
      setTotalBooks(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks(currentPage);
    window.scrollTo(0, 0);
  }, [currentPage, searchTerm]);

  const handleBookClick = (bookId) => {
    navigate(`/book-detail/${bookId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        {searchTerm ? `Kết quả cho "${searchTerm}"` : "Tất cả sách"}
      </h1>

      {loading ? (
        <div className="text-center text-gray-500 mt-8">Đang tải dữ liệu...</div>
      ) : books && books.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book.book_id}
                className="cursor-pointer transform hover:scale-105 hover:shadow-lg transition-all duration-300"
                onClick={() => handleBookClick(book.book_id)}
              >
                <BookCard title={book.title} image={book.image_url} />
              </div>
            ))}
          </div>

          <Pagination
            totalItems={totalBooks}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
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
