import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { MENU } from '../data/menu.js'

function AppNavbar() {
  return (
    <Navbar expand="lg" className="site-navbar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-name">
          Minh <span>Portfolio</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navigation" />
        <Navbar.Collapse id="main-navigation">
          <Nav className="ms-auto">
            {MENU.map((item) => (
              <Nav.Link
                as={NavLink}
                to={item.to}
                end={item.to === '/'}
                key={item.to}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
