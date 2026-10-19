import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ProductItem from '../components/ProductItem';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 3;

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('default');

  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const pageNumber = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  // Lọc sản phẩm theo keyword và category (dùng filter() và useMemo)
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchKeyword = keyword
        ? item.name.toLowerCase().includes(keyword.trim().toLowerCase())
        : true;

      const matchCategory =
        category && category !== '' && category.toLowerCase() !== 'all'
          ? item.category.toLowerCase() === category.toLowerCase()
          : true;

      return matchKeyword && matchCategory;
    });
  }, [keyword, category]);

  // Sắp xếp
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Phân trang
  const totalCount = sortedProducts.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE) || 1;
  const currentPage = pageNumber > totalPages ? 1 : pageNumber;

  // Lấy danh sách sản phẩm trang hiện tại bằng slice()
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  // Tìm kiếm -> cập nhật URL và reset trang về 1
  const handleSearch = (newKeyword) => {
    const newParams = new URLSearchParams(searchParams);
    if (newKeyword) {
      newParams.set('keyword', newKeyword);
    } else {
      newParams.delete('keyword');
    }
    newParams.delete('page');
    setSearchParams(newParams);
  };

  // Đổi danh mục -> cập nhật URL và reset trang về 1
  const handleCategoryChange = (newCategory) => {
    const newParams = new URLSearchParams(searchParams);
    if (newCategory) {
      newParams.set('category', newCategory);
    } else {
      newParams.delete('category');
    }
    newParams.delete('page');
    setSearchParams(newParams);
  };

  // Đổi trang -> cập nhật URL, giữ nguyên keyword và category
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
  };

  return (
    <div className="container py-3">
      {/* Hàng 1: Tìm kiếm | Danh mục | Sắp xếp */}
      <div className="row g-2 mb-3">
        <div className="col-md-5">
          <SearchBar keyword={keyword} onSearch={handleSearch} />
        </div>
        <div className="col-md-4">
          <CategoryFilter
            category={category}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sắp xếp: Mặc định</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="name-asc">Tên: A - Z</option>
          </select>
        </div>
      </div>

      {/* Hàng 2: Tổng số + Trang | Nút phân trang */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div className="fw-medium">
          Tổng: {totalCount} | Trang: {currentPage}/{totalPages}
        </div>
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Hàng 3: Bảng danh sách sản phẩm */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: '80px' }}>ID</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th style={{ width: '120px' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  Không có sản phẩm nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
