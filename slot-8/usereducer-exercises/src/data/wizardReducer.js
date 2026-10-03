export const COURSES = [
  { id: 'react', name: 'ReactJS cơ bản', fee: 2500000 },
  { id: 'node', name: 'NodeJS & Express', fee: 3000000 },
  { id: 'fullstack', name: 'Fullstack MERN', fee: 5000000 },
]

export const SCHEDULES = ['Sáng 2-4-6', 'Tối 3-5-7', 'Cuối tuần']

export const STEPS = ['Thông tin', 'Khóa học', 'Xác nhận']

export const STEP_FIELDS = [
  ['fullName', 'email', 'phone'],
  ['courseId', 'schedule'],
  ['agree'],
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateField(name, values) {
  const value = values[name]

  switch (name) {
    case 'fullName':
      return value.trim().length >= 3 ? '' : 'Họ tên cần có ít nhất 3 ký tự.'
    case 'email':
      return EMAIL_PATTERN.test(value) ? '' : 'Vui lòng nhập địa chỉ email hợp lệ.'
    case 'phone':
      return /^0\d{9}$/.test(value) ? '' : 'Số điện thoại cần có 10 số và bắt đầu bằng 0.'
    case 'courseId':
      return COURSES.some((course) => course.id === value) ? '' : 'Vui lòng chọn khóa học.'
    case 'schedule':
      return SCHEDULES.includes(value) ? '' : 'Vui lòng chọn lịch học.'
    case 'agree':
      return value ? '' : 'Vui lòng xác nhận thông tin đăng ký.'
    default:
      return ''
  }
}

export function validateStep(step, values) {
  return STEP_FIELDS[step].reduce((errors, name) => {
    const error = validateField(name, values)
    return error ? { ...errors, [name]: error } : errors
  }, {})
}

export function initWizard(initialCourseId = 'react') {
  return {
    step: 0,
    maxVisited: 0,
    values: {
      fullName: '',
      email: '',
      phone: '',
      courseId: initialCourseId,
      schedule: '',
      agree: false,
    },
    errors: {},
    submitted: false,
  }
}

function clearStepErrors(errors, step) {
  const fields = STEP_FIELDS[step]
  return Object.fromEntries(Object.entries(errors).filter(([name]) => !fields.includes(name)))
}

export function wizardReducer(state, action) {
  switch (action.type) {
    case 'CHANGE': {
      const { name, value } = action.payload
      const values = { ...state.values, [name]: value }
      if (!state.errors[name]) return { ...state, values }

      const errors = { ...state.errors }
      const error = validateField(name, values)
      if (error) errors[name] = error
      else delete errors[name]
      return { ...state, values, errors }
    }
    case 'NEXT': {
      const stepErrors = validateStep(state.step, state.values)
      if (Object.keys(stepErrors).length > 0) {
        return {
          ...state,
          errors: { ...clearStepErrors(state.errors, state.step), ...stepErrors },
        }
      }
      if (state.step >= STEPS.length - 1) return state

      const step = state.step + 1
      return {
        ...state,
        step,
        maxVisited: Math.max(state.maxVisited, step),
        errors: clearStepErrors(state.errors, state.step),
      }
    }
    case 'BACK':
      return state.step === 0 ? state : { ...state, step: state.step - 1 }
    case 'GO_TO':
      return Number.isInteger(action.payload) && action.payload >= 0 && action.payload <= state.maxVisited
        ? { ...state, step: action.payload }
        : state
    case 'SUBMIT': {
      if (state.step !== STEPS.length - 1) return state
      const stepErrors = validateStep(state.step, state.values)
      if (Object.keys(stepErrors).length > 0) {
        return {
          ...state,
          errors: { ...clearStepErrors(state.errors, state.step), ...stepErrors },
        }
      }
      return { ...state, errors: clearStepErrors(state.errors, state.step), submitted: true }
    }
    case 'RESET':
      return initWizard(action.payload)
    default:
      throw new Error(`Action không hợp lệ: ${action.type}`)
  }
}