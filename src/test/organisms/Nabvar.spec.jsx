import { render, screen } from '@testing-library/react';
import React from 'react';
import NavBar from '../../components/organisms/NavBar';
import { MemoryRouter } from 'react-router-dom';

describe('NavBar', () => {
  beforeEach(() => {
    // Simula carrito con 2 productos
    const mockCart = [{ id: 1 }, { id: 2 }];
    localStorage.setItem('cart', JSON.stringify(mockCart));
  });

  it('renderiza el nombre de la marca y los íconos principales', () => {
    render(<NavBar />);
    expect(screen.getByText('GID')).toBeDefined();
    expect(screen.getByText('storefront')).toBeDefined();
    expect(screen.getByText('person')).toBeDefined();
    expect(screen.getByText('shopping_cart')).toBeDefined();
  });

  it('renderiza los enlaces de navegación', () => {
    render(<NavBar />);
    expect(screen.getByRole('link', { name: 'Productos' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Contacto' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Noticias' })).toBeDefined();
  });

  it('muestra el contador de carrito si hay productos', () => {
    render(<NavBar />);
    expect(screen.getByText('2')).toBeDefined();
  });
});