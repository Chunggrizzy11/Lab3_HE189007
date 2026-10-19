import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container text-center py-5">
      <div className="card p-5 border shadow-sm mx-auto" style={{ maxWidth: '800px' }}>
        <h1 className="fw-bold mb-3">Welcome to ProductStore</h1>
        <p className="text-muted fs-5 mb-4">
          Manage and explore products for your needs.
        </p>
        <div>
          <Link to="/products" className="px-4 py-2">
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
