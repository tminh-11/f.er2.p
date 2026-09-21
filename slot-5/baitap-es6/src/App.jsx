import WelcomeCard from './components/WelcomeCard';
import StudentCard from './components/StudentCard';
import ProductCard from './components/ProductCard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './App.css'

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

const products = [
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
              {products.map((product) => (
                <Col md={4} key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>

            </div>
  )
}

export default App;
