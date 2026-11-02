import { Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatVND, getFinalPrice } from '../utils/format';

/**
 * ============================== CarCard ============================================
 * Props: car = { id, name, image, price, discount, stock, year, fuel, brand? }, onAddToCart
 * Hiển thị thông tin, giá và tình trạng xe; cho phép thêm xe còn hàng vào giỏ.
 * ====================================================================================
 */
export default function CarCard({ car, onAddToCart }) {
  const { id, name, image, price, discount, stock, year, fuel, brand } = car;
  const outOfStock = stock === 0;

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={image} alt={name} style={{ height: '180px', objectFit: 'contain', padding: '12px' }}/>
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h6">
          <Link to={`/cars/${id}`}>{name}</Link>
        </Card.Title>

        <div className="mb-2 d-flex flex-wrap gap-2 align-items-center">
          {brand && <Badge bg="info">{brand.name}</Badge>}
          <small className="text-muted">Đời {year} · {fuel}</small>
          {outOfStock && <Badge bg="secondary">Hết xe</Badge>}
        </div>

        <div className="mt-auto">
          <span className="text-danger fw-bold">{formatVND(getFinalPrice(car))}</span>
          {discount > 0 && (
            <div className="small">
              <span className="text-muted text-decoration-line-through">{formatVND(price)}</span>
              <Badge bg="danger" className="ms-2">-{discount}%</Badge>
            </div>
          )}

          <Button className="w-100 mt-2" disabled={outOfStock} onClick={() => onAddToCart?.(car)}>
            {outOfStock ? 'Hết xe' : 'Thêm vào giỏ'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
