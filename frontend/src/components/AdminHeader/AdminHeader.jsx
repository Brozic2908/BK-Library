// components/admin/Header.jsx
import { Bell, Menu } from "lucide-react";

export default function AdminHeader({ toggleSidebar, pageTitle }) {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 mr-4 rounded-md bg-primary text-white hover:bg-red-800 focus:outline-none lg:hidden"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl hidden lg:block font-semibold text-gray-800">
            {pageTitle}
          </h1>
        </div>
        <h1 className="text-xl lg:hidden font-semibold text-gray-800">
          {pageTitle}
        </h1>
        <div className="flex items-center space-x-4">
          <button className="relative p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
            <Bell size={20} />
            <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
              A
            </div>
            <span className="ml-2 text-sm font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
