import React from "react";
import { useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams(); // Lấy bookId từ URL

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chi tiết sách</h1>
      <p>Book ID: {id}</p>
      {/* Bạn có thể fetch dữ liệu từ id ở đây */}
    </div>
  );
};

export default BookDetail;
