import React from "react";

export default function BookBlockchain() {
  return (
    <main className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="md:col-span-1">
        <img
          src="/images/book2.jpg"
          alt="Blockchain Cơ Bản"
          className="rounded shadow-md w-full"
        />
      </div>

      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">Blockchain Cơ Bản</h1>
        <div className="flex items-center space-x-1 text-yellow-400 text-lg">
          ⭐⭐⭐⭐☆
        </div>
        <ul className="text-sm space-y-1">
          <li>
            <strong>Thể loại:</strong> Học thuật
          </li>
          <li>
            <strong>Tác giả:</strong> Daniel Drescher
          </li>
          <li>
            <strong>Nhà xuất bản:</strong> Dân Trí
          </li>
          <li>
            <strong>Số trang:</strong> 375 trang
          </li>
          <li>
            <strong>Năm xuất bản:</strong> 2023
          </li>
          <li>
            <strong>Ngôn ngữ:</strong> Tiếng Việt
          </li>
        </ul>
        <p className="text-sm">
          CÙNG TÌM HIỂU VỀ BLOCKCHAIN - THỨ ĐÃ, ĐANG VÀ SẼ KHIẾN THẾ GIỚI CÔNG
          NGHỆ THAY ĐỔI HOÀN TOÀN! Blockchain là gì? Tại sao nó xuất hiện? Chúng
          ta có cần hiểu blockchain? Và liệu một người kém công nghệ như tôi có
          thể dễ dàng nắm bắt được nó hay không? Với 25 bước tiếp cận đơn giản,
          không công thức toán học, không ngôn ngữ lập trình, và không yêu cầu
          nền tảng kỹ thuật, Blockchain cơ bản sẽ giải đáp toàn bộ câu hỏi trên
          thông qua lối trình bày dễ hiểu và gần gũi nhất. Bạn sẽ được chỉ lối
          để tiến vào cuộc hành trình tìm kiếm tri thức với những hình ảnh trực
          quan, so sánh tượng trưng và liên hệ thực tế về khái niệm cơ bản, cách
          hoạt động, cũng như ứng dụng của blockchain trong thời đại công nghệ
          số. Tác giả Drescher đã xây dựng cây cầu nối giữa hai khía cạnh thuần
          kỹ thuật và thuần thương mại của blockchain bằng những khái niệm nền
          tảng có thể áp dụng cho nhiều lĩnh vực trong tương lai.
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded">
          Đặt ngay
        </button>
      </div>
    </main>
  );
}
