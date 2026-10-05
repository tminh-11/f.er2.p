import { formatVND } from '../utils/format'
import { getFinalPrice } from '../utils/pricing'

function ProductList({ products, onAddToCart }) {
  return (
    <div className="product-list">
      {products.map((product) => {
        const finalPrice = getFinalPrice(product)

        return (
          <article className="product-card" key={product.id}>
            <div className="product-card-heading">
              <span className="product-category">
                {product.category?.name ?? 'Khác'}
              </span>
              <span className="product-rating" aria-label={`Đánh giá ${product.rating} trên 5`}>
                ★ {product.rating}
              </span>
            </div>
            <h3>{product.name}</h3>
            <p className="product-price">{formatVND(finalPrice)}</p>
            {product.discount > 0 && (
              <p className="product-original-price">
                Giá gốc: {formatVND(product.price)}
              </p>
            )}
            <p className={product.stock > 0 ? 'stock-in' : 'stock-out'}>
              {product.stock > 0 ? `Còn hàng (${product.stock})` : 'Hết hàng'}
            </p>
            {onAddToCart && (
              <button
                className="product-add-button"
                type="button"
                disabled={product.stock <= 0}
                onClick={() => onAddToCart(product)}
              >
                Thêm vào giỏ
              </button>
            )}
          </article>
        )
      })}
    </div>
  )
}

export default ProductList
