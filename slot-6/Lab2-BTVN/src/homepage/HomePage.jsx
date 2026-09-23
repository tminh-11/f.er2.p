import Header from '../components/Header'
import Hero from '../components/Hero'
import MenuSection from '../components/MenuSection'
import BookingForm from '../components/BookingForm'

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <BookingForm />
      </main>
      <footer className="site-footer" id="contact">
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-3">
          <span className="brand-mark">Pizza House</span>
          <span>Via della Pizza, 12 &middot; Napoli</span>
          <span>&copy; 2024 Pizza House</span>
        </div>
      </footer>
    </>
  )
}

export default HomePage
