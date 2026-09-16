import './App.css'
import { Container } from 'react-bootstrap'
import ProductList from './ProductList'

function App() {
  return (
    <main className="storefront py-4 py-lg-5">
      <Container>
        <header className="storefront-header text-center mb-4">
          <p className="eyebrow text-uppercase text-secondary fw-semibold mb-2">CURATED / 02 ITEMS</p>
          <h1 className="display-5 fw-bold mb-3">Daily essentials</h1>
          <p className="intro text-muted mx-auto mb-0">Những món đồ đơn giản, có cá tính và được chọn để dùng thật lâu.</p>
        </header>

        <ProductList />

        <footer className="storefront-footer d-flex flex-column flex-md-row justify-content-between align-items-center text-uppercase text-secondary small mt-4 pt-3 border-top">
          <span>SPRING / SUMMER 2026</span>
          <span>Selected for everyday</span>
        </footer>
      </Container>
    </main>
  )
}

export default App
