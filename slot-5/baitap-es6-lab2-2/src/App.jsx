import WelcomeCard from './components/WelcomeCard';
import StudentCard from './components/StudentCard';
import ProductCard from './components/ProductCard';
import ProductList from './components/ProductList';
import CartTable from './components/CartTable';
import AppButton from './components/AppButton';
import InputField from './components/InputField';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { products } from './data/products';
import { cartItems } from './data/cart';
import './App.css'

const product = products[0];
const saleProducts = products.slice(0, 2);
const newProducts = products.slice(6);
const featured = [...saleProducts, ...newProducts];
const baseStyle = { borderRadius: 12 };
const highlight = { border: '2px solid gold' };

const students = [
  {
    id: 'SV001',
    name: 'Nguyễn Văn An',
    major: 'Software Engineering',
    gpa: 3.6,
    avatar: 'https://i.pravatar.cc/300?img=11',
    contact: {
      email: 'an.nguyen@example.com',
      phone: '0901234567'
    }
  },
  {
    id: 'SV002',
    name: 'Trần Thị Bình',
    major: 'Information Technology',
    gpa: 3.8,
    avatar: 'https://i.pravatar.cc/300?img=32',
    contact: {
      email: 'binh.tran@example.com',
      phone: '0912345678'
    }
  },
  {
    id: 'SV003',
    name: 'Lê Minh Khôi',
    major: 'Computer Science',
    gpa: 3.4,
    avatar: 'https://i.pravatar.cc/300?img=12',
    contact: {
      email: 'khoi.le@example.com',
      phone: '0923456789'
    }
  }
];

const productsBai3 = [
  {
    id: 1,
    name: 'Tai nghe Bluetooth',
    price: 590000,
    image: 'https://picsum.photos/seed/headphone/300/200',
    rating: { rate: 4.5, count: 120 },
    category: { name: 'Âm thanh' },
  },
  {
    id: 2,
    name: 'Chuột không dây',
    price: 0,
    image: 'https://picsum.photos/seed/mouse/300/200',
    rating: { rate: 4.2, count: 86 },
    category: { name: 'Phụ kiện máy tính' },
  },
  {
    id: 3,
    name: 'Bàn phím cơ',
    price: 1290000,
    image: 'https://picsum.photos/seed/keyboard/300/200',
    rating: { rate: 4.8, count: 64 },
    category: { name: 'Phụ kiện máy tính' },
  },
];

function App() {
  return (
        <div className="container my-4">

            {/* BÀI 1 */}
            <h2 className="d-flex flex-wrap justify-content-center gap-4 mb-3">
                Bài 1 - WelcomeCard
            </h2>

            <WelcomeCard />

            <h2 className="mb-3 mt-5">
              Danh sách sinh viên
            </h2>

            <div className="d-flex flex-wrap justify-content-center gap-4">
              {students.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>

            <hr className="my-5" />

            <h2 className="mb-3">
              Bài 3 - ProductCard
            </h2>

            <Row className="g-4">
              {productsBai3.map((product) => (
                <Col md={4} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>

            <hr className="my-5" />

            <h2 className="mb-3">
              Bài 4 - Lưới sản phẩm
            </h2>

            <ProductList products={products} />

            <hr className="my-5" />

            <h2 className="mb-3">Bài 6 - Component dùng lại và spread</h2>

            <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
              <AppButton>Button mặc định</AppButton>
              <AppButton variant="danger" size="sm">Button nhỏ</AppButton>
              <AppButton disabled>Button bị khóa</AppButton>
            </div>

            <Form className="text-start mb-4">
              <InputField
                id="contactEmail"
                label="Email"
                type="email"
                placeholder="name@example.com"
                required
                helpText="Chúng tôi không chia sẻ email của bạn"
              />
            </Form>

            <Card style={{ ...baseStyle, ...highlight }} className="mb-4 text-start">
              <Card.Body>
                <Card.Title>Sản phẩm nổi bật</Card.Title>
                <Card.Text>
                  {product.name} được truyền với discount mới là 30%, còn dữ liệu gốc vẫn là {product.discount}%.
                </Card.Text>
              </Card.Body>
            </Card>

            <div className="mb-4">
              <ProductCard product={{ ...product, discount: 30 }} />
            </div>

            <h3 className="mb-3">Featured ({featured.length} sản phẩm)</h3>
            <ProductList products={featured} />

            <hr className="my-5" />

            <h2 className="mb-3">Bài 7 - Giỏ hàng</h2>
            <CartTable cartItems={cartItems} products={products} />

            </div>
  )
}

export default App;
