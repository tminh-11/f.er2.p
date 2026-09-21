import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
    const categories = ['Tất cả', ...new Set(products.map((product) => product.category.name))];

    return (
        <section>
            <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
                <h2 className="mb-0 me-2">{`Có ${products.length} sản phẩm`}</h2>
                {categories.map((category) => (
                    <Button key={category} variant="outline-primary" size="sm">
                        {category}
                    </Button>
                ))}
            </div>

            <Row xs={1} md={2} lg={4} className="g-4">
                {products.map((product) => (
                    <Col key={product.id}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </section>
    );
};

export default ProductList;
