import { Alert, Card, Container } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { findCourse } from '../data/courses.js'

function CourseDetailPage() {
  const { code } = useParams()
  const course = findCourse(code)

  if (!course) {
    return (
      <section className="content-section">
        <Container>
          <Alert variant="danger" className="course-error">
            Không tìm thấy môn học có mã {code}
          </Alert>
          <Link to="/courses" className="btn btn-outline-success">
            ← Quay lại danh sách
          </Link>
        </Container>
      </section>
    )
  }

  return (
    <section className="content-section">
      <Container>
        <p className="eyebrow">CHI TIẾT MÔN HỌC</p>
        <Card className="course-detail-card">
          <Card.Body>
            <p className="course-detail-code">{course.code}</p>
            <Card.Title className="section-title">{course.name}</Card.Title>
            <div className="course-facts">
              <div>
                <span>Học kỳ</span>
                <strong>{course.semester}</strong>
              </div>
              <div>
                <span>Số tín chỉ</span>
                <strong>{course.credits}</strong>
              </div>
            </div>
            <Card.Text className="course-description">
              {course.desc}
            </Card.Text>
            <Link to="/courses" className="btn btn-outline-success course-back-link">
              ← Quay lại danh sách
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </section>
  )
}

export default CourseDetailPage
