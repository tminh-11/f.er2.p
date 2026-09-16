import { Badge, Button, Card as BsCard, Stack } from 'react-bootstrap'

function Card({ name, price, tags, avatar, description }) {
  return (
    <BsCard className="product-card h-100 border-0 shadow-sm overflow-hidden">
      <div className="product-image-wrap position-relative">
        <BsCard.Img variant="top" src={avatar} alt={name} className="product-image" />
        <Badge bg="dark" className="product-index position-absolute top-0 start-0 m-3">
          0{tags.includes('Hot') ? 1 : 2}
        </Badge>
      </div>

      <BsCard.Body className="product-content d-flex flex-column">
        <div className="product-heading d-flex justify-content-between align-items-start gap-3 mb-3">
          <BsCard.Title as="h2" className="mb-0">{name}</BsCard.Title>
          <p className="product-price text-dark fw-semibold mb-0">{price}</p>
        </div>

        <BsCard.Text className="product-description text-body-secondary flex-grow-1">
          {description}
        </BsCard.Text>

        <div className="product-meta d-flex justify-content-between align-items-center mt-3">
          <Stack direction="horizontal" gap={2} className="product-tags flex-wrap" aria-label="Tags">
            {tags.map((tag) => (
              <Badge key={tag} bg="light" text="dark" className="tag border">
                {tag}
              </Badge>
            ))}
          </Stack>

          <Button
            variant="dark"
            size="sm"
            className="add-button rounded-circle d-flex align-items-center justify-content-center p-0"
            type="button"
            aria-label={`Thêm ${name} vào giỏ hàng`}
            style={{ width: '42px', height: '42px' }}
          >
            <span aria-hidden="true" className="fs-5">+</span>
          </Button>
        </div>
      </BsCard.Body>
    </BsCard>
  )
}

export default Card
