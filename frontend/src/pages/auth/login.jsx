import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { authService } from "../../services";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    console.log("Current role:", role);
    console.log("Current token:", token);
    console.log("Current path:", location.pathname);

    if (token && role) {
      if (role === "admin") {
        console.log("Redirecting to admin...");
        navigate("/admin", { replace: true });
      } else {
        console.log("Redirecting to home...");
        navigate("/", { replace: true });
      }
    }
  }, [navigate, location]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await authService.login(email, password);

      // Lưu token và chuyển hướng trang
      if (response?.token && response?.data?.user?.role) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.data?.user?.user_id);
        localStorage.setItem("role", response.data?.user?.role);
        if (response.data?.user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
        toast.success("Đăng nhập thành công!");
      } else {
        toast.error(
          "Đăng nhập thất bại! Tài khoản hoặc mật khẩu bạn chưa chính xác"
        );
      }
    } catch (err) {
      console.warn("Login Fail: ", err);
      toast.error("Đăng nhập thất bại! Kiểm tra lại tài khoản hoặc mật khẩu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div
        className="w-2/5 h-screen bg-cover bg-center text-white relative"
        style={{ backgroundImage: "url('/asset/images/library_bg.png')" }} // bỏ /public
      >
        {/* Container for text */}
        <div className="absolute inset-0 flex flex-col items-center">
          {/* BK LIBRARY - nằm khoảng 1/6 từ trên */}
          <div className="mt-[16.666%] text-center">
            <h1 className="text-4xl font-bold mb-4">BK LIBRARY</h1>
          </div>

          {/* Slogan - nằm khoảng 4/6 từ trên */}
          <div className="mt-[33.333%] text-center">
            <p className="text-2xl font-semibold mb-2">Organize Today,</p>
            <p className="text-2xl font-semibold mb-4">Innovate Tomorrow</p>
            <p className="text-sm opacity-80">
              Where Library Management Meets Innovation
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-3/5 bg-[#f3f5f5] flex flex-col justify-center px-20 relative">
        {/* Trở về & đăng ký */}
        <div className="flex justify-between text-sm mb-6 absolute top-4 left-6 right-6">
          <a href="/" className="text-gray-600 hover:underline">
            ← Trở về Trang chủ
          </a>
          <span>
            Chưa là thành viên?{" "}
            <a href="/signup" className="text-black font-semibold underline">
              THAM GIA NGAY
            </a>
          </span>
        </div>

        {/* Main form */}
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center">
            BK LIBRARY CHÀO MỪNG QUAY LẠI
          </h2>
          <p className="text-center text-gray-600 mb-6">
            ĐĂNG NHẬP ĐỂ TIẾP TỤC
          </p>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="example@hcmut.edu.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md pr-12 focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#960000] hover:bg-red-900 text-white py-3 rounded-md text-sm font-semibold flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Đang đăng nhập...</span>
              ) : (
                <>
                  Tiến hành đến Tài khoản của tôi
                  <span className="ml-2">→</span>
                </>
              )}
            </button>
          </form>

          {/* Quên mật khẩu */}
          <div className="text-center mt-4 text-sm text-gray-600">
            Bạn đang gặp vấn đề với mật khẩu?
          </div>
        </div>

        {/* Footer hỗ trợ */}
        <div className="absolute bottom-8 right-6 text-sm text-gray-400">
          <span className="italic">ⓘ Cần giúp đỡ?</span>
        </div>
        {/* Footer Copyright */}
        <footer className="absolute bottom-8 left-6 text-sm opacity-60 w-2/5">
          Copyright 2025 BK Library Inc. All rights Reserved
        </footer>
      </div>
    </div>
  );
}
