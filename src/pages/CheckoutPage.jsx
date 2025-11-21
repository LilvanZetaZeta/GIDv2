import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { createOrder } from '../services/orderApi';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Typography } from '../components/atoms/Typography';
import toast from 'react-hot-toast';
import '../styles/pages/CheckoutPage.css';

export const CheckoutPage = () => {
  const { cart, clearLocalCart, reloadCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('Tarjeta (simulado)');
  const [loading, setLoading] = useState(false);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container text-center" style={{marginTop: '2rem'}}>
        <Typography variant="h2">Tu carrito está vacío</Typography>
        <Button onClick={() => navigate('/')} variant="secondary" className="button--auto-width" style={{marginTop: '1rem'}}>Volver al Home</Button>
      </div>
    );
  }

  const total = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handlePay = async () => {
    if (!user) {
        toast.error("Usuario no identificado");
        return;
    }

    setLoading(true);
    try {
      console.log("Iniciando pago para usuario:", user.id);
      // Pasamos el ID explícitamente
      const orderData = await createOrder(user.id, paymentMethod);
      
      clearLocalCart(); 
      reloadCart();     
      
      toast.success("¡Compra realizada con éxito!");
      navigate(`/order/${orderData.data.id}`);
      
    } catch (error) {
      console.error("Error en checkout:", error);
      const msg = error.response?.data?.message || "Hubo un error al procesar tu orden.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <Typography variant="h1" className="text-center">Finalizar Compra</Typography>
      <div className="checkout-page__summary">
        {cart.items.map(item => (
          <div key={item.id} className="checkout-page__summary-item">
            <span>{item.product.name} (x{item.quantity})</span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="checkout-page__total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="checkout-page__form">
        <label style={{fontWeight: 'bold', marginBottom: '0.5rem', display: 'block'}}>Método de Pago:</label>
        <Input value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} placeholder="Ej. Tarjeta" />
        <div style={{marginTop: '1.5rem'}}>
            <Button onClick={handlePay} disabled={loading}>{loading ? "Procesando..." : "Confirmar y Pagar"}</Button>
        </div>
      </div>
    </div>
  );
};