import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayouts/MainLayouts';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile.jsx';
import Myaccount from './pages/MyAccount/My-account.jsx';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/my/profile" element={<MainLayout />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="/my/account" element={<MainLayout />}>
          <Route index element={<Myaccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
