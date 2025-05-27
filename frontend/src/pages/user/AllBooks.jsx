import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";
import Pagination from "../../components/Pagination/Pagination";

export default function AllBooks() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  const [books, setBooks] = useState([]); // default to empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const itemsPerPage = 12;

  // Fetch books from API with pagination and search
  const fetchBooks = async (page) => {
    try {
      const response = await fetch(
        `/api/books?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();

      setBooks(data.books || []); // fallback to empty array
      setTotalBooks(data.total || 0); // fallback to 0
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]); // clear on error
      setTotalBooks(0);
    }
  };

  // Reset page to 1 if search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Fetch books when currentPage or searchTerm changes
  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage, searchTerm]);

  const handleBookClick = (id) => {
    navigate(`/book-detail/${id}`);
  };

  const currentBooks = books;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        {searchTerm ? `Kết quả cho "${searchTerm}"` : "Tất cả sách"}
      </h1>

      {currentBooks && currentBooks.length > 0 ? (
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
