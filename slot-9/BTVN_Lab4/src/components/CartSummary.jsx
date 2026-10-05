import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { formatVND } from '../utils/format'
import {
  CART_ACTIONS,
  MAX_QUANTITY,
  getCartTotals,
} from '../reducers/cartReducer'

function CartSummary({ cart, dispatch }) {
  const { totalQuantity, totalPrice } = getCartTotals(cart)

  return (
    <section className="cart-summary" aria-labelledby="cart-summary-title">
      <h2 id="cart-summary-title">
        Giỏ hàng{' '}
        <Badge className="cart-count-badge" bg="primary">
          {totalQuantity}
        </Badge>
      </h2>

      {cart.items.length === 0 ? (
        <Alert className="cart-empty-alert" variant="info">
          Giỏ hàng đang trống
        </Alert>
      ) : (
        <div className="cart-summary-table-wrap">
          <table className="cart-summary-table">
            <thead>
              <tr>
                <th scope="col">Sản phẩm</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Thành tiền</th>
                <th scope="col">
                  <span className="visually-hidden">Thao tác</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(({ id, name, price, quantity }) => (
                <tr key={id}>
                  <th scope="row">{name}</th>
                  <td>{formatVND(price)}</td>
                  <td>
                    <div className="cart-quantity-control">
                      <Button
                        className="cart-quantity-button"
                        type="button"
                        variant="outline-secondary"
                        aria-label={`Giảm ${name}`}
                        onClick={() =>
                          dispatch({
                            type: CART_ACTIONS.DECREASE,
                            payload: id,
                          })
                        }
                      >
                        −
                      </Button>
                      <output className="cart-item-quantity">
                        {quantity}
                      </output>
                      <Button
                        className="cart-quantity-button"
                        type="button"
                        variant="outline-secondary"
                        aria-label={`Tăng ${name}`}
                        disabled={quantity >= MAX_QUANTITY}
                        onClick={() =>
                          dispatch({
                            type: CART_ACTIONS.INCREASE,
                            payload: id,
                          })
                        }
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>{formatVND(price * quantity)}</td>
                  <td>
                    <Button
                      className="cart-remove-button"
                      type="button"
                      variant="outline-danger"
                      aria-label={`Xóa ${name}`}
                      onClick={() =>
                        dispatch({
                          type: CART_ACTIONS.REMOVE,
                          payload: id,
                        })
                      }
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" colSpan="2">
                  Tổng cộng
                </th>
                <td>{totalQuantity}</td>
                <td>{formatVND(totalPrice)}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <div className="cart-summary-footer">
        {cart.items.length > 0 && (
          <p>
            Tổng tiền: <strong>{formatVND(totalPrice)}</strong>
          </p>
        )}
        <Button
          className="cart-clear-button"
          type="button"
          variant="outline-danger"
          disabled={cart.items.length === 0}
          onClick={() => dispatch({ type: CART_ACTIONS.CLEAR })}
        >
          Xóa toàn bộ giỏ
        </Button>
      </div>
    </section>
  )
}

export default CartSummary
