import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputField from '../components/InputField'
import { useAuth } from '../context/useAuth'
import { useCart } from '../context/useCart'
import { formatVND } from '../utils/format'

const SHIPPING_FEE = 30000
const FREE_SHIPPING_THRESHOLD = 1000000
const PAYMENT_METHODS = [
  { value: 'cod', label: 'Thanh toán khi nhận hàng (COD)' },
  { value: 'bank', label: 'Chuyển khoản' },
  { value: 'wallet', label: 'Ví điện tử' },
]

const initialCheckoutValues = {
  receiver: '',
  phone: '',
  address: '',
  paymentMethod: '',
  note: '',
}

function validateCheckout(values) {
  const errors = {}

  if (values.receiver.trim().length < 3) {
    errors.receiver = 'Người nhận phải có ít nhất 3 ký tự'
  }

  if (!/^0\d{9}$/.test(values.phone.trim())) {
    errors.phone = 'Số điện thoại gồm 10 số, bắt đầu bằng 0'
  }

  if (values.address.trim().length < 10) {
    errors.address = 'Địa chỉ phải có ít nhất 10 ký tự'
  }

  if (!values.paymentMethod) {
    errors.paymentMethod = 'Vui lòng chọn phương thức thanh toán'
  }

  return errors
}

function CheckoutPage({ onNavigate }) {
  const { user } = useAuth()
  const { cart, totalPrice, clearCart } = useCart()
  const [values, setValues] = useState(() => ({
    ...initialCheckoutValues,
    receiver: user?.name ?? '',
  }))
  const [submitted, setSubmitted] = useState(false)
  const [order, setOrder] = useState(null)

  const errors = validateCheckout(values)
  const shippingFee =
    totalPrice >= FREE_SHIPPING_THRESHOLD || totalPrice === 0
      ? 0
      : SHIPPING_FEE
  const grandTotal = totalPrice + shippingFee

  function errorOf(name) {
    return submitted ? errors[name] : undefined
  }

  function handleChange(event) {
    const { name, value } = event.target
    setValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)

    if (Object.keys(errors).length > 0) {
      return
    }

    setOrder({
      id: `DH${String(Date.now()).slice(-6)}`,
      receiver: values.receiver.trim(),
      total: grandTotal,
    })
    clearCart()
  }

  if (order) {
    return (
      <main className="store-page">
        <section className="checkout-success" role="status">
          <h1>Đặt hàng thành công!</h1>
          <p>Mã đơn hàng: <strong>{order.id}</strong></p>
          <p>Người nhận: <strong>{order.receiver}</strong></p>
          <p>Tổng thanh toán: <strong>{formatVND(order.total)}</strong></p>
          <Button
            className="store-primary-button"
            type="button"
            onClick={() => onNavigate('shop')}
          >
            Tiếp tục mua sắm
          </Button>
        </section>
      </main>
    )
  }

  if (cart.items.length === 0) {
    return (
      <main className="store-page">
        <Alert className="store-empty-alert" variant="info">
          Giỏ hàng đang trống
        </Alert>
        <Button
          className="store-primary-button"
          type="button"
          onClick={() => onNavigate('shop')}
        >
          Quay lại cửa hàng
        </Button>
      </main>
    )
  }

  return (
    <main className="store-page">
      <div className="store-page-heading">
        <h1>Thanh toán</h1>
        <p>Nhập thông tin giao hàng để hoàn tất đơn hàng.</p>
      </div>
      <div className="checkout-layout">
        <Form
          className="checkout-form register-panel"
          noValidate
          onSubmit={handleSubmit}
        >
          <h2>Thông tin giao hàng</h2>
          <InputField
            id="checkout-receiver"
            name="receiver"
            label="Người nhận"
            type="text"
            required
            value={values.receiver}
            onChange={handleChange}
            error={errorOf('receiver')}
          />
          <InputField
            id="checkout-phone"
            name="phone"
            label="Số điện thoại"
            type="tel"
            required
            value={values.phone}
            onChange={handleChange}
            error={errorOf('phone')}
          />
          <InputField
            id="checkout-address"
            name="address"
            label="Địa chỉ"
            as="textarea"
            rows={2}
            required
            value={values.address}
            onChange={handleChange}
            error={errorOf('address')}
          />
          <Form.Group className="register-field">
            <Form.Label className="register-label">
              Phương thức thanh toán
            </Form.Label>
            <div className="checkout-payment-options">
              {PAYMENT_METHODS.map(({ value, label }) => (
                <Form.Check
                  key={value}
                  id={`payment-${value}`}
                  type="radio"
                  name="paymentMethod"
                  value={value}
                  label={label}
                  checked={values.paymentMethod === value}
                  onChange={handleChange}
                  isInvalid={Boolean(errorOf('paymentMethod'))}
                />
              ))}
            </div>
            {errorOf('paymentMethod') && (
              <Form.Control.Feedback type="invalid">
                {errorOf('paymentMethod')}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <InputField
            id="checkout-note"
            name="note"
            label="Ghi chú"
            as="textarea"
            rows={2}
            value={values.note}
            onChange={handleChange}
          />
          <Button className="store-primary-button" type="submit">
            Đặt hàng
          </Button>
        </Form>

        <aside className="checkout-order-summary">
          <h2>Tóm tắt đơn hàng</h2>
          <ul>
            {cart.items.map((item) => (
              <li key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <strong>{formatVND(item.price * item.quantity)}</strong>
              </li>
            ))}
          </ul>
          <div className="checkout-summary-line">
            <span>Tiền hàng</span>
            <strong>{formatVND(totalPrice)}</strong>
          </div>
          <div className="checkout-summary-line">
            <span>Phí giao hàng</span>
            <strong>
              {shippingFee === 0 ? 'Miễn phí' : formatVND(shippingFee)}
            </strong>
          </div>
          <div className="checkout-summary-total">
            <span>Tổng thanh toán</span>
            <strong>{formatVND(grandTotal)}</strong>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default CheckoutPage
