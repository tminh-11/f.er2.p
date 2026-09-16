import './App.css'
import Card from './Card'

const products = [
  {
    name: 'Essential Cotton Shirt',
    price: '250.000đ',
    tags: ['Hot', 'Cotton'],
    avatar: '/images/shirt.jpg',
    description: 'Phom dáng thoải mái, nhẹ tênh cho những ngày năng động.',
  },
  {
    name: 'Aero Street Sneaker',
    price: '900.000đ',
    tags: ['New', 'Streetwear'],
    avatar: '/images/sneaker.jpg',
    description: 'Đế êm và thiết kế nổi bật, sẵn sàng đồng hành cả ngày dài.',
  },
]

function App() {
  return (
    <main className="storefront container py-4 py-lg-5">
      <header className="storefront-header text-center mb-4">
        <p className="eyebrow text-uppercase text-secondary fw-semibold mb-2">CURATED / 02 ITEMS</p>
        <h1 className="display-5 fw-bold mb-3">Daily essentials</h1>
        <p className="intro text-muted mx-auto mb-0">Những món đồ đơn giản, có cá tính và được chọn để dùng thật lâu.</p>
      </header>

      <section className="row g-4" aria-label="Danh sách sản phẩm">
        {products.map((product) => (
          <div className="col-12 col-md-6" key={product.name}>
            <Card {...product} />
          </div>
        ))}
      </section>

      <footer className="storefront-footer d-flex flex-column flex-md-row justify-content-between align-items-center text-uppercase text-secondary small mt-4 pt-3 border-top">
        <span>SPRING / SUMMER 2026</span>
        <span>Selected for everyday</span>
      </footer>
    </main>
  )
}

export default App
