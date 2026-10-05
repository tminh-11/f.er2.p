const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^0\d{9}$/

function isAtLeastSixteen(birthday) {
  const [year, month, day] = birthday.split('-').map(Number)
  const birthDate = new Date(year, month - 1, day)

  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    return false
  }

  const today = new Date()
  let age = today.getFullYear() - year
  const birthdayHasPassed =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day)

  if (!birthdayHasPassed) {
    age -= 1
  }

  return age >= 16
}

export function validateRegister(values) {
  const errors = {}
  const fullName = values.fullName.trim()
  const email = values.email.trim()
  const password = values.password
  const confirmPassword = values.confirmPassword
  const phone = values.phone.trim()

  if (!fullName) {
    errors.fullName = 'Vui lòng nhập họ tên'
  } else if (fullName.length < 3) {
    errors.fullName = 'Họ tên phải có ít nhất 3 ký tự'
  }

  if (!email) {
    errors.email = 'Vui lòng nhập email'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Email không đúng định dạng'
  }

  if (password.length < 8) {
    errors.password = 'Mật khẩu phải có ít nhất 8 ký tự'
  } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    errors.password = 'Mật khẩu phải có cả chữ và số'
  }

  if (!confirmPassword || confirmPassword !== password) {
    errors.confirmPassword = 'Mật khẩu nhập lại không khớp'
  }

  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.phone = 'Số điện thoại gồm 10 số, bắt đầu bằng 0'
  }

  if (values.birthday && !isAtLeastSixteen(values.birthday)) {
    errors.birthday = 'Bạn phải từ 16 tuổi trở lên'
  }

  if (!values.major) {
    errors.major = 'Vui lòng chọn chuyên ngành'
  }

  if (!values.agree) {
    errors.agree = 'Bạn cần đồng ý điều khoản'
  }

  return errors
}
