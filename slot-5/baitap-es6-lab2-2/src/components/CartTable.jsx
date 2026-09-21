import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';

const formatVND = (n) => n.toLocaleString('vi-VN', {
	style: 'currency',
	currency: 'VND',
});

const CartTable = ({ cartItems, products }) => {
	const sortedItems = [...cartItems].sort(
		(a, b) => b.price * b.quantity - a.price * a.quantity,
	);
	const totalPrice = cartItems.reduce(
		(sum, { price, quantity }) => sum + price * quantity,
		0,
	);
	const totalQuantity = cartItems.reduce((sum, { quantity }) => sum + quantity, 0);
	const maxPrice = Math.max(...cartItems.map((item) => item.price));
	const onSale = products.filter(({ inStock, discount }) => inStock && discount > 0);

	return (
		<section>
			<Table striped bordered hover responsive>
				<thead>
					<tr>
						<th>STT</th>
						<th>Tên</th>
						<th>Đơn giá</th>
						<th>Số lượng</th>
						<th>Thành tiền</th>
					</tr>
				</thead>
				<tbody>
					{sortedItems.map(({ id, name, price, quantity }, index) => (
						<tr key={id}>
							<td>{index + 1}</td>
							<td>{name}</td>
							<td>{formatVND(price)}</td>
							<td>{quantity}</td>
							<td>{formatVND(price * quantity)}</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<th colSpan={4}>Tổng tiền</th>
						<th>{formatVND(totalPrice)}</th>
					</tr>
					<tr>
						<th colSpan={4}>Tổng số lượng</th>
						<th>{totalQuantity}</th>
					</tr>
					<tr>
						<th colSpan={4}>Đơn giá cao nhất</th>
						<th>{formatVND(maxPrice)}</th>
					</tr>
				</tfoot>
			</Table>

			<h3 className="mt-4">Sản phẩm đang giảm giá và còn hàng</h3>
			<ListGroup>
				{onSale.map(({ id, name, discount }) => (
					<ListGroup.Item key={id} className="d-flex justify-content-between align-items-center">
						{name}
						<Badge bg="danger">-{discount}%</Badge>
					</ListGroup.Item>
				))}
			</ListGroup>
		</section>
	);
};

export default CartTable;