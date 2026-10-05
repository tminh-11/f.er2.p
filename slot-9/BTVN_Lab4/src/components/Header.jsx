import { useAuth } from '../context/useAuth'
import { useTheme } from '../context/useTheme'

function Header() {
  const { theme, toggleTheme } = useTheme()
  const { user, isLoggedIn, logout } = useAuth()

  return (
    <nav
      className="app-navbar"
      data-bs-theme={theme}
      aria-label="Điều hướng chính"
    >
      <div className="app-navbar-inner">
        <span className="app-navbar-brand">Hook Practice</span>
        <div className="app-navbar-actions">
          <span className="app-auth-status" aria-live="polite">
            {isLoggedIn ? `Xin chào, ${user.name}` : 'Chưa đăng nhập'}
          </span>
          {isLoggedIn && (
            <button
              className="header-action-button"
              type="button"
              onClick={logout}
            >
              Đăng xuất
            </button>
          )}
          <button
            className="header-action-button"
            data-variant="primary"
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng'
            }
          >
            {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
