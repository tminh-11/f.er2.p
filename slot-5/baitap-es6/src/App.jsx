import WelcomeCard from './components/WelcomeCard';
import StudentCard from './components/StudentCard';
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
            </div>
  )
}

export default App;
