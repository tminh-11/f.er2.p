import { Button } from 'react-bootstrap'
import { Link, Navigate, useLocation } from 'react-router-dom'

function SuccessPage() {
  const { state } = useLocation()

  if (
    !state ||
    typeof state.name !== 'string' ||
    typeof state.email !== 'string' ||
    typeof state.session !== 'string'
  ) {
    return <Navigate to="/register" replace />
  }

  return (
    <section className="form-section">
      <div className="registration-card success-card">
        <p className="eyebrow">ĐĂNG KÝ THÀNH CÔNG</p>
        <h1 className="section-title">Cảm ơn {state.name}</h1>
        <p className="section-intro">
          Vé tham dự đã được gửi tới <strong>{state.email}</strong>.
        </p>
        <p className="session-confirmation">
          Buổi tham dự: <strong>Buổi {state.session.toLowerCase()}</strong>
        </p>
        <div className="registration-actions">
          <Button as={Link} to="/register" className="secondary-button">
            Đăng ký thêm người khác
          </Button>
          <Button as={Link} to="/" className="primary-button">
            Về trang sự kiện
          </Button>
        </div>
      </div>
    </section>
  )
}

export default SuccessPage
