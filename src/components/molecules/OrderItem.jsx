import React from 'react';
import '../../styles/components/molecules/OrderItem.css';

export const OrderItem = ({ item }) => {
  return (
    <div className="order-item">
      <span className="order-item__name">{item.quantity} x {item.productName}</span>
      <span className="order-item__price">${(item.priceAtPurchase * item.quantity).toFixed(2)}</span>
    </div>
  );
};