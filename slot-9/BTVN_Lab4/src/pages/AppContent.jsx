import { useState } from 'react'
import CartPage from './CartPage'
import CheckoutPage from './CheckoutPage'
import ShopPage from './ShopPage'
import LoginForm from '../components/LoginForm'
import Layout from '../components/Layout'
import { useAuth } from '../context/useAuth'

function AppContent() {
  const [page, setPage] = useState('shop')
  const { login, isLoggedIn, user } = useAuth()

  function handleLoginSuccess(email) {
    login(email)
    setPage('shop')
  }

  return (
    <Layout currentPage={page} onNavigate={setPage}>
      {page === 'shop' && <ShopPage />}
      {page === 'cart' && <CartPage onNavigate={setPage} />}
      {page === 'checkout' && <CheckoutPage onNavigate={setPage} />}
      {page === 'login' &&
        (isLoggedIn ? (
          <main className="store-page">
            <div className="checkout-success">
              <h1>Xin chào, {user.name}</h1>
              <p>Đang đăng nhập với {user.email}</p>
            </div>
          </main>
        ) : (
          <main className="store-page login-page">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </main>
        ))}
    </Layout>
  )
}

export default AppContent
