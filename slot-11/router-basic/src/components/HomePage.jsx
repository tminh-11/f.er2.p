import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <section className="hero-section">
      <Container>
        <p className="eyebrow">XIN CHÀO, MÌNH LÀ MINH</p>
        <h1>
          Mình xây dựng
          <br />
          <span>trải nghiệm web</span>
          <br />
          thật hữu ích.
        </h1>
        <p className="hero-copy">
          Chào mừng bạn đến với portfolio cá nhân của mình. Khám phá kỹ năng,
          những dự án đã thực hiện và đừng ngần ngại liên hệ nhé.
        </p>
        <Button as={Link} to="/projects" className="primary-button">
          Xem dự án của mình <span aria-hidden="true">→</span>
        </Button>
      </Container>
    </section>
  )
}

export default HomePage
