// components/BookCard/BookCard.js
import React from "react";

export default function BookCard({ title, image, onClick }) {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <div className="bg-red-200 rounded-lg p-4 h-[250px] w-full flex items-center justify-center mb-2">
        <img src={image} alt={title} className="max-h-full" />
      </div>
      <h4 className="font-medium text-lg line-clamp-2">{title}</h4>
    </div>
  );
}
