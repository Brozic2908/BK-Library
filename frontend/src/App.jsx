import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayouts";
import Home from "./pages/user/Home";
import LoginPage from "./pages/auth/login.jsx";
import RegisterPage from "./pages/auth/register.jsx";

import AdminLayout from "./layouts/AdminLayouts.jsx";
import DashBoard from "./pages/admin/DashBoard.jsx";
import UserManagement from "./pages/admin/UserManagement.jsx";
import BookManagement from "./pages/admin/BookManagement.jsx";
import TransactionManagement from "./pages/admin/TransactionManagement.jsx";

import Profile from "./pages/user/Profile.jsx";
import Myaccount from "./pages/user/My-account.jsx";
import History from "./pages/user/History.jsx";
import Support from "./pages/user/Support.jsx";
import BookDetail from "./pages/user/BookDetail.jsx";
import AllBooks from "./pages/user/AllBooks.jsx";
import NotFound from "./pages/NotFound.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />

        {/* User */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="book-detail/:id" element={<BookDetail />} />
          <Route path="all-books" element={<AllBooks />} />
          <Route path="/my/profile" element={<Profile />} />
          <Route path="/my/account" element={<Myaccount />} />
          <Route path="/my/history" element={<History />} />
          <Route path="/my/support" element={<Support />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashBoard />}></Route>
          <Route path="users" element={<UserManagement />} />
          <Route path="books" element={<BookManagement />} />
          <Route path="transactions" element={<TransactionManagement />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
