import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductCard = ({ product }) => {
	const {
		name = 'Sản phẩm chưa đặt tên',
		price,
		image,
		rating,
		category,
		inStock,
		discount = 0,
	} = product;

	const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';
	const finalPrice = price * (1 - discount / 100);
	const formatPrice = (value) => value?.toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}) ?? 'Liên hệ';

	return (
		<Card className={`h-100 position-relative ${inStock ? '' : 'opacity-50'}`}>
			{discount > 0 && (
				<Badge bg="danger" className="position-absolute top-0 end-0 m-2">
					-{discount}%
				</Badge>
			)}

			<Card.Img variant="top" src={imageSrc} alt={name} />

			<Card.Body>
				<Card.Title>{name}</Card.Title>

				<Badge bg="secondary" className="mb-3">
					{category?.name ?? 'Chưa phân loại'}
				</Badge>

				<div className="d-flex gap-2 mb-3">
					{inStock ? <Badge bg="success">Còn hàng</Badge> : <Badge bg="secondary">Hết hàng</Badge>}
					{rating?.rate >= 4.5 && <Badge bg="warning" text="dark">Bán chạy</Badge>}
				</div>

				<Card.Text>
					Giá:{' '}
					{discount > 0 ? (
						<>
							<del>{formatPrice(price)}</del>{' '}
							<strong>{formatPrice(finalPrice)}</strong>
						</>
					) : (
						<strong>{formatPrice(price)}</strong>
					)}
					<br />
					Đánh giá: {rating?.rate ?? 'Chưa có'} ({rating?.count ?? 0} lượt)
				</Card.Text>

				<Button variant="primary" disabled={!inStock}>
					{inStock ? 'Thêm vào giỏ' : 'Không khả dụng'}
				</Button>
			</Card.Body>
		</Card>
	);
};

export default ProductCard;
