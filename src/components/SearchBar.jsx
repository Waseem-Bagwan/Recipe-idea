import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar({ value, onChange, onSubmit, placeholder }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-3 bg-white border border-orange-300 rounded-full px-6 py-3 shadow-md hover:shadow-lg transition"
    >
      <FiSearch className="text-orange-500 text-2xl" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-gray-800 placeholder-gray-500 text-lg outline-none"
      />
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-full transition"
      >
        Search
      </button>
    </form>
  );
}
