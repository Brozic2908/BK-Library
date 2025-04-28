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

  useEffect(() => {
    if (searchTerm) {
      const result = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(result);
    } else {
      setFilteredBooks(books);
    }
  }, [searchTerm]);

  const handleBookClick = (id) => {
    navigate(`/book-detail/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        {searchTerm ? `Kết quả cho "${searchTerm}"` : "Tất cả sách"}
      </h1>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="cursor-pointer transform hover:scale-105 hover:shadow-lg transition-all duration-300"
              onClick={() => handleBookClick(book.id)}
            >
              <BookCard title={book.title} image={book.cover} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          Không tìm thấy sách phù hợp 😢
        </div>
      )}
    </div>
  );
}
