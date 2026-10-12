import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ContactPage() {
  return (
    <section className="contact-section">
      <Container>
        <p className="eyebrow">KẾT NỐI</p>
        <h1 className="section-title">Cùng bắt đầu một điều thú vị?</h1>
        <p className="section-intro">
          Mình luôn sẵn sàng trò chuyện về ý tưởng, dự án hoặc cơ hội hợp tác.
          Hãy cùng xem qua những sản phẩm mình đã thực hiện nhé.
        </p>
        <Button as={Link} to="/projects" className="primary-button">
          Khám phá dự án <span aria-hidden="true">→</span>
        </Button>
      </Container>
    </section>
  )
}

export default ContactPage
