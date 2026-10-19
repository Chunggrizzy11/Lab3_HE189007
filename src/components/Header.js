import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="border-bottom py-3 mb-4 bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="text-decoration-none text-dark fw-bold fs-4">
          ProductStore
        </Link>
        <nav className="d-flex gap-3">
          <Link to="/" className="fw-medium">
            Home
          </Link>
          <Link to="/products" className="fw-medium">
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
