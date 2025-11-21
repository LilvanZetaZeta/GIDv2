import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AppRouter } from './router/AppRouter';
import { Navbar } from './components/organisms/Navbar';
import { Footer } from './components/organisms/Footer';

function App() {
  return (
    // 1. El Router debe ser el PADRE SUPREMO para que los Contextos puedan navegar
    <BrowserRouter>
      <AuthProvider>
        <CartProvider> {/* Ahora CartProvider está DENTRO del Router y puede usar useNavigate */}
          <Navbar />
          <main className="container">
            <AppRouter />
          </main>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;