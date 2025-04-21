import React from "react";

export default function Word() {
  return (
    <main className="max-w-6xl mx-auto py-10 px-4 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div className="md:col-span-1">
          <img
            src="/images/book1.jpg"
            alt="Word Ứng Dụng Văn Phòng"
            className="rounded shadow-md w-full"
          />
        </div>

        <div className="md:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold">Word Ứng Dụng Văn Phòng</h1>
          <div className="flex items-center space-x-1 text-yellow-400 text-lg">
            ⭐⭐⭐⭐☆
          </div>
          <ul className="text-sm space-y-1">
            <li>
              <strong>Thể loại:</strong> Tin học
            </li>
            <li>
              <strong>Tác giả:</strong> Trung Tâm Tin Học
            </li>
            <li>
              <strong>Nhà xuất bản:</strong> NA
            </li>
            <li>
              <strong>Số trang:</strong> 180 trang
            </li>
            <li>
              <strong>Năm xuất bản:</strong> 2022
            </li>
            <li>
              <strong>Ngôn ngữ:</strong> Tiếng Việt
            </li>
          </ul>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded">
            Đặt ngay
          </button>
        </div>
      </div>

      <hr className="border-t border-red-300" />

      <section>
        <h2 className="text-xl font-semibold mb-2">Mô tả</h2>
        <p className="text-sm text-justify leading-relaxed">
          Thành thạo tin học văn phòng trong đó giỏi soạn thảo văn bản Word là
          một lợi thế rất lớn khi đi làm. Trong hơn 10 năm triển khai đào tạo
          cho hàng nghìn học viên từ sinh viên đến nhân viên văn phòng các công
          ty tập đoàn, tôi đã đúc kết lại các kiến thức đang được ứng dụng trong
          thực tế để cho ra cuốn sách Word ứng dụng văn phòng từ cơ bản đến nâng
          cao. Đặc biệt cuốn sách sẽ có kèm theo tài liệu bài tập thực hành để
          bạn có thể tự học theo lộ trình của cuốn sách giúp đạt hiệu quả và
          trải nghiệm tốt hơn khi tự học tại nhà. Với khát vọng mong muốn giúp
          cho hàng triệu người Việt Nam có thể dễ dàng tiếp cận các kiến thức
          hữu ích, nâng cao năng lực sử dụng Word của bản thân từ đó giúp cho
          công việc tốt lên và cơ hội phát triển thăng tiến trong sự nghiệp
        </p>
      </section>

      <hr className="border-t border-red-300" />
    </main>
  );
}
