import { useState } from 'react'
import { getFinalPrice } from '../utils/pricing'
import Button from './Button'
import ProductList from './ProductList'

const sorters = {
  default: () => 0,
  priceAsc: (first, second) =>
    getFinalPrice(first) - getFinalPrice(second),
  priceDesc: (first, second) =>
    getFinalPrice(second) - getFinalPrice(first),
  ratingDesc: (first, second) => second.rating - first.rating,
}

function ProductFilter({ products, onAddToCart }) {
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('Tất cả')
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [sortBy, setSortBy] = useState('default')

  const categories = [
    'Tất cả',
    ...new Set(products.map((product) => product.category?.name ?? 'Khác')),
  ]
  const normalizedKeyword = keyword.trim().toLowerCase()
  const visibleProducts = products
    .filter((product) => product.name.toLowerCase().includes(normalizedKeyword))
    .filter(
      (product) =>
        category === 'Tất cả' ||
        (product.category?.name ?? 'Khác') === category,
    )
    .filter((product) => !onlyInStock || product.stock > 0)
    .sort(sorters[sortBy])

  function clearFilters() {
    setKeyword('')
    setCategory('Tất cả')
    setOnlyInStock(false)
    setSortBy('default')
  }

  return (
    <section className="product-filter" aria-labelledby="product-filter-title">
      <div className="product-filter-heading">
        <div>
          <h2 id="product-filter-title">Tìm kiếm sản phẩm</h2>
          <p>
            Tìm thấy {visibleProducts.length}/{products.length} sản phẩm
          </p>
        </div>
        <button
          className="filter-clear-button"
          type="button"
          onClick={clearFilters}
        >
          Xóa lọc
        </button>
      </div>

      <div className="product-filter-controls">
        <label className="product-filter-search">
          <span>Tìm theo tên</span>
          <input
            type="search"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Nhập tên sản phẩm..."
          />
        </label>

        <label className="product-filter-sort">
          <span>Sắp xếp</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="default">Mặc định</option>
            <option value="priceAsc">Giá tăng dần</option>
            <option value="priceDesc">Giá giảm dần</option>
            <option value="ratingDesc">Đánh giá cao</option>
          </select>
        </label>

        <label className="product-stock-switch">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(event) => setOnlyInStock(event.target.checked)}
          />
          <span>Còn hàng</span>
        </label>
      </div>

      <div className="product-category-filters" aria-label="Lọc theo danh mục">
        {categories.map((name) => (
          <Button
            key={name}
            onClick={() => setCategory(name)}
            variant={category === name ? 'primary' : 'outline'}
            aria-pressed={category === name}
          >
            {name}
          </Button>
        ))}
      </div>

      {visibleProducts.length === 0 ? (
        <p className="product-filter-alert" role="alert">
          Không có sản phẩm phù hợp
        </p>
      ) : (
        <ProductList
          products={visibleProducts}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  )
}

export default ProductFilter
