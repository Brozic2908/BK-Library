// layouts/AdminLayouts.jsx
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import AdminHeader from "../components/AdminHeader/AdminHeader";
import { Menu, X } from "lucide-react";

const AdminLayouts = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/admin", title: "Trang chủ" },
    { path: "/admin/users", title: "Quản lý người dùng" },
    { path: "/admin/books", title: "Quản lý sách" },
    { path: "/admin/transactions", title: "Quản lý giao dịch" },
  ];

  // Find current page title
  const getCurrentPageTitle = () => {
    const currentItem = menuItems.find(
      (item) => item.path === location.pathname
    );
    return currentItem ? currentItem.title : "Dashboard";
  };

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <AdminNavbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top AdminHeader */}
        <AdminHeader
          toggleSidebar={toggleSidebar}
          pageTitle={getCurrentPageTitle()}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayouts;
