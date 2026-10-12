import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function LibraryHomePage() {
  return (
    <section className="library-page library-home">
      <p className="eyebrow">FPT UNIVERSITY</p>
      <h1 className="section-title">Chào mừng đến với thư viện</h1>
      <p className="section-intro">
        Khám phá sách, tài liệu và các hướng dẫn dành cho bạn đọc Thư viện FPT
        University.
      </p>
      <Button as={Link} to="/books" className="primary-button">
        Khám phá sách <span aria-hidden="true">→</span>
      </Button>
    </section>
  )
}

export default LibraryHomePage
