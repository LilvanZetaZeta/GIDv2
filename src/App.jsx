import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from '../src/components/organisms/Navbar.jsx';
import Home from '../src/pages/Home.jsx';
import ProductDetail from '../src/pages/ProductDetail';
import Cart from '../src/pages/Cart.jsx'
import Products from '../src/pages/Products.jsx'
import Auth from '../src/pages/Auth.jsx';
import Contact from './pages/Contact';
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import RecoverPassword from './pages/RecoveryPassword.jsx'
import News from './pages/News';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />      
        <Route path="/auth" element={<Auth />} />  
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/recover" element={<RecoverPassword />} /> 
        <Route path="/news" element={<News />} />
      </Routes>
    </>
  );
}

export default App;
