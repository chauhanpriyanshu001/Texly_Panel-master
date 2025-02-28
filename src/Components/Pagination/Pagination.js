// Pagination.js
import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`pagination-button ${currentPage === number ? 'active' : ''}`}
          onClick={() => onPageChange(number)}
          disabled={currentPage === number}
        >
          {number}
        </button>
      ))}
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
