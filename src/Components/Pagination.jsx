import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const delta = 2;
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    const pages = [1];

    if (left > 2) pages.push("...");

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4  disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft/>
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((num, index) =>
        num === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-2 text-gray-500 select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={num}
            onClick={() => num !== currentPage && onPageChange(num)}
            className={`px-2 py-2 rounded-lg transition-all duration-200 
              ${
                num === currentPage
                  ? "text-purple-600 font-semibold "
                  : " text-gray-800 hover:text-purple-300"
              }`}
          >
            {num}
          </button>
        )
      )}


      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4  disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <ChevronRight/>
      </button>
    </div>
  );
};

export default Pagination;
