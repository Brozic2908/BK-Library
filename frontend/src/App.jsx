import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayouts/MainLayouts";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile.jsx";
import Myaccount from "./pages/MyAccount/My-account.jsx";
import History from "./pages/History/History.jsx";
import Support from "./pages/Support/Support.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="book-detail/:id" element={<BookDetail />} />
        </Route>
        <Route path="/my/profile" element={<MainLayout />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/my/account" element={<MainLayout />}>
          <Route index element={<Myaccount />} />
        </Route>
        <Route path="/my/history" element={<MainLayout />}>
          <Route index element={<History />} />
        </Route>
        <Route path="/my/support" element={<MainLayout />}>
          <Route index element={<Support />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
