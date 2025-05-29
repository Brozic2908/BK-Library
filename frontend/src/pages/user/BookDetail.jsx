import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const [randomBooks, setRandomBooks] = useState([]);

  const bookingFormRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Validate id before fetching
    if (!id || isNaN(Number(id))) {
      setError("ID sách không hợp lệ.");
      setBook(null);
      setRandomBooks([]);
      return;
    }
    if (book) {
      console.log(book.title);
      console.log(book.author);
    }
    // Fetch book detail by id
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) {
          throw new Error("Sách không tồn tại.");
        }
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setBook(null);
        setError(err.message);
      }
    };

    // Fetch random books excluding current
    const fetchRandomBooks = async () => {
      try {
        const res = await fetch(`/api/books/random?exclude=${id}`);
        if (!res.ok) throw new Error("Lỗi khi lấy sách ngẫu nhiên.");
        const data = await res.json();
        setRandomBooks(data);
      } catch (err) {
        console.error("Error fetching random books:", err);
        setRandomBooks([]);
      }
    };

    fetchBook();
    fetchRandomBooks();
    // Reset messages & form when id changes
    setShowBookingForm(false);
    setBorrowDate("");
    setReturnDate("");
    setError("");
    setSuccessMessage("");
  }, [id]);

  const handleConfirmBooking = async () => {
    if (!borrowDate || !returnDate) {
      setError("⚠️ Vui lòng chọn đầy đủ ngày mượn và ngày trả sách.");
      return;
    }
    if (new Date(borrowDate) >= new Date(returnDate)) {
      setError("⚠️ Ngày mượn phải trước ngày trả sách.");
      return;
    }
    setError("");

    try {
      // 1. Tạo giao dịch mới
      const createRes = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          member_id: user.id, // đảm bảo bạn có biến user chứa id người dùng
          book_id: id,
          schedule_date: borrowDate,
        }),
      });

      const createData = await createRes.json();
      if (!createRes.ok) {
        throw new Error(
          createData.message || "Lỗi khi tạo giao dịch mượn sách."
        );
      }

      const txId = createData.data.transaction.tx_id;

      // 2. Cập nhật trạng thái sang 'Borrowing'
      const updateRes = await fetch(`/api/transactions/${txId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Borrowing" }),
      });

      const updateData = await updateRes.json();
      if (!updateRes.ok) {
        throw new Error(
          updateData.message || "Lỗi khi cập nhật trạng thái mượn."
        );
      }

      // ✅ Thành công
      setSuccessMessage("✅ Đặt sách thành công!");
      setBook((prev) => ({
        ...prev,
        available_number: prev.available_number - 1,
      }));

      setTimeout(() => {
        setShowBookingForm(false);
        setBorrowDate("");
        setReturnDate("");
        setSuccessMessage("");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
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

  const stopDragging = () => setIsDragging(false);

  const handleDragging = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  if (error && !book) {
    return (
      <div className="text-center py-20 text-xl text-red-600">{error}</div>
    );
  }

  if (!book) {
    return <div className="text-center py-20 text-xl">Đang tải sách...</div>;
  }

  return (
    <div
      className="relative max-w-6xl mx-auto px-4 py-10"
      onMouseMove={handleDragging}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      {/* Main content */}
      <div
        className={showBookingForm ? "relative z-30 pointer-events-none" : ""}
      >
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img
              src={book.image_url || book.cover} // Tùy dữ liệu backend
              alt={book.title}
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>

          <div className="flex-1 mt-6 md:mt-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {book.title}
            </h1>

            <p className="text-gray-600 mb-2 text-sm md:text-base">
              <span className="font-semibold">Tác giả:</span> {book.author}
            </p>
            <p className="text-gray-600 mb-2 text-sm md:text-base">
              <span className="font-semibold">Thể loại:</span>{" "}
              {book.genre || book.category}
            </p>

            <p className="text-gray-600 mb-2 text-sm md:text-base">
              <span className="font-semibold">Số sách có sẵn:</span>{" "}
              {book.available_number > 0 ? (
                book.available_number
              ) : (
                <span className="text-red-600">Hết sách</span>
              )}
            </p>

            <p className="text-gray-600 mb-2 text-sm md:text-base">
              <span className="font-semibold">Nhà xuất bản:</span>{" "}
              {book.publisher || "Không rõ"}
            </p>

            <p className="text-gray-600 mb-2 text-sm md:text-base">
              <span className="font-semibold">Năm xuất bản:</span>{" "}
              {book.publish_year || "Không rõ"}
            </p>

            <hr className="my-8 border-red-300" />

            <h2 className="text-xl md:text-2xl font-semibold mb-3">Mô tả</h2>
            <p className="text-gray-700 leading-relaxed mb-8 text-sm md:text-base">
              {book.description ||
                "Hiện tại chưa có mô tả chi tiết cho sách này."}
            </p>

            {/* Booking Button */}
            <button
              className={`${
                book.available_number <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-red-700"
              } text-white font-semibold py-3 px-6 rounded-md transition duration-300 w-full sm:w-auto text-sm md:text-base`}
              onClick={() => {
                if (book.available_number > 0) {
                  setShowBookingForm(true);
                  setPosition({
                    x: window.innerWidth / 2 - 150,
                    y: window.innerHeight / 2 - 200,
                  });
                }
              }}
              disabled={book.available_number <= 0}
            >
              {book.available_number <= 0 ? "HẾT SÁCH" : "ĐẶT NGAY"}
            </button>
          </div>
        </div>

        <hr className="my-8 border-red-300" />

        {/* Suggested Books */}
        <div className="mt-16">
          <h3 className="text-xl md:text-2xl font-semibold mb-6">
            Gợi ý thêm cho bạn
          </h3>
          {randomBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {randomBooks.map((item) => {
                // Chuẩn hóa dữ liệu ảnh
                const imageSrc =
                  item.image_url || item.cover || item.image || "";
                const bookId = item.book_id || item.id; // ưu tiên book_id nếu có

                return (
                  <div
                    key={bookId}
                    onClick={() => navigate(`/book-detail/${bookId}`)}
                    className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
                  >
                    <BookCard title={item.title} image={imageSrc} />
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Không có sách gợi ý.</p>
          )}
        </div>
      </div>

      {/* Booking Form Popup */}
      {showBookingForm && (
        <div
          ref={bookingFormRef}
          className="fixed z-40 top-0 left-0 bg-white rounded-md shadow-lg p-6 w-72 md:w-96 border border-gray-300"
          style={{
            position: "fixed",
            left: position.x,
            top: position.y,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <div
            className="flex justify-between items-center mb-4 cursor-grab"
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
          >
            <h4 className="text-lg font-semibold">Đặt mượn sách</h4>
            <button
              onClick={() => {
                setShowBookingForm(false);
                setError("");
                setSuccessMessage("");
                setBorrowDate("");
                setReturnDate("");
              }}
              className="text-red-600 font-bold text-xl"
            >
              ×
            </button>
          </div>

          <label className="block mb-2 font-semibold">
            Ngày mượn:
            <input
              type="date"
              value={borrowDate}
              onChange={(e) => setBorrowDate(e.target.value)}
              className="w-full border rounded px-2 py-1 mt-1"
              min={new Date().toISOString().split("T")[0]}
            />
          </label>

          <label className="block mb-2 font-semibold">
            Ngày trả:
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full border rounded px-2 py-1 mt-1"
              min={borrowDate || new Date().toISOString().split("T")[0]}
            />
          </label>

          {error && <p className="text-red-600 mb-2">{error}</p>}
          {successMessage && (
            <p className="text-green-600 mb-2">{successMessage}</p>
          )}

          <button
            onClick={handleConfirmBooking}
            className="bg-primary text-white w-full py-2 rounded hover:bg-red-700 transition"
          >
            Xác nhận đặt mượn
          </button>
        </div>
      )}
    </div>
  );
}
