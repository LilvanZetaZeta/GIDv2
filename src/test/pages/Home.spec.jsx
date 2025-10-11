
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/Home';
import { MemoryRouter } from 'react-router-dom';
import products from '../../data/Products';
import newsData from '../../data/news';

describe('Home', () => {
  it('renderiza el banner principal', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Bienvenido a GID Store')).toBeDefined();
    expect(screen.getByText('Encuentra los mejores productos para tu setup gamer y profesional')).toBeDefined();
  });

  it('renderiza la sección de noticias con sus títulos', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('📰 Noticias')).toBeDefined();
    newsData.forEach(news => {
      expect(screen.getByText(news.title)).toBeDefined();
      expect(screen.getByText(news.summary)).toBeDefined();
    });
  });

  it('renderiza la sección de productos con sus nombres', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('🛒 Todos los productos')).toBeDefined();
    products.forEach(product => {
      expect(screen.getByText(product.name)).toBeDefined();
    });
  });

  it('renderiza el footer con el texto legal', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/GID Store. Todos los derechos reservados/)).toBeDefined();
  });
});
