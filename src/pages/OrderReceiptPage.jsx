import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../services/orderApi';
import { Typography } from '../components/atoms/Typography';
import { OrderItem } from '../components/molecules/OrderItem';

export const OrderReceiptPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => { getOrderById(orderId).then(res => setOrder(res.data)); }, [orderId]);
  if (!order) return <p>Cargando...</p>;
  return (
    <div className="container">
      <Typography variant="h1">Recibo #{order.id}</Typography>
      <p>Total: {order.total}</p>
      <p>Estado: {order.status}</p>
      {order.items.map(i => <OrderItem key={i.id} item={i} />)}
    </div>
  );
};