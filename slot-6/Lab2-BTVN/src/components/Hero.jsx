function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-content">
        <p className="eyebrow">Authentic Italian kitchen</p>
        <h1>Good pizza.<br /><em>Good mood.</em></h1>
        <p className="hero-copy">Hand-stretched dough, fire-kissed crust and the freshest ingredients in every slice.</p>
        <a className="btn btn-order btn-lg rounded-pill px-4" href="#menu">Explore our menu <span aria-hidden="true">&#8594;</span></a>
      </div>
      <div className="hero-note"><span>Since 1998</span><span className="note-line" /><span>Napoli, Italy</span></div>
    </section>
  )
}

export default Hero
