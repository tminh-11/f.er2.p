import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { CartProvider } from "./contexts/CartContext";
import CartBadge from "./components/CartBadge";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export default function App() {
  // App KHÔNG cần biết gì về theme
  return (
    <CartProvider>
      <Header />
      <CartBadge />
      <Content />
      <ProductList />
      <Cart />
      <Footer />
    </CartProvider>
  );
}