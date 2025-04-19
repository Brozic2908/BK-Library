import React from "react";

export default function BookDetail() {
  return (
    <main className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="md:col-span-1">
        <img
          src="/images/book4.jpg"
          alt="React Native Notes"
          className="rounded shadow-md w-full"
        />
      </div>

      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">
          React Native Notes for Professionals
        </h1>
        <div className="flex items-center space-x-1 text-yellow-400 text-lg">
          ⭐⭐⭐⭐☆
        </div>
        <ul className="text-sm space-y-1">
          <li>
            <strong>Thể loại:</strong> Học thuật
          </li>
          <li>
            <strong>Tác giả:</strong> GoalKicker.com
          </li>
          <li>
            <strong>Nhà xuất bản:</strong> NA
          </li>
          <li>
            <strong>Số trang:</strong> 810 trang
          </li>
          <li>
            <strong>Năm xuất bản:</strong> NA
          </li>
          <li>
            <strong>Ngôn ngữ:</strong> Tiếng Anh
          </li>
        </ul>

        <section className="pt-4">
          <h2 className="text-xl font-semibold mb-2">Mô tả</h2>
          <p className="text-sm text-justify leading-relaxed">
            React Native Notes for Professionals là một cuốn sách tổng hợp kiến
            thức về React Native, được biên soạn từ các tài liệu trên Stack
            Overflow. Sách cung cấp các khái niệm cơ bản và nâng cao, hướng dẫn
            lập trình ứng dụng di động đa nền tảng bằng JavaScript và React
            Native, bao gồm cả cách sử dụng component, quản lý dữ liệu, điều
            hướng, xử lý API và nhiều chủ đề quan trọng khác dành cho lập trình
            viên.
          </p>
        </section>

        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded">
          Đặt ngay
        </button>
      </div>
    </main>
  );
}
