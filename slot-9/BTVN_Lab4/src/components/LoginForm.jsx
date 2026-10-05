import { useReducer } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import {
  initialLoginState,
  LOGIN_ACTIONS,
  loginReducer,
  validateLogin,
} from '../reducers/loginReducer'

function fakeLoginApi(values) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (
        values.email.trim().toLowerCase() === 'admin@fpt.edu.vn' &&
        values.password === '12345678'
      ) {
        resolve(values.email.trim())
      } else {
        reject(new Error('Email hoặc mật khẩu không đúng'))
      }
    }, 1000)
  })
}

function LoginForm({ onLoginSuccess }) {
  const [state, dispatch] = useReducer(loginReducer, initialLoginState)
  const { values, errors, touched, status, message } = state
  const isSubmitting = status === 'submitting'

  if (status === 'success') {
    return (
      <section className="login-panel" aria-labelledby="login-success-title">
        <Alert
          className="login-alert login-alert--success"
          variant="success"
          role="status"
        >
          <h2 id="login-success-title">{message}</h2>
          <Button
            className="login-button"
            type="button"
            onClick={() => dispatch({ type: LOGIN_ACTIONS.RESET })}
          >
            Đăng nhập lại
          </Button>
        </Alert>
      </section>
    )
  }

  async function handleSubmit(event) {
    event.preventDefault()
    dispatch({ type: LOGIN_ACTIONS.SUBMIT })

    if (Object.keys(validateLogin(values)).length > 0) {
      return
    }

    let email
    try {
      email = await fakeLoginApi(values)
    } catch {
      dispatch({ type: LOGIN_ACTIONS.LOGIN_FAILURE })
      return
    }

    dispatch({
      type: LOGIN_ACTIONS.LOGIN_SUCCESS,
      payload: `Xin chào ${email}!`,
    })
    onLoginSuccess?.({ ...values, email })
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    dispatch({
      type: LOGIN_ACTIONS.CHANGE_FIELD,
      payload: { name, value, type, checked },
    })
  }

  function handleBlur(event) {
    dispatch({
      type: LOGIN_ACTIONS.BLUR_FIELD,
      payload: { name: event.target.name },
    })
  }

  const emailInvalid = touched.email && Boolean(errors.email)
  const emailValid = touched.email && !errors.email && Boolean(values.email)
  const passwordInvalid = touched.password && Boolean(errors.password)

  return (
    <section className="login-panel" aria-labelledby="login-title">
      <h2 id="login-title">Đăng nhập với useReducer</h2>
      <Form className="login-form" noValidate onSubmit={handleSubmit}>
        <Form.Group className="login-field" controlId="login-email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="login-control"
            type="email"
            name="email"
            autoComplete="username"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={emailInvalid}
            isValid={emailValid}
            disabled={isSubmitting}
          />
          {emailInvalid && (
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="login-field" controlId="login-password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            className="login-control"
            type="password"
            name="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={passwordInvalid}
            disabled={isSubmitting}
          />
          {passwordInvalid && (
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Check
          className="login-remember"
          id="login-remember"
          type="checkbox"
          name="remember"
          label="Ghi nhớ đăng nhập"
          checked={values.remember}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />

        {status === 'error' && (
          <Alert
            className="login-alert login-alert--error"
            variant="danger"
            role="alert"
          >
            {message}
          </Alert>
        )}

        <Button
          className="login-button"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner
                className="login-spinner"
                animation="border"
                size="sm"
                aria-hidden="true"
              />
              Đang đăng nhập...
            </>
          ) : (
            'Đăng nhập'
          )}
        </Button>
      </Form>
    </section>
  )
}

export default LoginForm
