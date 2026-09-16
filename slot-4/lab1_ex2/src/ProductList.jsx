import { Col, Row } from 'react-bootstrap'
import Card from './Card'

const products = [
  {
    name: 'Essential Cotton Shirt',
    price: '250.000đ',
    tags: ['Hot', 'Cotton'],
    avatar: '/images/shirt.jpg',
    description: 'Phom dáng thoải mái, nhẹ tênh cho những ngày năng động.',
  },
  {
    name: 'Aero Street Sneaker',
    price: '900.000đ',
    tags: ['New', 'Streetwear'],
    avatar: '/images/sneaker.jpg',
    description: 'Đế êm và thiết kế nổi bật, sẵn sàng đồng hành cả ngày dài.',
  },
]

function ProductList() {
  return (
    <Row className="g-4" aria-label="Danh sách sản phẩm">
      {products.map((product) => (
        <Col xs={12} md={6} key={product.name}>
          <Card {...product} />
        </Col>
      ))}
    </Row>
  )
}

export default ProductList
