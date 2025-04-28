import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { books } from "../../data/Books/Books";
import BookCard from "../../components/BookCard/BookCard";

export default function AllBooks() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  const [filteredBooks, setFilteredBooks] = useState(books);
  const [visibleBooks, setVisibleBooks] = useState(12); // số lượng sách đang hiển thị

  useEffect(() => {
    if (searchTerm) {
      const result = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(result);
    } else {
      setFilteredBooks(books);
    }
    setVisibleBooks(12); // reset lại về 12 khi tìm kiếm
  }, [searchTerm]);

  const handleBookClick = (id) => {
    navigate(`/book-detail/${id}`);
  };

  const handleLoadMore = () => {
    setVisibleBooks((prev) => prev + 12);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        {searchTerm ? `Kết quả cho "${searchTerm}"` : "Tất cả sách"}
      </h1>

      {filteredBooks.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.slice(0, visibleBooks).map((book) => (
              <div
                key={book.id}
                className="cursor-pointer transform hover:scale-105 hover:shadow-lg transition-all duration-300"
                onClick={() => handleBookClick(book.id)}
              >
                <BookCard title={book.title} image={book.cover} />
              </div>
            ))}
          </div>

          {visibleBooks < filteredBooks.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition duration-300"
              >
                Xem thêm
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          Không tìm thấy sách phù hợp 😢
        </div>
      )}
    </div>
  );
}
