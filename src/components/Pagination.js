import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 0) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <ul className="pagination mb-0">
      <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Trước
        </button>
      </li>

      {pages.map((p) => (
        <li key={p} className={`page-item ${currentPage === p ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(p)}>
            {p}
          </button>
        </li>
      ))}

      <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Sau
        </button>
      </li>
    </ul>
  );
}

export default Pagination;
