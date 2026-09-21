import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';

const ProductCard = ({ product }) => {
	const {
		name = 'Sản phẩm chưa đặt tên',
		price,
		image,
		rating,
		category,
	} = product;

	const imageSrc = image ?? 'https://placehold.co/300x200?text=No+Image';
	const formattedPrice = price?.toLocaleString('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}) ?? 'Liên hệ';

	return (
		<Card className="h-100">
			<Card.Img variant="top" src={imageSrc} alt={name} />

			<Card.Body>
				<Card.Title>{name}</Card.Title>

				<Badge bg="secondary" className="mb-3">
					{category?.name ?? 'Chưa phân loại'}
				</Badge>

				<Card.Text>
					Giá: {formattedPrice}
					<br />
					Đánh giá: {rating?.rate ?? 'Chưa có'} ({rating?.count ?? 0} lượt)
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default ProductCard;
