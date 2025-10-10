import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, clearCart } from '../data/cart';
import { Container, Table, Button } from 'react-bootstrap';
import '../styles/pages/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id);
    setCartItems(getCart());
  };

  const handleClear = () => {
    clearCart();
    setCartItems([]);
  };

  const handleConfirmPurchase = () => {
    alert(`Compra confirmada por un total de $${total.toLocaleString('es-CL')}`);
    clearCart();
    setCartItems([]);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container className="cart-container">
      <h2 className="cart-title">🛒 Carrito de compras</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Tu carrito está vacío.</p>
      ) : (
        <>
          <Table striped bordered hover responsive className="cart-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio unitario</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toLocaleString('es-CL')}</td>
                  <td>${(item.price * item.quantity).toLocaleString('es-CL')}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4 className="cart-total">Total: ${total.toLocaleString('es-CL')}</h4>

          <div className="cart-actions">
            <Button variant="outline-danger" onClick={handleClear}>
              Vaciar carrito
            </Button>
            <Button variant="success" onClick={handleConfirmPurchase}>
              Confirmar compra
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Cart;
