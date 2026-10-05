import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./components/Cart";
import CartBadge from "./components/CartBadge";
import ProductList from "./components/ProductList";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Login from "./pages/Login";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <>
      <Header />
      <div className="box">
        <h2>Xin chào, {user.username}</h2>
        <button onClick={logout}>Đăng xuất</button>
      </div>
      <CartBadge />
      <Content />
      <ProductList />
      <Cart />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}