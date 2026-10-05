import { useAuth } from '../context/useAuth'
import { useTheme } from '../context/useTheme'
import { useCart } from '../context/useCart'

const menuItems = [
  { key: 'shop', label: 'Cửa hàng' },
  { key: 'cart', label: 'Giỏ hàng' },
  { key: 'checkout', label: 'Thanh toán' },
]

function Header({ currentPage, onNavigate }) {
  const { theme, toggleTheme } = useTheme()
  const { user, isLoggedIn, logout } = useAuth()
  const { totalQuantity } = useCart()

  return (
    <nav
      className="app-navbar"
      data-bs-theme={theme}
      aria-label="Điều hướng chính"
    >
      <div className="app-navbar-inner">
        <button
          className="app-navbar-brand"
          type="button"
          onClick={() => onNavigate('shop')}
        >
          FPT Shop Mini
        </button>
        <nav className="store-nav" aria-label="Các trang">
          {menuItems.map(({ key, label }) => (
            <a
              key={key}
              className={`store-nav-link${currentPage === key ? ' store-nav-link--active' : ''}`}
              href={`#${key}`}
              aria-current={currentPage === key ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault()
                onNavigate(key)
              }}
            >
              {label}
              {key === 'cart' && totalQuantity > 0 && (
                <span className="store-nav-badge">{totalQuantity}</span>
              )}
            </a>
          ))}
        </nav>
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
          {!isLoggedIn && (
            <button
              className="header-action-button"
              type="button"
              onClick={() => onNavigate('login')}
            >
              Đăng nhập
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
