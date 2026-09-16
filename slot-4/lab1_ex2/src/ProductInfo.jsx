import { Card as BsCard, ListGroup } from 'react-bootstrap'

function ProductInfo({ name, price, tags, description }) {
  return (
    <BsCard className="shadow-sm border-0">
      <BsCard.Body>
        <BsCard.Title as="h2" className="h4 mb-3">Thông tin sản phẩm</BsCard.Title>

        <ListGroup variant="flush">
          <ListGroup.Item><strong>Tên sản phẩm:</strong> {name}</ListGroup.Item>
          <ListGroup.Item><strong>Giá:</strong> {price}</ListGroup.Item>
          <ListGroup.Item><strong>Mô tả:</strong> {description}</ListGroup.Item>
          <ListGroup.Item><strong>Tags:</strong> {tags?.join(', ')}</ListGroup.Item>
        </ListGroup>
      </BsCard.Body>
    </BsCard>
  )
}

export default ProductInfo
