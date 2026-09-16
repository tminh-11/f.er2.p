import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

function ProductCard({ name, price, tags, avatar, description }) {
  return (
    <Card>
      <Card.Img variant="top" src={avatar} alt={name} />
      <Badge bg="dark" className="position-absolute top-0 start-0 m-2">0{tags.includes('Hot') ? 1 : 2}</Badge>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card.Title className="mb-0">{name}</Card.Title>
          <strong>{price}</strong>
        </div>
        <Card.Text>{description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            {tags.map((tag) => (
              <Badge key={tag} bg="light" text="dark" className="me-2">
                {tag}
              </Badge>
            ))}
          </div>
          <Button variant="dark" size="sm" className="rounded-circle">+</Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
