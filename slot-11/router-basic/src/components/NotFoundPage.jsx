import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="not-found-section">
      <Container>
        <p className="eyebrow">404 — KHÔNG TÌM THẤY</p>
        <h1 className="section-title">Trang này chưa tồn tại.</h1>
        <p className="section-intro">
          Có thể đường dẫn không chính xác hoặc trang đã được di chuyển.
        </p>
        <Button as={Link} to="/" className="primary-button">
          ← Về trang chủ
        </Button>
      </Container>
    </section>
  )
}

export default NotFoundPage
