import QuantityPicker from './components/QuantityPicker'
import MiniCart from './components/MiniCart'
import ProfilePreview from './components/ProfilePreview'
import ProductFilter from './components/ProductFilter'
import RegisterForm from './components/RegisterForm'
import ValidatedRegisterForm from './components/ValidatedRegisterForm'
import TodoList from './components/TodoList'
import CartDemoPage from './pages/CartDemoPage'
import { products } from './data/products'
import './App.css'

function App() {
  return (
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
  )
}

export default App
