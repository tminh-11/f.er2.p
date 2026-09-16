function Card({ name, price, tags, avatar, description }) {
	return (
		<article className="product-card">
			<div className="product-image-wrap">
				<img className="product-image" src={avatar} alt={name} />
				<span className="product-index">0{tags.includes('Hot') ? 1 : 2}</span>
			</div>

			<div className="product-content">
				<div className="product-heading">
					<h2>{name}</h2>
					<p className="product-price">{price}</p>
				</div>
				<p className="product-description">{description}</p>
				<div className="product-meta">
					<div className="product-tags" aria-label="Tags">
						{tags.map((tag) => (
							<span className="tag" key={tag}>{tag}</span>
						))}
					</div>
					<button className="add-button" type="button" aria-label={`Thêm ${name} vào giỏ hàng`}>
						<span aria-hidden="true">+</span>
					</button>
				</div>
			</div>
		</article>
	)
}

export default Card
