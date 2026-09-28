import { useState } from 'react'
import { Badge, Button, Form, Table } from 'react-bootstrap'
import { CITIES, initialStudents } from '../data/students.js'

function StudentManager() {
  const [students, setStudents] = useState(initialStudents)
  const [newName, setNewName] = useState('')
  const [sortBy, setSortBy] = useState('none')

  const canAdd = newName.trim().length >= 3
  const sorted =
    sortBy === 'none'
      ? students
      : [...students].sort((first, second) => {
          if (sortBy === 'name') {
            return first.name.localeCompare(second.name, 'vi')
          }
          return second.score - first.score
        })

  const average = students.length
    ? (
        students.reduce((total, student) => total + student.score, 0) /
        students.length
      ).toFixed(2)
    : '0.00'
  const passed = students.filter((student) => student.score >= 5).length

  const addStudent = (event) => {
    event.preventDefault()
    if (!canAdd) return

    setStudents((previous) => [
      ...previous,
      {
        id: Date.now(),
        name: newName.trim(),
        score: 0,
        contact: { city: CITIES[0] },
      },
    ])
    setNewName('')
  }

  const updateScore = (id, text) => {
    const numericScore = Number(text)
    if (!Number.isFinite(numericScore)) return

    const score = Math.round(Math.min(10, Math.max(0, numericScore)) * 2) / 2
    setStudents((previous) =>
      previous.map((student) =>
        student.id === id ? { ...student, score } : student,
      ),
    )
  }

  const updateCity = (id, city) => {
    setStudents((previous) =>
      previous.map((student) =>
        student.id === id
          ? { ...student, contact: { ...student.contact, city } }
          : student,
      ),
    )
  }

  const removeStudent = (id) => {
    setStudents((previous) => previous.filter((student) => student.id !== id))
  }

  const bonusAll = () => {
    setStudents((previous) =>
      previous.map((student) => ({
        ...student,
        score: Math.min(10, student.score + 0.5),
      })),
    )
  }

  return (
    <main className="student-page">
      <section className="student-shell" aria-labelledby="student-title">
        <div className="student-eyebrow">REACT · IMMUTABLE STATE</div>
        <div className="student-heading-row">
          <div>
            <h2 id="student-title">Quản lý điểm sinh viên</h2>
            <p className="student-intro">
              Theo dõi điểm số và thông tin lớp học.
            </p>
          </div>
          <span className="student-total">{students.length} sinh viên</span>
        </div>

        <div className="student-toolbar">
          <Form className="student-add-form" onSubmit={addStudent}>
            <Form.Control
              aria-label="Họ tên sinh viên mới"
              placeholder="Nhập họ tên (ít nhất 3 ký tự)"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
            />
            <Button type="submit" disabled={!canAdd}>
              Thêm
            </Button>
          </Form>

          <div className="student-actions">
            <Form.Select
              aria-label="Sắp xếp sinh viên"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="none">Thứ tự nhập</option>
              <option value="name">Theo tên A → Z</option>
              <option value="score">Điểm cao → thấp</option>
            </Form.Select>
            <Button
              variant="outline-success"
              onClick={bonusAll}
              disabled={
                students.length === 0 ||
                students.every((student) => student.score >= 10)
              }
            >
              +0.5 cả lớp
            </Button>
          </div>
        </div>

        <div className="student-table-wrap">
          <Table responsive className="student-table" bordered={false}>
            <thead>
              <tr>
                <th scope="col">Họ tên</th>
                <th scope="col">Điểm</th>
                <th scope="col">Thành phố</th>
                <th scope="col">Kết quả</th>
                <th scope="col">
                  <span className="visually-hidden">Thao tác</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.length ? (
                sorted.map((student) => (
                  <tr key={student.id}>
                    <td className="student-name">{student.name}</td>
                    <td>
                      <Form.Control
                        className="student-score"
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        aria-label={`Điểm của ${student.name}`}
                        value={student.score}
                        onChange={(event) =>
                          updateScore(student.id, event.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Form.Select
                        aria-label={`Thành phố của ${student.name}`}
                        value={student.contact.city}
                        onChange={(event) =>
                          updateCity(student.id, event.target.value)
                        }
                      >
                        {CITIES.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </Form.Select>
                    </td>
                    <td>
                      <Badge bg={student.score >= 5 ? 'success' : 'secondary'}>
                        {student.score >= 5 ? 'Đạt' : 'Chưa đạt'}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        aria-label={`Xóa ${student.name}`}
                        onClick={() => removeStudent(student.id)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="student-empty" colSpan={5}>
                    Chưa có sinh viên trong danh sách.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <p className="student-summary" aria-live="polite">
          Sĩ số: {students.length} · Điểm trung bình: {average} · Đạt:{' '}
          {passed}/{students.length}
        </p>
      </section>
    </main>
  )
}

export default StudentManager
