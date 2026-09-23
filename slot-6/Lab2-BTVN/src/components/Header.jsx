function Header() {
  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-md navbar-dark container py-2">
        <a className="navbar-brand brand-mark" href="#home" aria-label="Pizza House home">
          <span className="brand-icon">P</span>
          Pizza House
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavigation"
          aria-controls="mainNavigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNavigation">
          <ul className="navbar-nav ms-md-5 me-auto gap-md-3">
            <li className="nav-item"><a className="nav-link active" href="#home">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#menu">About Us</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
          </ul>
          <a className="btn btn-order rounded-pill px-4 mt-3 mt-md-0" href="#booking">Book a table</a>
        </div>
      </nav>
    </header>
  )
}

export default Header
