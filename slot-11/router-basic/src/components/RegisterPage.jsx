import { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const INITIAL_FORM = {
  name: '',
  email: '',
  session: 'Sáng',
}

function RegisterPage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const name = form.name.trim()
    const email = form.email.trim()

    if (!name) {
      setError('Vui lòng nhập họ tên.')
      return
    }

    if (!email.includes('@')) {
      setError('Vui lòng nhập email hợp lệ có ký tự @.')
      return
    }

    navigate('/success', {
      state: { ...form, name, email },
      replace: true,
    })
  }

  return (
    <section className="form-section">
      <div className="registration-card">
        <p className="eyebrow">FPTU TECH DAY 2026</p>
        <h1 className="section-title">Đăng ký tham dự</h1>
        <p className="section-intro">
          Điền thông tin để nhận vé tham dự sự kiện.
        </p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="attendee-name">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              autoComplete="name"
              name="name"
              onChange={handleChange}
              placeholder="Nhập họ tên"
              value={form.name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="attendee-email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoComplete="email"
              name="email"
              onChange={handleChange}
              placeholder="ban@example.com"
              type="email"
              value={form.email}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="attendee-session">
            <Form.Label>Buổi tham dự</Form.Label>
            <Form.Select
              name="session"
              onChange={handleChange}
              value={form.session}
            >
              <option value="Sáng">Buổi sáng</option>
              <option value="Chiều">Buổi chiều</option>
            </Form.Select>
          </Form.Group>

          <div className="registration-actions">
            <Button
              className="secondary-button"
              onClick={() => navigate(-1)}
              type="button"
            >
              Quay lại
            </Button>
            <Button className="primary-button" type="submit">
              Gửi đăng ký
            </Button>
          </div>
        </Form>
      </div>
    </section>
  )
}

export default RegisterPage
