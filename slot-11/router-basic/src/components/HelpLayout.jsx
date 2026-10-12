import { Nav } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'

function HelpLayout() {
  return (
    <section className="library-page help-page">
      <p className="eyebrow">HỖ TRỢ BẠN ĐỌC</p>
      <h1 className="section-title">Hướng dẫn</h1>
      <Nav variant="tabs" className="help-tabs">
        <Nav.Link as={NavLink} to="faq">
          Câu hỏi thường gặp
        </Nav.Link>
        <Nav.Link as={NavLink} to="rules">
          Nội quy
        </Nav.Link>
      </Nav>
      <div className="help-content">
        <Outlet />
      </div>
    </section>
  )
}

export default HelpLayout
