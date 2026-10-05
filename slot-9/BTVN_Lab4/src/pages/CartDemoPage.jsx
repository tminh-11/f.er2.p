import { useReducer } from 'react'
import Badge from 'react-bootstrap/Badge'
import ProductList from '../components/ProductList'
import CartSummary from '../components/CartSummary'
import { cartDemoProducts } from '../data/cartDemoProducts'
import {
  CART_ACTIONS,
  cartReducer,
  getCartTotals,
  initialCart,
} from '../reducers/cartReducer'

function CartDemoPage() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart)
  const { totalQuantity } = getCartTotals(cart)

  function handleAddToCart(product) {
    dispatch({
      type: CART_ACTIONS.ADD,
      payload: product,
    })
  }

  return (
    <section className="cart-demo-page" aria-labelledby="cart-demo-title">
      <header className="cart-demo-heading">
        <div>
          <h2 id="cart-demo-title">
            Giỏ hàng với useReducer{' '}
            <Badge className="cart-count-badge" bg="primary">
              {totalQuantity}
            </Badge>
          </h2>
          <p>Thêm sản phẩm và quản lý số lượng trong giỏ.</p>
        </div>
      </header>
      <div className="cart-demo-layout">
        <section className="cart-demo-products" aria-labelledby="cart-products-title">
          <h3 id="cart-products-title">Sản phẩm</h3>
          <ProductList
            products={cartDemoProducts}
            onAddToCart={handleAddToCart}
          />
        </section>
        <CartSummary cart={cart} dispatch={dispatch} />
      </div>
    </section>
  )
}

export default CartDemoPage
