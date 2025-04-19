import { Link } from "react-router-dom";
import React from "react";
import BookCard from "./BookCard";

export default function Suggestions() {
  const books = [
    {
      title: "Làm Chủ Kiến Thức Tiếng Anh 10",
      img: "/images/book3.jpg",
      rating: "⭐⭐⭐⭐⭐",
      link: "/tienganh",
    },
    {
      title: "Blockchain Cơ Bản",
      img: "/images/book2.jpg",
      rating: "⭐⭐⭐⭐",
      link: "/blockchain",
    },
    {
      title: "Word Ứng Dụng Văn Phòng",
      img: "/images/book1.jpg",
      rating: "⭐⭐⭐⭐☆",
      link: "/word",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 mt-10">
      <h2 className="text-xl font-semibold mb-4">Gợi ý thêm cho bạn</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {books.map((book, index) => (
          <BookCard key={index} {...book} />
        ))}
      </div>
    </section>
  );
}
