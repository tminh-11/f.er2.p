const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const LOGIN_ACTIONS = {
  CHANGE_FIELD: 'CHANGE_FIELD',
  BLUR_FIELD: 'BLUR_FIELD',
  SUBMIT: 'SUBMIT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  RESET: 'RESET',
}

export const initialLoginState = {
  values: {
    email: '',
    password: '',
    remember: false,
  },
  errors: {},
  touched: {},
  status: 'idle',
  message: '',
}

export function validateLogin(values) {
  const errors = {}
  const email = values.email.trim()

  if (!email) {
    errors.email = 'Vui lòng nhập email'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Email không đúng định dạng'
  }

  if (!values.password) {
    errors.password = 'Vui lòng nhập mật khẩu'
  } else if (values.password.length < 8) {
    errors.password = 'Mật khẩu phải có ít nhất 8 ký tự'
  }

  return errors
}

export function loginReducer(state, action) {
  switch (action.type) {
    case LOGIN_ACTIONS.CHANGE_FIELD: {
      const { name, value, type, checked } = action.payload
      const values = {
        ...state.values,
        [name]: type === 'checkbox' ? checked : value,
      }

      return {
        ...state,
        values,
        errors: validateLogin(values),
        status: state.status === 'error' ? 'idle' : state.status,
        message: '',
      }
    }

    case LOGIN_ACTIONS.BLUR_FIELD: {
      const { name } = action.payload
      return {
        ...state,
        touched: {
          ...state.touched,
          [name]: true,
        },
      }
    }

    case LOGIN_ACTIONS.SUBMIT: {
      const errors = validateLogin(state.values)
      const touched = Object.keys(state.values).reduce(
        (allTouched, name) => ({ ...allTouched, [name]: true }),
        {},
      )

      return {
        ...state,
        errors,
        touched,
        status: Object.keys(errors).length === 0 ? 'submitting' : 'idle',
        message: '',
      }
    }

    case LOGIN_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.payload,
      }

    case LOGIN_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        status: 'error',
        message: 'Email hoặc mật khẩu không đúng',
      }

    case LOGIN_ACTIONS.RESET:
      return initialLoginState

    default:
      throw new Error(`Unknown login action: ${action.type}`)
  }
}
