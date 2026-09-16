function Card({ name, price, tags, avatar, description }) {
  return (
    <article className="product-card card h-100 border-0 shadow-sm">
      <div className="product-image-wrap position-relative">
        <img className="product-image card-img-top" src={avatar} alt={name} />
        <span className="product-index badge rounded-pill bg-dark position-absolute top-0 start-0 m-3">
          0{tags.includes('Hot') ? 1 : 2}
        </span>
      </div>

      <div className="product-content card-body d-flex flex-column">
        <div className="product-heading d-flex justify-content-between align-items-start gap-3 mb-3">
          <h2 className="h4 mb-0">{name}</h2>
          <p className="product-price text-dark fw-semibold mb-0">{price}</p>
        </div>

        <p className="product-description text-body-secondary flex-grow-1">{description}</p>

        <div className="product-meta d-flex justify-content-between align-items-center mt-3">
          <div className="product-tags d-flex flex-wrap gap-2" aria-label="Tags">
            {tags.map((tag) => (
              <span className="tag badge rounded-pill text-bg-light border" key={tag}>{tag}</span>
            ))}
          </div>

          <button
            className="add-button btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
            type="button"
            aria-label={`Thêm ${name} vào giỏ hàng`}
            style={{ width: '42px', height: '42px' }}
          >
            <span aria-hidden="true" className="fs-5">+</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default Card
