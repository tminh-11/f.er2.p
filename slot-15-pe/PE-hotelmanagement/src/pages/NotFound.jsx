import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'

export default function NotFound() {
  return (
    <Container className="text-center py-5">
      <h1 className="display-1 fw-bold">404</h1>
      <p className="lead">The page you are looking for could not be found.</p>
      <Button as={Link} to="/" variant="primary">Back to Home</Button>
    </Container>
  )
}
