import { products } from './products'

export const shopProducts = products.map((product) => {
  if (product.id === 4) {
    return { ...product, price: 250000, discount: 0 }
  }

  if (product.id === 5) {
    return { ...product, price: 780000, discount: 0 }
  }

  if (product.id === 6) {
    return {
      ...product,
      name: 'Tai nghe',
      price: 590000,
      discount: 10,
      stock: 10,
    }
  }

  return product
})
