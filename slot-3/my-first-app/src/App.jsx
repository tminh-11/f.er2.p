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
    <main className="storefront">
      <header className="storefront-header">
        <p className="eyebrow">CURATED / 02 ITEMS</p>
        <h1>Daily essentials</h1>
        <p className="intro">Những món đồ đơn giản, có cá tính và được chọn để dùng thật lâu.</p>
      </header>

      <section className="product-grid" aria-label="Danh sách sản phẩm">
        {products.map((product) => (
          <Card key={product.name} {...product} />
        ))}
      </section>

      <footer className="storefront-footer">
        <span>SPRING / SUMMER 2026</span>
        <span>Selected for everyday</span>
      </footer>
    </main>
  )
}

export default App
