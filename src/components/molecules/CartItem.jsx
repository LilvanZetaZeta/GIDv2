import React from 'react';
import { useCart } from '../../hooks/useCart';
import { Image } from '../atoms/Image';
import { Button } from '../atoms/Button';
import '../../styles/components/molecules/CartItem.css';

export const CartItem = ({ item }) => {
  const { removeFromCart, loading } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item__image-wrapper">
        <Image src={item.product.imageUrl} alt={item.product.name} />
      </div>
      <div className="cart-item__content">
        <h3 className="cart-item__title">{item.product.name}</h3>
        <p className="cart-item__info">${item.product.price} x {item.quantity}</p>
      </div>
      <p className="cart-item__price">${(item.product.price * item.quantity).toFixed(2)}</p>
      <Button 
        variant="secondary" 
        onClick={() => removeFromCart(item.id)} 
        disabled={loading}
        className="cart-item__remove-button"
      >
        Quitar
      </Button>
    </div>
  );
};