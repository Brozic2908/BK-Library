import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { books } from "../../data/Books/Books";
import BookCard from "../../components/BookCard/BookCard";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const bookingFormRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const foundBook = books.find((b) => b.id === parseInt(id));
    setBook(foundBook);
  }, [id]);

  const handleConfirmBooking = () => {
    if (!borrowDate || !returnDate) {
      setError("⚠️ Vui lòng chọn đầy đủ ngày mượn và ngày trả sách.");
      return;
    }
    if (new Date(borrowDate) >= new Date(returnDate)) {
      setError("⚠️ Ngày mượn phải trước ngày trả sách.");
      return;
    }
    setError("");
    setSuccessMessage("✅ Đặt sách thành công!");

    setTimeout(() => {
      setShowBookingForm(false);
      setBorrowDate("");
      setReturnDate("");
      setSuccessMessage("");
    }, 2000);
  };

  const startDragging = (e) => {
    if (bookingFormRef.current) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - bookingFormRef.current.getBoundingClientRect().left,
        y: e.clientY - bookingFormRef.current.getBoundingClientRect().top,
      });
    }
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const handleDragging = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  if (!book) {
    return <div className="text-center py-20 text-xl">Sách không tồn tại.</div>;
  }

  return (
    <div
      className="relative max-w-6xl mx-auto px-4 py-10"
      onMouseMove={handleDragging}
      onMouseUp={stopDragging}
    >
      {/* Nội dung chính */}
      <div className={showBookingForm ? "relative z-30 pointer-events-none" : ""}>
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img
              src={book.cover}
              alt={book.title}
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>

          <div className="flex-1 mt-6 md:mt-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{book.title}</h1>

            <p className="text-gray-600 mb-2 text-sm md:text-base">
              <span className="font-semibold">Tác giả:</span> {book.author}
            </p>
            <p className="text-gray-600 mb-2 text-sm md:text-base">
              <span className="font-semibold">Thể loại:</span> {book.category}
            </p>
            <p className="text-gray-600 mb-2 text-sm md:text-base">
              <span className="font-semibold">Nhà xuất bản:</span>{" "}
              {book.publisher || "Không rõ"}
            </p>

            <hr className="my-4 md:my-6" />

            <h2 className="text-xl md:text-2xl font-semibold mb-3">Mô tả</h2>
            <p className="text-gray-700 leading-relaxed mb-8 text-sm md:text-base">
              {book.description || "Hiện tại chưa có mô tả chi tiết cho sách này."}
            </p>

            {/* Đặt ngay Button */}
            <button
              className="bg-primary hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 w-full sm:w-auto text-sm md:text-base"
              onClick={() => {
                setShowBookingForm(true);
                setPosition({
                  x: window.innerWidth / 2 - 150,
                  y: window.innerHeight / 2 - 200,
                });
              }}
            >
              ĐẶT NGAY
            </button>
          </div>
        </div>

        {/* Gợi ý sách */}
        <div className="mt-16">
          <h3 className="text-xl md:text-2xl font-semibold mb-6">Gợi ý thêm cho bạn</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {books
              .filter((b) => b.id !== book.id)
              .slice(0, 4)
              .map((suggestedBook) => (
                <div
                  key={suggestedBook.id}
                  onClick={() => navigate(`/book-detail/${suggestedBook.id}`)}
                  className="cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <BookCard
                    title={suggestedBook.title}
                    image={suggestedBook.cover}
                    onClick={() => navigate(`/book-detail/${suggestedBook.id}`)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Booking Form với Drag */}
      {showBookingForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 md:py-0">
          <div
            ref={bookingFormRef}
            className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md transform scale-90 opacity-0 animate-fadeInUp cursor-move relative"
            onMouseDown={startDragging}
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              position: "absolute",
            }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">Đặt sách</h2>

            {error && (
              <div className="text-red-600 mb-4 text-center text-sm">{error}</div>
            )}
            {successMessage && (
              <div className="text-green-600 mb-4 text-center text-sm">{successMessage}</div>
            )}

            {!successMessage && (
              <>
                <div className="mb-4">
                  <label className="block font-semibold mb-2 text-sm">Ngày mượn:</label>
                  <input
                    type="date"
                    value={borrowDate}
                    onChange={(e) => setBorrowDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:border-primary focus:ring-primary focus:ring-2 transition text-sm"
                  />
                </div>

                <div className="mb-6">
                  <label className="block font-semibold mb-2 text-sm">Ngày trả:</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:border-primary focus:ring-primary focus:ring-2 transition text-sm"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md text-sm"
                    onClick={() => setShowBookingForm(false)}
                  >
                    Hủy
                  </button>
                  <button
                    className="bg-primary hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md text-sm"
                    onClick={handleConfirmBooking}
                  >
                    Xác nhận
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
