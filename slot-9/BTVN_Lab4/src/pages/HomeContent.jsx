import CartDemoPage from './CartDemoPage'
import LoginForm from '../components/LoginForm'
import MiniCart from '../components/MiniCart'
import ProductFilter from '../components/ProductFilter'
import ProfilePreview from '../components/ProfilePreview'
import QuantityPicker from '../components/QuantityPicker'
import RegisterForm from '../components/RegisterForm'
import TodoList from '../components/TodoList'
import ValidatedRegisterForm from '../components/ValidatedRegisterForm'
import { useAuth } from '../context/useAuth'
import { products } from '../data/products'

function HomeContent() {
  const { user, isLoggedIn, login } = useAuth()

  return (
    <>
      <section className="home-auth-section" aria-labelledby="home-title">
        <div className="home-auth-heading">
          <h1 id="home-title">Trang chủ</h1>
          <p>
            {isLoggedIn
              ? `Bạn đã đăng nhập với ${user.email}.`
              : 'Đăng nhập để xem nội dung trang chủ.'}
          </p>
        </div>
        {isLoggedIn ? (
          <div className="home-welcome" role="status">
            Xin chào, {user.name}! Bạn đã đăng nhập thành công.
          </div>
        ) : (
          <LoginForm onLoginSuccess={login} />
        )}
      </section>

      <main className="app">
        <h1>Bộ chọn số lượng</h1>
        <div className="picker-list">
          <QuantityPicker title="Bộ chọn mặc định" />
          <QuantityPicker title="Bộ chọn từ 2 đến 5" min={2} max={5} />
        </div>
        <MiniCart />
        <ProfilePreview />
        <ProductFilter products={products} />
        <RegisterForm />
        <ValidatedRegisterForm />
        <TodoList />
        <CartDemoPage />
      </main>
    </>
  )
}

export default HomeContent
