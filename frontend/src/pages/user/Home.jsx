import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../../components/BookCard/BookCard";

// image
import homeImg from "../../assets/img/home/home_img.avif";
import react_native_img from "../../assets/img/books/react_native_img.png";
import lam_chu_kien_thuc_tieng_anh_img from "../../assets/img/books/lam_chu_kien_thuc_tieng_anh_img.png";
import blockchain_img from "../../assets/img/books/blockchain_img.png";
import khoa_hoc_tin_phong from "../../assets/img/books/khoa_hoc_tin_phong.png";

const Home = () => {
  const [randomBooks, setRandomBooks] = useState([]);
  const navigate = useNavigate();
  const id = 1; // Giả sử id là 1

  useEffect(() => {
    // Lây thông tin sách theo id
    const foundBook = books.find((b) => b.id === parseInt(id)); 
    setBook(foundBook);

    // Lấy 4 sách ngẫu nhiên (trừ sách đang xem)
    const fetchRandomBooks = async () => {
      try {
        const response = await fetch(`/api/random-books?exclude=${id}`);
        const data = await response.json();
        setRandomBooks(data); 
      } catch (error) {
        console.error("Error fetching random books:", error);
      }
    };

    fetchRandomBooks();
  }, [id]); // chạy lại khi `id` thay đổi

  const goToBookDetail = (bookId) => {
    navigate(`/book-detail/${bookId}`);
  };

  const goToAllBooks = () => {
    navigate("/all-books");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-primary pb-8">
        <div className="md:w-1/2 order-2 md:order-1 mb-6 md:mb-0">
          <h1 className="lg:text-[3rem] text-[2rem] text-center md:text-start font-bold mb-4">
            TÌM SÁCH PHÙ HỢP VỚI PHONG CÁCH CỦA BẠN
          </h1>
          <p className="text-gray-700 text-lg text-center md:text-start">
            Khám phá kho tàng tri thức được sắp xếp tỉ mỉ của chúng tôi, nơi
            khơi dậy cá tính riêng biệt và đáp ứng niềm đam mê học hỏi của bạn
          </p>
        </div>
        <div className="md:w-1/2 flex order-1 md:order-2 justify-end max-h-50 md:max-h-full overflow-hidden items-center">
          <img
            src={homeImg}
            alt="Beautiful library"
            className="rounded-3xl shadow-lg w-[100%] md:w-[75%] object-cover"
          />
        </div>
      </div>

      {/* Random Books Section */}
      <div className="mb-8">
        <h2 className="text-center text-primary font-medium text-lg mb-2">
          KHÁM PHÁ NGAY
        </h2>
        <h3 className="text-center text-3xl font-bold mb-4">SÁCH NGẪU NHIÊN</h3>
        <p className="text-center text-gray-600 mb-8">
          Tham khảo các sách ngẫu nhiên được gợi ý
        </p>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-start">
          {randomBooks.length > 0 &&
            randomBooks.map((book) => (
              <BookCard
                key={book.id}
                className="cursor-pointer"
                title={book.title}
                image={book.image}
                onClick={() => goToBookDetail(book.id)}
              />
            ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/all-books")}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
