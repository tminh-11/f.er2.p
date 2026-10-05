export const fields = [
  {
    id: 'fullName',
    label: 'Họ và tên',
    type: 'text',
    required: true,
    placeholder: 'Nhập họ và tên',
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'name@example.com',
  },
  {
    id: 'password',
    label: 'Mật khẩu',
    type: 'password',
    required: true,
    placeholder: 'Nhập mật khẩu',
  },
  {
    id: 'confirmPassword',
    label: 'Nhập lại mật khẩu',
    type: 'password',
    required: true,
    placeholder: 'Nhập lại mật khẩu',
  },
  {
    id: 'phone',
    label: 'Số điện thoại',
    type: 'tel',
    placeholder: 'Nhập số điện thoại',
  },
  {
    id: 'birthday',
    label: 'Ngày sinh',
    type: 'date',
  },
]

export const initialValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  birthday: '',
  gender: 'Nam',
  major: '',
  agree: false,
}
