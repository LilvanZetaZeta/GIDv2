import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from '../../pages/Products';
import { MemoryRouter } from 'react-router-dom';
import products from '../../data/Products';

describe('Products', () => {
  beforeEach(() => {
    window.alert = () => {};
  });

  it('renderiza el título y controles de filtro', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );

    expect(screen.getByText((text) => text.includes('Productos'))).toBeDefined();
    expect(screen.getByPlaceholderText('Buscar por nombre...')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Todas' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Accesorios' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Computadores' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Componentes' })).toBeDefined();
  });

  it('renderiza todos los productos inicialmente', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );

    products.forEach(product => {
      expect(screen.getByText(product.name)).toBeDefined();
    });
  });

  it('filtra productos por categoría', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Accesorios' }));
    const accesorios = products.filter(p => p.category === 'accesorios');
    accesorios.forEach(product => {
      expect(screen.getByText(product.name)).toBeDefined();
    });
  });

  it('filtra productos por búsqueda', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );

    const target = products[0];
    fireEvent.change(screen.getByPlaceholderText('Buscar por nombre...'), {
      target: { value: target.name.slice(0, 4) }
    });

    expect(screen.getByText(target.name)).toBeDefined();
  });

  it('muestra mensaje si no hay coincidencias', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Buscar por nombre...'), {
      target: { value: 'zzzzzzzz' }
    });

    expect(screen.getByText('No se encontraron productos.')).toBeDefined();
  });
});
