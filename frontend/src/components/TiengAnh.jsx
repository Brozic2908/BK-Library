import React from "react";

export default function BookTiengAnh() {
  return (
    <main className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="md:col-span-1">
        <img
          src="/images/book3.jpg"
          alt="Làm Chủ Kiến Thức Tiếng Anh 10"
          className="rounded shadow-md w-full"
        />
      </div>

      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">Làm Chủ Kiến Thức Tiếng Anh 10</h1>
        <div className="flex items-center space-x-1 text-yellow-400 text-lg">
          ⭐⭐⭐⭐☆
        </div>
        <ul className="text-sm space-y-1">
          <li>
            <strong>Thể loại:</strong> Học thuật
          </li>
          <li>
            <strong>Tác giả:</strong> TS. Hoàng Văn Tân
          </li>
          <li>
            <strong>Nhà xuất bản:</strong> Giáo Dục
          </li>
          <li>
            <strong>Số trang:</strong> 73 trang
          </li>
          <li>
            <strong>Năm xuất bản:</strong> 2022
          </li>
          <li>
            <strong>Ngôn ngữ:</strong> Tiếng Việt
          </li>
        </ul>
        <p className="text-sm">
          Cuốn sách “Làm Chủ Kiến Thức Tiếng Anh 10 Global Success" được xây
          dựng theo đường hướng giao tiếp, giúp học sinh hình thành và phát
          triển năng lực giao tiếp thông qua rèn luyện bốn kỹ năng nghe, nói,
          đọc, viết và các kiến thức ngôn ngữ bao gồm ngữ âm, từ vựng, ngữ pháp
          theo khung chương trình. Sau khi kết thúc chương trình Tiếng Anh 10,
          học sinh có thể đạt được trình độ Bậc 3-1 theo Khung năng lực ngoại
          ngữ 6 bậc dành cho Việt Nam.
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded">
          Đặt ngay
        </button>
      </div>
    </main>
  );
}
