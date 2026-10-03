import { Container, Nav, Navbar } from 'react-bootstrap'

function ExerciseNavbar({ activeExercise, onSelect }) {
  return (
    <Navbar expand="md" className="exercise-navbar" data-bs-theme="dark">
      <Container>
        <Navbar.Brand className="exercise-brand">useReducer · Bài tập</Navbar.Brand>
        <Navbar.Toggle aria-controls="exercise-navigation" />
        <Navbar.Collapse id="exercise-navigation" className="justify-content-end">
          <Nav
            activeKey={activeExercise}
            aria-label="Chọn bài tập"
            className="exercise-nav"
            onSelect={(selectedKey) => onSelect(selectedKey)}
          >
            <Nav.Link as="button" type="button" eventKey="counter">
              Bài 1 · Bộ đếm
            </Nav.Link>
            <Nav.Link as="button" type="button" eventKey="orders">
              Bài 2 · Đơn hàng
            </Nav.Link>
            <Nav.Link as="button" type="button" eventKey="kanban">
              Bài 3 · Kanban
            </Nav.Link>
            <Nav.Link as="button" type="button" eventKey="wizard">
              Bài 4 · Đăng ký
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default ExerciseNavbar