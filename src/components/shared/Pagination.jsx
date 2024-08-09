import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            i === currentPage
              ? "bg-custom-dark-blue-1 text-white"
              : "bg-white text-custom-dark-blue-1 border border-custom-dark-blue-1"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center gap-5">
      <div>
        <p className="text-sm text-custom-dark-blue-1">Showing {currentPage} of {totalPages} entries</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 rounded bg-white text-custom-dark-blue-1 border border-custom-dark-blue-1"
        >
          &lt;
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 rounded bg-white text-custom-dark-blue-1 border border-custom-dark-blue-1"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
