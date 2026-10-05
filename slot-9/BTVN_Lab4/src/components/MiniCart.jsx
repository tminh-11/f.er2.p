import { useState } from 'react'
import { cartItems } from '../data/cart'
import { formatVND } from '../utils/format'
import Button from './Button'
import ButtonGroup from './ButtonGroup'

const MIN_QUANTITY = 1
const MAX_QUANTITY = 10

function MiniCart() {
  const [items, setItems] = useState(cartItems)

  function changeQuantity(id, delta) {
    setItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                MAX_QUANTITY,
                Math.max(MIN_QUANTITY, item.quantity + delta),
              ),
            }
          : item,
      ),
    )
  }

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <section className="mini-cart" aria-labelledby="mini-cart-title">
      <h2 id="mini-cart-title">Giỏ hàng mini</h2>
      <div className="mini-cart-table-wrap">
        <table className="mini-cart-table">
          <thead>
            <tr>
              <th scope="col">Sản phẩm</th>
              <th scope="col">Đơn giá</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ id, name, price, quantity }) => (
              <tr key={id}>
                <th scope="row">{name}</th>
                <td>{formatVND(price)}</td>
                <td>
                  <ButtonGroup
                    label={`Số lượng ${name}`}
                    size="sm"
                  >
                    <Button
                      onClick={() => changeQuantity(id, -1)}
                      disabled={quantity <= MIN_QUANTITY}
                      aria-label={`Giảm ${name}`}
                      variant="secondary"
                    >
                      −
                    </Button>
                    <output className="mini-cart-quantity" aria-live="polite">
                      {quantity}
                    </output>
                    <Button
                      onClick={() => changeQuantity(id, 1)}
                      disabled={quantity >= MAX_QUANTITY}
                      aria-label={`Tăng ${name}`}
                      variant="secondary"
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </td>
                <td>{formatVND(price * quantity)}</td>
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
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}

export default MiniCart
