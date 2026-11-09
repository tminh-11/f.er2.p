import { useState } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import Counter from './components/Counter';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';
import UserList from './components/UserList';
import UserPosts from './components/UserPosts';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CartBadge from './components/CartBadge';
import StudentTable from './components/StudentTable';
import StudentFormModal from './components/StudentFormModal';
import Toolbar from './components/Toolbar';

const EXERCISES = [
  { key: 'counter', label: 'Bài 1 · Counter', title: 'Counter với Redux thuần' },
  { key: 'todos', label: 'Bài 2 · Todo List', title: 'Todo List với Redux thuần' },
  { key: 'users', label: 'Bài 3 · Users', title: 'Danh sách User với Redux Thunk' },
  { key: 'cart', label: 'Bài 4 · Giỏ hàng', title: 'Giỏ hàng với Redux Toolkit' },
  { key: 'students', label: 'Bài 5 · Sinh viên', title: 'Quản lý Sinh viên — Redux Toolkit' },
];

export default function App() {
  const [activeExercise, setActiveExercise] = useState('counter');
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const currentExercise = EXERCISES.find((exercise) => exercise.key === activeExercise);

  const openAddStudent = () => {
    setEditingStudent(null);
    setShowStudentModal(true);
  };

  const openEditStudent = (student) => {
    setEditingStudent(student);
    setShowStudentModal(true);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
        <Container fluid>
          <Navbar.Brand>Redux Exercises</Navbar.Brand>
          <Navbar.Toggle aria-controls="exercise-navbar" />
          <Navbar.Collapse id="exercise-navbar">
            <Nav
              activeKey={activeExercise}
              onSelect={(key) => {
                if (key) setActiveExercise(key);
              }}
              className="me-auto"
            >
              {EXERCISES.map((exercise) => (
                <Nav.Link key={exercise.key} eventKey={exercise.key}>
                  {exercise.label}
                </Nav.Link>
              ))}
            </Nav>
            <span className="text-white">
              <CartBadge />
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4">
        <h2 className="mb-4">{currentExercise.title}</h2>

        {activeExercise === 'counter' && <Counter />}

        {activeExercise === 'todos' && (
          <div className="mx-auto" style={{ maxWidth: 640 }}>
            <TodoForm />
            <FilterBar />
            <TodoList />
          </div>
        )}

        {activeExercise === 'users' && (
          <Row>
            <Col md={4} className="mb-3">
              <UserList />
            </Col>
            <Col md={8}>
              <UserPosts />
            </Col>
          </Row>
        )}

        {activeExercise === 'cart' && (
          <Row>
            <Col lg={7} className="mb-4">
              <ProductList />
            </Col>
            <Col lg={5}>
              <h4>Giỏ hàng</h4>
              <Cart />
            </Col>
          </Row>
        )}

        {activeExercise === 'students' && (
          <>
            <Toolbar onAdd={openAddStudent} />
            <StudentTable onEdit={openEditStudent} />
            {showStudentModal && (
              <StudentFormModal
                key={editingStudent?.id ?? 'new'}
                show
                onHide={() => setShowStudentModal(false)}
                editing={editingStudent}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
}