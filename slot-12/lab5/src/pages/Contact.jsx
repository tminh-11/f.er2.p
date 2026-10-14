import { useReducer, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

const initialFormState = {
  values: {
    name: '',
    email: '',
    message: '',
  },
  errors: {},
  submitted: false,
}

function validateForm(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Vui lòng nhập họ và tên.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Vui lòng nhập địa chỉ email hợp lệ.'
  }

  if (!values.message.trim()) {
    errors.message = 'Vui lòng nhập nội dung liên hệ.'
  }

  return errors
}

function formReducer(state, action) {
  switch (action.type) {
    case 'change': {
      const values = { ...state.values, [action.field]: action.value }
      return {
        ...state,
        values,
        errors: state.submitted ? validateForm(values) : state.errors,
      }
    }
    case 'submit':
      return {
        ...state,
        errors: validateForm(state.values),
        submitted: true,
      }
    default:
      return state
  }
}

function Contact() {
  const [form, dispatch] = useReducer(formReducer, initialFormState)
  const [showModal, setShowModal] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const errors = validateForm(form.values)
    dispatch({ type: 'submit' })

    if (Object.keys(errors).length === 0) {
      setShowModal(true)
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    dispatch({ type: 'change', field: name, value })
  }

  return (
    <>
      <section className="contact-section">
        <div className="contact-heading">
          <p className="product-eyebrow">LIÊN HỆ</p>
          <h1>Completed Lab5 - Trang contact</h1>
          <p className="product-intro">
            Điền thông tin bên dưới để gửi liên hệ của bạn.
          </p>
        </div>

        <Form className="contact-form" noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="contactName">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              name="name"
              value={form.values.name}
              onChange={handleChange}
              isInvalid={Boolean(form.errors.name)}
              placeholder="Nhập họ và tên"
              autoComplete="name"
            />
            <Form.Control.Feedback type="invalid">
              {form.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="contactEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.values.email}
              onChange={handleChange}
              isInvalid={Boolean(form.errors.email)}
              placeholder="name@example.com"
              autoComplete="email"
            />
            <Form.Control.Feedback type="invalid">
              {form.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="contactMessage">
            <Form.Label>Nội dung liên hệ</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              value={form.values.message}
              onChange={handleChange}
              isInvalid={Boolean(form.errors.message)}
              placeholder="Nhập nội dung bạn muốn liên hệ"
            />
            <Form.Control.Feedback type="invalid">
              {form.errors.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary">
            Gửi thông tin
          </Button>
        </Form>
      </section>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        aria-labelledby="completed-lab5-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="completed-lab5-title">Completed Lab5.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">Thông tin đã nhập vào form:</p>
          <dl className="contact-submission">
            <dt>Họ và tên</dt>
            <dd>{form.values.name}</dd>
            <dt>Email</dt>
            <dd>{form.values.email}</dd>
            <dt>Nội dung liên hệ</dt>
            <dd className="mb-0">{form.values.message}</dd>
          </dl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Contact
