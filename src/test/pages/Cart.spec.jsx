import { render, screen } from '@testing-library/react';
import React from 'react';
import Cart from '../../pages/Cart';

describe('Cart', () => {
  beforeEach(() => {
    window.alert = () => {};
    localStorage.clear();
  });

  it('muestra mensaje de carrito vacío si no hay productos', () => {
    localStorage.setItem('cart', JSON.stringify([]));
    render(<Cart />);
    expect(screen.getByText('Tu carrito está vacío.')).toBeDefined();
  });

  it('renderiza productos en la tabla si hay elementos en el carrito', () => {
    const mockCart = [
      { id: 1, name: 'Mouse Gamer', price: 19990, quantity: 2 },
      { id: 2, name: 'Teclado Mecánico', price: 49990, quantity: 1 }
    ];
    localStorage.setItem('cart', JSON.stringify(mockCart));
    render(<Cart />);

    expect(screen.getByText('Mouse Gamer')).toBeDefined();
    expect(screen.getByText('Teclado Mecánico')).toBeDefined();
    expect(screen.getAllByText('$49.990').length).toBeGreaterThan(0); // puede aparecer como unitario y subtotal
    expect(screen.getByText('$39.980')).toBeDefined(); // subtotal del mouse
    expect(screen.getByText('Total: $89.970')).toBeDefined();
  });

  it('renderiza botones de acción si hay productos', () => {
    const mockCart = [{ id: 1, name: 'Audífonos', price: 29990, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(mockCart));
    render(<Cart />);

    expect(screen.getByRole('button', { name: 'Vaciar carrito' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Confirmar compra' })).toBeDefined();
  });
});