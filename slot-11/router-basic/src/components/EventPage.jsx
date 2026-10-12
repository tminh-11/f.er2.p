import { Button, Card, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function EventPage() {
  const navigate = useNavigate()

  return (
    <section className="event-section">
      <Container className="event-container">
        <p className="eyebrow">FPT UNIVERSITY • 2026</p>
        <Card className="event-card">
          <Card.Body>
            <p className="event-date">SỰ KIỆN CÔNG NGHỆ</p>
            <Card.Title as="h1" className="section-title">
              FPTU Tech Day 2026
            </Card.Title>
            <Card.Text className="section-intro">
              Một ngày khám phá công nghệ, gặp gỡ cộng đồng sáng tạo và trải
              nghiệm những ý tưởng mới tại FPT University.
            </Card.Text>
            <Button
              className="primary-button"
              onClick={() => navigate('/register')}
            >
              Đăng ký ngay
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </section>
  )
}

export default EventPage
