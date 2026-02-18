import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import GoogleAuthCallback from './components/GoogleAuthCallback';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
                <Route path="/auth/google/success" element={<GoogleAuthCallback />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
