import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputField from './InputField'
import { fields, initialValues } from '../data/registerConfig'
import { majors } from '../data/majors'

const REQUIRED_MESSAGES = {
  fullName: 'Vui lòng nhập họ và tên',
  email: 'Vui lòng nhập email',
  password: 'Vui lòng nhập mật khẩu',
  confirmPassword: 'Vui lòng nhập lại mật khẩu',
  major: 'Vui lòng chọn chuyên ngành',
}

function validate(values) {
  const newErrors = {}

  Object.entries(REQUIRED_MESSAGES).forEach(([name, message]) => {
    if (!values[name]?.trim()) {
      newErrors[name] = message
    }
  })

  if (
    values.confirmPassword.trim() &&
    values.confirmPassword !== values.password
  ) {
    newErrors.confirmPassword = 'Mật khẩu nhập lại không khớp'
  }

  if (!values.agree) {
    newErrors.agree = 'Bạn cần đồng ý điều khoản'
  }

  return newErrors
}

function RegisterForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setValues((previousValues) => ({
      ...previousValues,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: undefined,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const newErrors = validate(values)
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setSubmitted(null)
      return
    }

    setSubmitted(values)
  }

  function handleReset() {
    setValues(initialValues)
    setErrors({})
    setSubmitted(null)
  }

  return (
    <section className="register-panel" aria-labelledby="register-title">
      <h2 id="register-title">Đăng ký</h2>
      <Form className="register-form" noValidate onSubmit={handleSubmit}>
        {fields.map((field) => (
          <InputField
            key={field.id}
            {...field}
            name={field.id}
            value={values[field.id]}
            onChange={handleChange}
            error={errors[field.id]}
          />
        ))}

        <Form.Group className="register-field">
          <Form.Label className="register-label">Giới tính</Form.Label>
          <div className="register-radio-group">
            {['Nam', 'Nữ'].map((gender) => (
              <Form.Check
                key={gender}
                id={`register-gender-${gender}`}
                type="radio"
                name="gender"
                value={gender}
                label={gender}
                checked={values.gender === gender}
                onChange={handleChange}
              />
            ))}
          </div>
        </Form.Group>

        <Form.Group className="register-field" controlId="register-major">
          <Form.Label className="register-label">Chuyên ngành</Form.Label>
          <Form.Select
            className="register-control"
            name="major"
            value={values.major}
            onChange={handleChange}
            isInvalid={Boolean(errors.major)}
          >
            <option value="">-- Chọn chuyên ngành --</option>
            {majors.map((major) => (
              <option key={major} value={major}>
                {major}
              </option>
            ))}
          </Form.Select>
          {errors.major && (
            <Form.Control.Feedback type="invalid">
              {errors.major}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="register-field">
          <Form.Check
            id="register-agree"
            className="register-check"
            type="checkbox"
            name="agree"
            label="Tôi đồng ý với các điều khoản"
            checked={values.agree}
            onChange={handleChange}
            isInvalid={Boolean(errors.agree)}
            feedback={errors.agree}
            feedbackType="invalid"
          />
        </Form.Group>

        <div className="register-actions">
          <Button className="register-submit" type="submit">
            Đăng ký
          </Button>
          <Button
            className="register-reset"
            type="button"
            variant="outline-secondary"
            onClick={handleReset}
          >
            Làm lại
          </Button>
        </div>
      </Form>

      {submitted && (
        <Alert className="register-success" variant="success" role="status">
          <p>Đã nhận đăng ký của {submitted.fullName}.</p>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </Alert>
      )}
    </section>
  )
}

export default RegisterForm
