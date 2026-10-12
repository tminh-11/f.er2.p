import { Button, Form, Table } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { STUDENTS, STUDENT_CLASSES } from '../data/students.js'

function StudentDirectoryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const classFilter = searchParams.get('class') ?? ''
  const selectedClass = STUDENT_CLASSES.includes(classFilter)
    ? classFilter
    : ''

  function updateParam(key, value, replace = false) {
    setSearchParams(
      (previousParams) => {
        const nextParams = new URLSearchParams(previousParams)
        const shouldKeepValue = value.trim().length > 0

        if (shouldKeepValue) {
          nextParams.set(key, value)
        } else {
          nextParams.delete(key)
        }

        return nextParams
      },
      { replace },
    )
  }

  const normalizedQuery = q.trim().toLocaleLowerCase()
  const students = STUDENTS.filter((student) => {
    const matchesQuery =
      !normalizedQuery ||
      student.name.toLocaleLowerCase().includes(normalizedQuery) ||
      student.id.toLocaleLowerCase().includes(normalizedQuery)
    const matchesClass =
      !selectedClass || student.className === selectedClass

    return matchesQuery && matchesClass
  })

  return (
    <section className="library-page student-directory">
      <p className="eyebrow">FPT UNIVERSITY</p>
      <h1 className="section-title">Danh bạ sinh viên</h1>
      <p className="section-intro">
        Tìm kiếm theo họ tên hoặc MSSV, và lọc theo lớp.
      </p>

      <div className="student-filters">
        <Form.Group controlId="student-search" className="student-search">
          <Form.Label>Tìm theo tên hoặc MSSV</Form.Label>
          <Form.Control
            type="search"
            value={q}
            onChange={(event) => updateParam('q', event.target.value, true)}
            placeholder="Ví dụ: anh hoặc SE18001"
          />
        </Form.Group>
        <Form.Group controlId="student-class" className="student-class-filter">
          <Form.Label>Lớp</Form.Label>
          <Form.Select
            value={selectedClass}
            onChange={(event) => updateParam('class', event.target.value)}
          >
            <option value="">Tất cả lớp</option>
            {STUDENT_CLASSES.map((className) => (
              <option key={className} value={className}>
                {className}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button
          className="secondary-button clear-student-filters"
          onClick={() => setSearchParams({})}
          type="button"
        >
          Xóa lọc
        </Button>
      </div>

      <p className="student-result-count">
        Tìm thấy {students.length}/{STUDENTS.length} sinh viên
      </p>
      <div className="course-table-wrap">
        <Table responsive hover className="course-table align-middle mb-0">
          <thead>
            <tr>
              <th>MSSV</th>
              <th>Họ tên</th>
              <th>Lớp</th>
              <th>GPA</th>
            </tr>
          </thead>
          <tbody>
            {students.length ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.className}</td>
                  <td>{student.gpa.toFixed(1)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="empty-students" colSpan={4}>
                  Không có sinh viên phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </section>
  )
}

export default StudentDirectoryPage
