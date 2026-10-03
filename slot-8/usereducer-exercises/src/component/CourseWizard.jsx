import { useReducer } from 'react'
import { Alert, Button, Card, Container, Form, ListGroup, Nav } from 'react-bootstrap'
import {  COURSES,  initWizard,  SCHEDULES,  STEPS,  wizardReducer,} from '../data/wizardReducer'

const formatVND = (amount) =>
  amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })

function CourseWizard({ initialCourseId = 'react' }) {
  const [state, dispatch] = useReducer(wizardReducer, initialCourseId, initWizard)
  const { step, maxVisited, values, errors, submitted } = state
  const course = COURSES.find((item) => item.id === values.courseId)

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    dispatch({
      type: 'CHANGE',
      payload: { name, value: type === 'checkbox' ? checked : value },
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    dispatch({ type: step === STEPS.length - 1 ? 'SUBMIT' : 'NEXT' })
  }

  function field(name, label, type = 'text') {
    return (
      <Form.Group className="wizard-field" controlId={`course-${name}`}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          autoComplete={name === 'fullName' ? 'name' : name === 'email' ? 'email' : 'tel'}
          isInvalid={Boolean(errors[name])}
          name={name}
          onChange={handleChange}
          type={type}
          value={values[name]}
        />
        <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
      </Form.Group>
    )
  }

  if (submitted) {
    return (
      <main className="wizard-page">
        <Container className="wizard-layout">
          <Alert className="wizard-success" variant="success" role="status">
            <p className="wizard-eyebrow">Đăng ký hoàn tất</p>
            <Alert.Heading>Chào mừng bạn, {values.fullName}!</Alert.Heading>
            <p>
              Bạn đã đăng ký {course?.name} với lịch học {values.schedule}. Học phí:{' '}
              {course ? formatVND(course.fee) : ''}.
            </p>
            <Button
              onClick={() => dispatch({ type: 'RESET', payload: initialCourseId })}
              type="button"
              variant="success"
            >
              Đăng ký khóa khác
            </Button>
          </Alert>
        </Container>
      </main>
    )
  }

  return (
    <main className="wizard-page">
      <Container className="wizard-layout">
        <Card className="wizard-panel">
          <Card.Body>
            <header className="wizard-heading">
              <div>
                <p className="wizard-eyebrow">Bài tập useReducer · 04</p>
                <h1>Đăng ký khóa học</h1>
              </div>
              <span className="wizard-step-count">Bước {step + 1} / {STEPS.length}</span>
            </header>

            <Nav className="wizard-steps" variant="pills" aria-label="Các bước đăng ký">
              {STEPS.map((label, index) => (
                <Nav.Item key={label}>
                  <Nav.Link
                    active={step === index}
                    as="button"
                    disabled={index > maxVisited}
                    onClick={() => dispatch({ type: 'GO_TO', payload: index })}
                    type="button"
                  >
                    <span className="wizard-step-number">{index + 1}</span>
                    {label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            <Form className="wizard-form" noValidate onSubmit={handleSubmit}>
              {step === 0 && (
                <section aria-labelledby="wizard-step-title">
                  <div className="wizard-section-heading">
                    <span>01</span>
                    <h2 id="wizard-step-title">Thông tin học viên</h2>
                  </div>
                  {field('fullName', 'Họ và tên')}
                  {field('email', 'Email', 'email')}
                  {field('phone', 'Số điện thoại', 'tel')}
                </section>
              )}

              {step === 1 && (
                <section aria-labelledby="wizard-step-title">
                  <div className="wizard-section-heading">
                    <span>02</span>
                    <h2 id="wizard-step-title">Chọn khóa học và lịch học</h2>
                  </div>
                  <Form.Group className="wizard-field" controlId="course-courseId">
                    <Form.Label>Khóa học</Form.Label>
                    <Form.Select
                      isInvalid={Boolean(errors.courseId)}
                      name="courseId"
                      onChange={handleChange}
                      value={values.courseId}
                    >
                      <option value="">Chọn khóa học</option>
                      {COURSES.map(({ id, name, fee }) => (
                        <option key={id} value={id}>
                          {name} · {formatVND(fee)}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.courseId}</Form.Control.Feedback>
                  </Form.Group>

                  <fieldset className="wizard-schedules">
                    <legend>Lịch học</legend>
                    {SCHEDULES.map((schedule, index) => (
                      <Form.Check
                        checked={values.schedule === schedule}
                        id={`schedule-${index}`}
                        isInvalid={Boolean(errors.schedule)}
                        key={schedule}
                        label={schedule}
                        name="schedule"
                        onChange={handleChange}
                        type="radio"
                        value={schedule}
                      />
                    ))}
                    {errors.schedule && <p className="wizard-error">{errors.schedule}</p>}
                  </fieldset>
                </section>
              )}

              {step === 2 && (
                <section aria-labelledby="wizard-step-title">
                  <div className="wizard-section-heading">
                    <span>03</span>
                    <h2 id="wizard-step-title">Kiểm tra thông tin đăng ký</h2>
                  </div>
                  <ListGroup className="wizard-summary">
                    <ListGroup.Item>
                      <span>Học viên</span>
                      <strong>{values.fullName}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span>Email</span>
                      <strong>{values.email}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span>Số điện thoại</span>
                      <strong>{values.phone}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span>Khóa học</span>
                      <strong>{course?.name}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span>Lịch học</span>
                      <strong>{values.schedule}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="wizard-fee">
                      <span>Học phí</span>
                      <strong>{course ? formatVND(course.fee) : ''}</strong>
                    </ListGroup.Item>
                  </ListGroup>

                  <Form.Check
                    checked={values.agree}
                    className="wizard-confirmation"
                    id="course-agree"
                    isInvalid={Boolean(errors.agree)}
                    label="Tôi xác nhận thông tin trên là chính xác"
                    name="agree"
                    onChange={handleChange}
                    type="checkbox"
                  />
                  {errors.agree && <p className="wizard-error">{errors.agree}</p>}
                </section>
              )}

              <div className="wizard-actions">
                <Button
                  disabled={step === 0}
                  onClick={() => dispatch({ type: 'BACK' })}
                  type="button"
                  variant="outline-secondary"
                >
                  ← Quay lại
                </Button>
                <Button type="submit" variant={step === STEPS.length - 1 ? 'success' : 'dark'}>
                  {step === STEPS.length - 1 ? 'Xác nhận đăng ký' : 'Tiếp tục →'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </main>
  )
}

export default CourseWizard