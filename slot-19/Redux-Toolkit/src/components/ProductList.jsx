import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button, Card, Col, Form, Row } from 'react-bootstrap';
import {
  selectFilteredProducts,
  selectKeyword,
  setKeyword,
} from '../features/products/productsSlice';
import { addToCart, selectCartItems } from '../features/cart/cartSlice';

const formatVnd = (amount) => `${amount.toLocaleString('vi-VN')} ₫`;

export default function ProductList() {
  const products = useSelector(selectFilteredProducts);
  const keyword = useSelector(selectKeyword);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  return (
    <>
      <Form.Control
        className="mb-3"
        placeholder="Tìm sản phẩm..."
        aria-label="Tìm sản phẩm"
        value={keyword}
        onChange={(event) => dispatch(setKeyword(event.target.value))}
      />
      <Row xs={1} sm={2} className="g-3">
        {products.map((product) => {
          const quantity = cartItems.find((item) => item.id === product.id)?.quantity ?? 0;
          const soldOut = quantity >= product.stock;

          return (
            <Col key={product.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-danger fw-bold">
                    {formatVnd(product.price)}
                  </Card.Text>
                  <small className="text-muted mb-2">Kho: {product.stock}</small>
                  <Button
                    className="mt-auto"
                    disabled={soldOut}
                    onClick={() => dispatch(addToCart(product))}
                  >
                    {soldOut ? 'Đã đạt tối đa' : 'Thêm vào giỏ'}
                    {quantity > 0 && (
                      <Badge bg="light" text="dark" className="ms-2">
                        {quantity}
                      </Badge>
                    )}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
        {products.length === 0 && (
          <Col>
            <p className="text-muted">Không tìm thấy sản phẩm.</p>
          </Col>
        )}
      </Row>
    </>
  );
}
