import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import CartSummary from '../components/CartSummary'
import { useCart } from '../context/useCart'

function CartPage({ onNavigate }) {
  const { cart, dispatch } = useCart()

  return (
    <main className="store-page">
      <div className="store-page-heading">
        <h1>Giỏ hàng</h1>
        <p>Kiểm tra sản phẩm trước khi thanh toán.</p>
      </div>
      {cart.items.length === 0 ? (
        <Alert className="store-empty-alert" variant="info">
          Giỏ hàng đang trống
        </Alert>
      ) : (
        <>
          <CartSummary cart={cart} dispatch={dispatch} />
          <div className="store-page-actions">
            <Button
              className="store-primary-button"
              type="button"
              onClick={() => onNavigate('checkout')}
            >
              Tiến hành thanh toán
            </Button>
          </div>
        </>
      )}
    </main>
  )
}

export default CartPage
