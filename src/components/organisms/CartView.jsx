import React from 'react';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { Button } from '../atoms/Button';
import { CartItem } from '../molecules/CartItem';
import { Spinner } from '../atoms/Spinner';
import { Typography } from '../atoms/Typography';
import '../../styles/components/organisms/CartView.css';

export const CartView = () => {
  const { cart, loading } = useCart();
  const navigate = useNavigate();

  if (loading) return <Spinner />;
  
  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center">
        <Typography variant="h2">Tu carrito está vacío</Typography>
        <Button onClick={() => navigate('/')} variant="secondary" className="button--auto-width" style={{marginTop: '1rem'}}>
          Ir a la tienda
        </Button>
      </div>
    );
  }

  const total = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div>
      <Typography variant="h1">Tu Carrito</Typography>
      <div className="cart-view__items">
        {cart.items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      
      <div className="cart-view__summary">
        <Typography variant="h2" className="cart-view__total">
          Total: ${total.toFixed(2)}
        </Typography>
        <div className="cart-view__checkout-button-wrapper">
          <Button onClick={() => navigate('/checkout')}>
            Proceder al Pago
          </Button>
        </div>
      </div>
    </div>
  );
};