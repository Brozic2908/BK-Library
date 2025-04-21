import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayouts";
import Home from "./pages/Home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

import Profile from "./pages/Profile.jsx";
import Myaccount from "./pages/My-account.jsx";
import History from "./pages/History.jsx";
import Support from "./pages/Support.jsx";
import BookDetail from "./pages/BookDetail.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="book-detail/:id" element={<BookDetail />} />
          <Route path="/my/profile" element={<Profile />} />
          <Route path="/my/account" element={<Myaccount />} />
          <Route path="/my/history" element={<History />} />
          <Route path="/my/support" element={<Support />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
