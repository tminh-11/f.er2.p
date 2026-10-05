import { useEffect, useState } from 'react'
import ProductFilter from '../components/ProductFilter'
import { shopProducts } from '../data/shopProducts'
import { useCart } from '../context/useCart'

function ShopPage() {
  const { addToCart } = useCart()
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    if (!toastMessage) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setToastMessage(''), 2000)
    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  function handleAddToCart(product) {
    addToCart(product)
    setToastMessage(`Đã thêm ${product.name} vào giỏ`)
  }

  return (
    <main className="store-page">
      <div className="store-page-heading">
        <h1>Cửa hàng</h1>
        <p>Khám phá sản phẩm và thêm vào giỏ hàng.</p>
      </div>
      <ProductFilter
        products={shopProducts}
        onAddToCart={handleAddToCart}
      />
      {toastMessage && (
        <div className="store-toast" role="status" aria-live="polite">
          <span>{toastMessage}</span>
          <button
            type="button"
            aria-label="Đóng thông báo"
            onClick={() => setToastMessage('')}
          >
            ×
          </button>
        </div>
      )}
    </main>
  )
}

export default ShopPage
