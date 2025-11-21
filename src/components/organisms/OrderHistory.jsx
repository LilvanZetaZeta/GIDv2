import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserOrderHistory } from '../../services/orderApi';
import { Typography } from '../atoms/Typography';
import { Spinner } from '../atoms/Spinner';
import { OrderItem } from '../molecules/OrderItem';
import '../../styles/components/organisms/OrderHistory.css';

export const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  useEffect(() => { if (user) getUserOrderHistory(user.id).then(res => setOrders(res.data)); }, [user]);
  return (
    <div className="order-history">
      <h3>Mis Compras</h3>
      {orders.map(o => (
        <div key={o.id} className="order-card">
          <div className="order-header"><span>Orden #{o.id}</span><span>${o.total}</span></div>
          <div className="order-body">{o.items.map(i => <OrderItem key={i.id} item={i} />)}</div>
          <div className="order-footer">Estado: {o.status}</div>
        </div>
      ))}
    </div>
  );
};