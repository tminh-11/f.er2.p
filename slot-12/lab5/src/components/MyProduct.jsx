import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
})

function MyProduct({ product }) {
  const {
    name,
    description,
    price,
    discount,
    instock,
    rating,
    category,
    image,
  } = product
  const hasDiscount = discount > 0
  const discountedPrice = price * (1 - discount / 100)

  return (
    <Card className="product-card h-100">
      <div className="product-image-wrap">
        <Card.Img
          variant="top"
          src={image}
          alt={name}
          className="product-image"
        />
        {hasDiscount && (
          <Badge bg="danger" className="product-discount">
            -{discount}%
          </Badge>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
          <Badge bg="light" text="dark">
            {category}
          </Badge>
          <span className="product-rating" aria-label={`Đánh giá ${rating} trên 5`}>
            ★ {rating.toFixed(1)}
          </span>
        </div>
        <Card.Title>{name}</Card.Title>
        <Card.Text className="product-description">{description}</Card.Text>
        <div className="product-price mt-auto">
          {hasDiscount ? (
            <>
              <span className="product-original-price">
                {currencyFormatter.format(price)}
              </span>
              <strong>{currencyFormatter.format(discountedPrice)}</strong>
            </>
          ) : (
            <strong>{currencyFormatter.format(price)}</strong>
          )}
        </div>
        <div className="product-stock">
          {instock ? 'Còn hàng' : 'Tạm hết hàng'}
        </div>
        {hasDiscount && instock && (
          <Button variant="primary" className="mt-3">
            Thêm vào giỏ
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default MyProduct
