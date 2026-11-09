import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from '../features/cart/cartSlice';

const formatVnd = (amount) => `${amount.toLocaleString('vi-VN')} ₫`;

export default function Cart() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  if (items.length === 0) return <p className="text-muted">Giỏ hàng trống.</p>;

  return (
    <>
      <Table size="sm" bordered hover responsive>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th className="text-center">SL</th>
            <th className="text-end">Thành tiền</th>
            <th aria-label="Thao tác" />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td className="text-center">
                <ButtonGroup size="sm">
                  <Button
                    variant="outline-secondary"
                    aria-label={`Giảm ${item.name}`}
                    onClick={() => dispatch(decreaseQty(item.id))}
                  >
                    -
                  </Button>
                  <Button variant="light" disabled>{item.quantity}</Button>
                  <Button
                    variant="outline-secondary"
                    aria-label={`Tăng ${item.name}`}
                    disabled={item.quantity >= item.stock}
                    onClick={() => dispatch(increaseQty(item.id))}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </td>
              <td className="text-end">{formatVnd(item.price * item.quantity)}</td>
              <td className="text-center">
                <Button
                  size="sm"
                  variant="link"
                  className="text-danger"
                  aria-label={`Xóa ${item.name}`}
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  ✕
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={2}>Tổng cộng</th>
            <th className="text-end text-danger">{formatVnd(total)}</th>
            <th />
          </tr>
        </tfoot>
      </Table>
      <Button variant="outline-danger" size="sm" onClick={() => dispatch(clearCart())}>
        Xóa giỏ hàng
      </Button>
    </>
  );
}
