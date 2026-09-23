import { menuItems } from '../data/menuData'

function MenuSection() {
  return (
    <section className="menu-section section-space" id="menu">
      <div className="container">
        <div className="section-heading d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
          <div>
            <p className="eyebrow">Made with love</p>
            <h2>Our <em>signature</em> menu</h2>
          </div>
          <p className="section-description">Classic recipes with a little something<br className="d-none d-md-block" /> extra. Always made fresh to order.</p>
        </div>
        <div className="row g-4 mt-2">
          {menuItems.map((item) => (
            <div className="col-12 col-sm-6 col-lg-3" key={item.name}>
              <article className="card menu-card h-100">
                <div className="menu-image-wrap">
                  <img src={item.image} className="card-img-top menu-image" alt={item.name} />
                  {item.badge && <span className={`menu-badge ${item.badge === 'NEW' ? 'new-badge' : ''}`}>{item.badge}</span>}
                </div>
                <div className="card-body d-flex flex-column">
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-text">{item.description}</p>
                  <div className="mt-auto d-flex justify-content-between align-items-center pt-3">
                    <div className="price">
                      {item.oldPrice && <del>{item.oldPrice}</del>}
                      <strong>{item.price}</strong>
                    </div>
                    <button className="btn add-button" type="button" aria-label={`Add ${item.name} to order`}>+</button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MenuSection
