import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Suggestions from "./components/Suggestions";

import ReactNote from "./components/ReactNote"; // React Native
import Blockchain from "./components/BlockChain";
import TiengAnh from "./components/TiengAnh";
import Word from "./components/Word";

export default function App() {
  return (
    <Router>
      <div className="bg-white text-gray-800 font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<ReactNote />} />
          <Route path="/blockchain" element={<Blockchain />} />
          <Route path="/tienganh" element={<TiengAnh />} />
          <Route path="/word" element={<Word />} />
        </Routes>
        <Suggestions />
        <Footer />
      </div>
    </Router>
  );
}