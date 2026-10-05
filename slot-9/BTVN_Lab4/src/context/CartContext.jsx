import { useReducer } from 'react'
import {
  CART_ACTIONS,
  cartReducer,
  getCartTotals,
  initialCart,
} from '../reducers/cartReducer'
import { CartContext } from './contexts'

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart)
  const totals = getCartTotals(cart)

  function addToCart(product) {
    dispatch({
      type: CART_ACTIONS.ADD,
      payload: product,
    })
  }

  function clearCart() {
    dispatch({ type: CART_ACTIONS.CLEAR })
  }

  const value = {
    cart,
    dispatch,
    ...totals,
    addToCart,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
