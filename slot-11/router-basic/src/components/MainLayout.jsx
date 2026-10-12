import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { MENU } from '../data/menu.js'

function MainLayout() {
  const { pathname } = useLocation()
  const previousPages = MENU.filter((item) => item.to !== '/')
  const isPreviousPage = pathname === '/portfolio' || previousPages.some(
    (item) => pathname === item.to || pathname.startsWith(`${item.to}/`),
  )

  return (
    <div className="library-layout">
      <Navbar expand="lg" className="library-navbar" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" className="library-brand">
            Thư viện FPT
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="library-navigation" />
          <Navbar.Collapse id="library-navigation">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>
                Trang chủ
              </Nav.Link>
              <Nav.Link as={NavLink} to="/books">
                Sách
              </Nav.Link>
              <Nav.Link as={NavLink} to="/help">
                Hướng dẫn
              </Nav.Link>
              <NavDropdown
                title="≡"
                id="previous-pages-menu"
                active={isPreviousPage}
                aria-label="Bài trước"
              >
                <NavDropdown.Item as={NavLink} to="/portfolio">
                  Portfolio
                </NavDropdown.Item>
                {previousPages.map((item) => (
                  <NavDropdown.Item
                    as={NavLink}
                    to={item.to}
                    end={item.to === '/'}
                    key={item.to}
                  >
                    {item.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container as="main" className="library-main">
        <Outlet />
      </Container>

      <footer className="library-footer">
        <Container>
          <p className="mb-0">
            © 2026 Thư viện FPT University. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  )
}

export default MainLayout
