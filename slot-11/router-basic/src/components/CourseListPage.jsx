import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { COURSES } from '../data/courses.js'

function CourseListPage() {
  return (
    <section className="content-section">
      <Container>
        <p className="eyebrow">FPT UNIVERSITY</p>
        <h1 className="section-title">Danh sách môn học</h1>
        <p className="section-intro">
          Chọn mã môn học để xem thông tin chi tiết.
        </p>
        <div className="course-table-wrap">
          <Table responsive hover className="course-table align-middle mb-0">
            <thead>
              <tr>
                <th>Mã môn</th>
                <th>Tên môn học</th>
                <th>Tín chỉ</th>
                <th>Học kỳ</th>
              </tr>
            </thead>
            <tbody>
              {COURSES.map((course) => (
                <tr key={course.code}>
                  <td>
                    <Link
                      className="course-code-link"
                      to={`/courses/${course.code}`}
                    >
                      {course.code}
                    </Link>
                  </td>
                  <td>{course.name}</td>
                  <td>{course.credits}</td>
                  <td>{course.semester}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </section>
  )
}

export default CourseListPage
