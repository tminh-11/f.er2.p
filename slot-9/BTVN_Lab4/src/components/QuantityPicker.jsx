import { useState } from 'react'
import Button from './Button'
import ButtonGroup from './ButtonGroup'

function QuantityPicker({ min = 1, max = 10, title = 'Bộ chọn số lượng' }) {
  const [quantity, setQuantity] = useState(min)

  function decrease() {
    setQuantity((currentQuantity) => Math.max(currentQuantity - 1, min))
  }

  function increase() {
    setQuantity((currentQuantity) => Math.min(currentQuantity + 1, max))
  }

  function addThreeWrong() {
    setQuantity(Math.min(quantity + 1, max))
    setQuantity(Math.min(quantity + 1, max))
    setQuantity(Math.min(quantity + 1, max))
  }

  function addThree() {
    setQuantity((currentQuantity) => Math.min(currentQuantity + 1, max))
    setQuantity((currentQuantity) => Math.min(currentQuantity + 1, max))
    setQuantity((currentQuantity) => Math.min(currentQuantity + 1, max))
  }

  return (
    <section className="quantity-picker" aria-label={title}>
      <h2>{title}</h2>
      <ButtonGroup label="Điều chỉnh số lượng">
        <Button
          onClick={decrease}
          disabled={quantity <= min}
          aria-label="Giảm số lượng"
        >
          −
        </Button>
        <output className="quantity-value" aria-live="polite">
          {quantity}
        </output>
        <Button
          onClick={increase}
          disabled={quantity >= max}
          aria-label="Tăng số lượng"
        >
          +
        </Button>
      </ButtonGroup>

      {quantity === max && (
        <p className="quantity-warning" role="status">
          Tối đa {max} sản phẩm
        </p>
      )}

      <ButtonGroup label="Thí nghiệm cập nhật state">
        <Button onClick={addThreeWrong} variant="secondary">
          +3 (sai)
        </Button>
        <Button onClick={addThree} variant="secondary">
          +3 (đúng)
        </Button>
      </ButtonGroup>

      <Button onClick={() => setQuantity(min)} variant="reset">
        Đặt lại
      </Button>
    </section>
  )
}

export default QuantityPicker
