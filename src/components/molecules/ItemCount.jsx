import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import '../../styles/components/molecules/ItemCount.css';

export const ItemCount = ({ stock, onAdd }) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(q => Math.min(q + 1, stock));
  const decrement = () => setQuantity(q => Math.max(q - 1, 1));

  return (
    <div className="item-count">
      <div className="item-count__selector">
        <button onClick={decrement} className="item-count__button" disabled={quantity === 1}>-</button>
        <span className="item-count__quantity">{quantity}</span>
        <button onClick={increment} className="item-count__button" disabled={quantity === stock}>+</button>
      </div>
      <Button onClick={() => onAdd(quantity)}>
        Agregar al Carrito
      </Button>
    </div>
  );
};