import Carousel from 'react-bootstrap/Carousel'
import banners from '../data/banners.js'

function MyCarousel() {
  return (
    <Carousel className="site-carousel" fade interval={4000} pause="hover">
      {banners.map((banner) => (
        <Carousel.Item key={banner.id}>
          <img
            className="d-block w-100"
            src={banner.image}
            alt={banner.alt}
          />
          <Carousel.Caption>
            <h3>{banner.title}</h3>
            <p>{banner.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default MyCarousel
