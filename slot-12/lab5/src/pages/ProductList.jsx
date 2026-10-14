import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import MyProduct from '../components/MyProduct.jsx'
import products from '../data/products.js'

function ProductList() {
  return (
    <section aria-labelledby="product-list-heading">
      <div className="product-list-heading">
        <p className="product-eyebrow">BỘ SƯU TẬP Ô TÔ</p>
        <h1 id="product-list-heading">Khám phá các dòng xe</h1>
        <p className="product-intro">
          Tìm chiếc xe phù hợp cho mọi hành trình của bạn.
        </p>
      </div>
      <Row xs={1} sm={2} lg={3} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <MyProduct product={product} />
          </Col>
        ))}
      </Row>
    </section>
  )
}

export default ProductList
