import '@fortawesome/fontawesome-free/css/all.min.css'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayouts/MainLayouts';
import Home from './pages/Home/Home';
import LoginPage from './pages/Login/login';
import RegisterPage from './pages/Register/register';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
