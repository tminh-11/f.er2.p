import { useEffect, useState } from 'react';
import { Badge, Button, Col, Image, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import carApi from '../api/carApi';
import { getErrorMessage, isCancel } from '../api/axiosClient';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import QuantityPicker from '../components/QuantityPicker';
import NotFoundPage from './NotFoundPage';
import { formatVND, getFinalPrice } from '../utils/format';

/**
 * ================================= CarDetailPage (/cars/:id) =================================
 * ĐÃ CÓ SẴN: kiểm tra id không phải số, useEffect tải xe, document.title, state car/loading/error/quantity,
 *            ảnh + tên <h2>, QuantityPicker, biến outOfStock, khung hàm handleAdd.
 * ===============================================================================================
 */
export default function CarDetailPage() {
  const { id } = useParams();
  if (!/^\d+$/.test(id)) return <NotFoundPage />;
  return <CarDetail key={id} id={id} />;
}

function CarDetail({ id }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        setCar(await carApi.getById(id, controller.signal));
      } catch (err) {
        if (isCancel(err)) return;
        setError(getErrorMessage(err));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    if (car) document.title = `${car.name} | AutoShop Mini`;
  }, [car]);

  if (loading) return <Loading />;
  if (error) {
    return (
      <>
        <ErrorAlert message={error} />
        <Link to="/cars">← Về danh sách xe</Link>
      </>
    );
  }
  if (!car) return null;

  const outOfStock = car.stock === 0;

  const handleAdd = () => {
    addToCart(car, quantity);
    showToast(`Đã thêm ${quantity} "${car.name}" vào giỏ`);
  };

  return (
    <Row className="g-4">
      <Col md={5}>
        <Image src={car.image} alt={car.name} fluid rounded className="border" />
      </Col>
      <Col md={7}>
        <h2 className="fw-bold">{car.name}</h2>
        <div className="d-flex flex-wrap gap-2 align-items-center">
          {car.brand?.name && <Badge bg="info">{car.brand.name}</Badge>}
          <span>Đời {car.year} · {car.fuel}</span>
        </div>

        <div className="my-3">
          <span className="text-danger fw-bold fs-3">{formatVND(getFinalPrice(car))}</span>
        </div>

        <p>{car.description}</p>

        <p>
          Tình trạng:{' '}
          {outOfStock ? (
            <Badge bg="secondary">Hết xe</Badge>
          ) : (
            <Badge bg="success">Còn {car.stock} xe</Badge>
          )}
        </p>

        <div className="d-flex flex-wrap gap-2 align-items-center">
          <QuantityPicker min={1} max={Math.max(1, Math.min(10, car.stock))} onChange={setQuantity} />
          <Button disabled={outOfStock} onClick={handleAdd}>
            Thêm vào giỏ
          </Button>
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
            ← Quay lại
          </Button>
        </div>
      </Col>
    </Row>
  );
}
