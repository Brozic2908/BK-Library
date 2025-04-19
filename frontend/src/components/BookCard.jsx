import React from "react";
import { Link } from "react-router-dom";

export default function BookCard({ title, img, rating, link }) {
  return (
    <Link to={link} className="block hover:scale-105 transition-all">
      <div className="bg-white shadow-md rounded p-2">
        <img src={img} alt={title} className="rounded w-full h-48 object-cover" />
        <div className="mt-2 text-center">
          <p className="font-semibold text-sm">{title}</p>
          <div className="text-yellow-500 text-sm">{rating}</div>
        </div>
      </div>
    </Link>
  );
}
