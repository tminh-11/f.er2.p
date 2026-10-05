import Form from 'react-bootstrap/Form'

function InputField({
  id,
  label,
  type,
  helpText,
  error,
  required = false,
  ...inputProps
}) {
  return (
    <Form.Group className="register-field" controlId={id}>
      <Form.Label className="register-label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </Form.Label>
      <Form.Control
        className="register-control"
        type={type}
        required={required}
        isInvalid={Boolean(error)}
        {...inputProps}
      />
      {error ? (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      ) : (
        helpText && <Form.Text>{helpText}</Form.Text>
      )}
    </Form.Group>
  )
}

export default InputField
