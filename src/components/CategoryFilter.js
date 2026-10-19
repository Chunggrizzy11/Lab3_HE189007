import React from 'react';

function CategoryFilter({ category = '', onCategoryChange }) {
  const categories = [
    'Điện thoại',
    'Laptop',
    'Máy tính bảng',
    'Phụ kiện'
  ];

  return (
    <select
      className="form-select"
      value={category}
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      <option value="">Tất cả danh mục</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
