// Pagination.js
import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      <button className="button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
      <span className="button-content">{"<<"}</span>
      </button>
      <select value={currentPage} onChange={(e) => onPageChange(parseInt(e.target.value))}>
        {pages.map((page) => (
          <option key={page} value={page}>
            {page}
          </option>
        ))}
      </select>
      <button className="button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
      <span className="button-content">{">>"}</span>
      </button>
    </div>
  );
}

export default Pagination;
