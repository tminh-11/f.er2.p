import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer.jsx'
import MyCarousel from './components/MyCarousel.jsx'
import Navbar from './components/Navbar.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import New from './pages/New.jsx'
import ProductList from './pages/ProductList.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container py-4">
        <MyCarousel />
      </div>
      <main className="container site-main flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/new" element={<New />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
