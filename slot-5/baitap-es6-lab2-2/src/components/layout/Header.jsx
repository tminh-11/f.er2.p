import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { APP_NAME, menuItems } from '../../data/menu';

const Header = () => (
	<Navbar bg="dark" variant="dark" expand="md">
		<Container>
			<Navbar.Brand href="#home">{APP_NAME}</Navbar.Brand>
			<Navbar.Toggle aria-controls="main-navigation" />
			<Navbar.Collapse id="main-navigation">
				<Nav className="ms-auto">
					{menuItems.map(({ label, href }) => (
						<Nav.Link key={href} href={href}>{label}</Nav.Link>
					))}
				</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar>
);

export default Header;