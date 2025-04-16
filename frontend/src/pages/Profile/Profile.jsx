import { Link } from "react-router-dom"
import Header from "../../components/Header/Header";
import avatar from '../../asset/images/avatar.png';

function Profile() {
  const username = "User1";
  const email = "user1@example.com";

  return (
    <div className="bg-gray-100">
      <div className="overflow-y-auto">
        <main className="container max-w-screen-1200 min-h-screen mx-auto px-1 lg:px-0">
          <div className="flex gap-4 pt-6">
            <div className="w-1/4 bg-white hidden lg:block flex flex-col text-gray-800 p-4 shadow-md rounded-lg ">
                <nav>
                    <ul>
                        <li className="mb-4">
                            <Link to="#" className="block py-2 px-4 bg-blue-300 text-white rounded shadow-lg">
                                Trang chủ
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/my/account" className="block py-2 px-4 text-gray-800 rounded hover:bg-gray-300 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200 border-t border-gray-500">
                                Tài khoản của bạn
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/my/order" className="block py-2 px-4 text-gray-800 rounded hover:bg-gray-300 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200">
                                Lịch sử mua hàng
                            </Link>
                        </li>
                        <li className="mb-4">
                            <Link to="/my/support" className="block py-2 px-4 text-gray-800 rounded hover:bg-gray-300 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200">
                                Hỗ trợ
                            </Link>
                        </li>
                        <li>
                            <Link 
                              to="/"
                              className="block py-2 px-4 text-gray-800 rounded hover:bg-red-500 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-200 border-t border-gray-500"
                              onClick={() => {
                                setDropdownOpen(false)
                                setIsLoggedIn(false);
                              }}
                            >
                                Thoát tài khoản
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="w-full lg:w-3/4 rounded-lg space-y-6">
              <div className="flex items-center space-x-6 cursor-pointer">
                  <div className="relative" onclick="openAvatarModal()">
                    <div className="absolute opacity-70 bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-white rounded-b-full flex items-center justify-center text-white text-xs">
                      <div className="opacity-100 text-gray-400">Thay đổi</div>
                    </div>
                    <img src={avatar}  alt="User Avatar" className="w-16 h-16 rounded-full"/>
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold">{username}</div>
                    <div className="text-sm text-gray-700">{email}</div>
                  </div>
              </div>

              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 bg-white p-10 shadow-md rounded-lg">
                  <h3 className="text-sm font-bold my-2">Số sách đang mượn</h3>
                  <p className="text-xl text-gray-600 mb-2">0</p>
                </div>
                <div className="flex-1 bg-white p-10 shadow-md rounded-lg">
                  <h3 className="text-sm font-bold my-2">Số sách đã mượn</h3>
                  <p className="text-xl text-gray-600 mb-2">0</p>
                </div>
                <div className="flex-1 bg-white p-10 shadow-md rounded-lg">
                  <h3 className="text-sm font-bold my-2">Vai trò</h3>
                  <p className="text-xl text-gray-600 mb-2">Menber</p>
                </div>
              </div>

              <p className="bg-gray-200 text-blue-500 text-sm block px-2 py-2 rounder-lg">
                Cập nhật thông tin cá nhân và địa chỉ 
                để có trải nghiệm tốt hơn. 
                <Link to="/my/account" className="underline text-blue-800 ml-1">Cập nhập?</Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Profile