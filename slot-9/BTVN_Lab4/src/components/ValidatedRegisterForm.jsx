import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputField from './InputField'
import { fields, initialValues } from '../data/registerConfig'
import { majors } from '../data/majors'
import { validateRegister } from '../utils/validateRegister'

function ValidatedRegisterForm() {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [success, setSuccess] = useState('')

  const errors = validateRegister(values)
  const isValid = Object.keys(errors).length === 0

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setValues((previousValues) => ({
      ...previousValues,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setSuccess('')
  }

  function handleBlur(event) {
    const { name } = event.target
    setTouched((previousTouched) => ({
      ...previousTouched,
      [name]: true,
    }))
  }

  function showError(name) {
    return touched[name] ? errors[name] : undefined
  }

  function handleSubmit(event) {
    event.preventDefault()
    setTouched(
      Object.keys(values).reduce(
        (allTouched, name) => ({ ...allTouched, [name]: true }),
        {},
      ),
    )

    if (!isValid) {
      setSuccess('')
      return
    }

    setSuccess(`Đăng ký thành công! Chào mừng ${values.fullName.trim()}.`)
    setValues(initialValues)
    setTouched({})
  }

  return (
    <section
      className="register-panel"
      aria-labelledby="validated-register-title"
    >
      <h2 id="validated-register-title">Đăng ký có kiểm tra</h2>
      <Form className="register-form" noValidate onSubmit={handleSubmit}>
        {fields.map((field) => (
          <InputField
            key={field.id}
            {...field}
            id={`validated-register-${field.id}`}
            name={field.id}
            value={values[field.id]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError(field.id)}
          />
        ))}

        <Form.Group className="register-field">
          <Form.Label className="register-label">Giới tính</Form.Label>
          <div className="register-radio-group">
            {['Nam', 'Nữ'].map((gender) => (
              <Form.Check
                key={gender}
                id={`validated-register-gender-${gender}`}
                type="radio"
                name="gender"
                value={gender}
                label={gender}
                checked={values.gender === gender}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}
          </div>
        </Form.Group>

        <Form.Group
          className="register-field"
          controlId="validated-register-major"
        >
          <Form.Label className="register-label">Chuyên ngành</Form.Label>
          <Form.Select
            className="register-control"
            name="major"
            value={values.major}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={Boolean(showError('major'))}
          >
            <option value="">-- Chọn chuyên ngành --</option>
            {majors.map((major) => (
              <option key={major} value={major}>
                {major}
              </option>
            ))}
          </Form.Select>
          {showError('major') && (
            <Form.Control.Feedback type="invalid">
              {showError('major')}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="register-field">
          <Form.Check
            id="validated-register-agree"
            className="register-check"
            type="checkbox"
            name="agree"
            label="Tôi đồng ý với các điều khoản"
            checked={values.agree}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={Boolean(showError('agree'))}
            feedback={showError('agree')}
            feedbackType="invalid"
          />
        </Form.Group>

        <div className="register-actions">
          <Button className="register-submit" type="submit">
            Đăng ký
          </Button>
          <span
            className={`register-validation-status ${
              isValid
                ? 'register-validation-status--valid'
                : 'register-validation-status--invalid'
            }`}
            role="status"
          >
            {isValid
              ? 'Thông tin hợp lệ'
              : `Còn ${Object.keys(errors).length} mục chưa hợp lệ`}
          </span>
        </div>
      </Form>

      {success && (
        <Alert className="register-success" variant="success" role="status">
          {success}
        </Alert>
      )}
    </section>
  )
}

export default ValidatedRegisterForm
