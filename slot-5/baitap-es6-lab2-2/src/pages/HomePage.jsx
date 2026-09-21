import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { AppButton, InputField, ProductList } from '../components';
import { APP_NAME } from '../data/menu';
import { products } from '../data/products';

const formatVND = (value) => value.toLocaleString('vi-VN', {
	style: 'currency',
	currency: 'VND',
});

const HomePage = () => {
	// ES6: filter tạo danh sách sản phẩm đang giảm giá.
	const onSale = products.filter(({ discount }) => discount > 0);
	// ES6: spread tạo bản sao trước khi sort để không đổi mảng gốc.
	const deals = [...onSale].sort((a, b) => b.discount - a.discount).slice(0, 4);
	// ES6: map và Set loại bỏ danh mục trùng nhau.
	const categories = [...new Set(products.map(({ category }) => category.name))];
	// ES6: object shorthand gom các giá trị thống kê.
	const stats = {
		total: products.length,
		inStockCount: products.filter(({ inStock }) => inStock).length,
		avgPrice: Math.round(products.reduce((sum, { price }) => sum + price, 0) / products.length),
	};
	// ES6: destructuring lấy các thuộc tính từ object stats.
	const { total, inStockCount, avgPrice } = stats;
	// ES6: mảng cấu hình được map thành các thẻ thống kê.
	const statCards = [
		{ label: 'Tổng sản phẩm', value: total },
		{ label: 'Còn hàng', value: inStockCount },
		{ label: 'Giá trung bình', value: formatVND(avgPrice) },
	];

	return (
		<div>
			{/* Khối 1: Hero */}
			<Card bg="primary" text="white" className="mb-4">
				<Card.Body>
					<Card.Title as="h1">{`Chào mừng đến ${APP_NAME}`}</Card.Title>
					<Card.Text>{`Hôm nay có ${onSale.length} sản phẩm đang giảm giá`}</Card.Text>
				</Card.Body>
			</Card>

			{/* Khối 2: Thống kê */}
			<Row className="g-3 mb-4">
				{statCards.map(({ label, value }) => (
					<Col md={4} key={label}>
						<Card className="h-100 text-center">
							<Card.Body>
								<Card.Text className="mb-1">{label}</Card.Text>
								<Card.Title>{value}</Card.Title>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>

			{/* Khối 3: Bộ lọc giao diện */}
			<Card className="mb-5">
				<Card.Body>
					<InputGroup>
						<Form.Control placeholder="Tìm sản phẩm..." />
						<Form.Select aria-label="Chọn danh mục">
							<option value="">Tất cả danh mục</option>
							{categories.map((category) => (
								<option key={category} value={category}>{category}</option>
							))}
						</Form.Select>
						<AppButton>Tìm</AppButton>
					</InputGroup>
				</Card.Body>
			</Card>

			{/* Khối 4: Sản phẩm giảm giá */}
			<section className="mb-5">
				<h2>Đang giảm giá</h2>
				<ProductList products={deals} />
			</section>

			{/* Khối 5: Tất cả sản phẩm */}
			<section className="mb-5">
				<h2>Tất cả sản phẩm</h2>
				{products.length === 0 ? (
					<Alert variant="info">Chưa có sản phẩm</Alert>
				) : (
					<ProductList products={products} />
				)}
			</section>

			{/* Khối 6: Nhận tin */}
			<Card className="mb-4">
				<Card.Body>
					<Card.Title>Nhận tin mới nhất</Card.Title>
					<Form onSubmit={(event) => event.preventDefault()}>
						<InputField
							id="newsletterEmail"
							label="Email"
							type="email"
							placeholder="name@example.com"
							required
						/>
						<AppButton type="submit">Đăng ký</AppButton>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
};

export default HomePage;