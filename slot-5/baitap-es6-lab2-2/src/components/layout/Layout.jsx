import Container from 'react-bootstrap/Container';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, title = 'Trang chủ' }) => (
	<>
		<Header />
		<Container>
			<h2 className="my-4">{title}</h2>
			{children}
		</Container>
		<Footer />
	</>
);

export default Layout;