import { render, screen } from '@testing-library/react';
import React from 'react';
import Navbar from '../../components/organisms/Navbar';
import { MemoryRouter } from 'react-router-dom';


describe('Navbar', () => {
  beforeEach(() => {
    const mockCart = [{ id: 1 }, { id: 2 }];
    localStorage.setItem('cart', JSON.stringify(mockCart));
  });

  const renderWithRouter = () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  };

  it('muestra el nombre de la marca y los íconos', () => {
    renderWithRouter();
    expect(screen.getByText('GID')).toBeDefined();
    expect(screen.getByText('storefront')).toBeDefined();
    expect(screen.getByText('person')).toBeDefined();
    expect(screen.getByText('shopping_cart')).toBeDefined();
  });

  it('muestra los enlaces de navegación', () => {
    renderWithRouter();
    expect(screen.getByText('Productos')).toBeDefined();
    expect(screen.getByText('Contacto')).toBeDefined();
    expect(screen.getByText('Noticias')).toBeDefined();
  });

  it('muestra el contador del carrito si hay productos', () => {
    renderWithRouter();
    expect(screen.getByText('2')).toBeDefined();
  });
});