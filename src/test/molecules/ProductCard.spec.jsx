import React from 'react';
import ReactDOM from 'react-dom';
import ProductCard from '../../components/molecules/ProductCard';
import { render, screen, fireEvent } from '@testing-library/react';
import * as cartModule from '../../data/cart';
import { MemoryRouter } from 'react-router-dom';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Zapatillas Pro',
    description: 'Diseño deportivo y cómodo',
    price: 59990,
    stock: 3,
    category: 'calzado',
    image: 'zapatillas.jpg'
  };

  beforeEach(() => {
    window.alert = () => {}; // evita alertas reales
  });

  it('renderiza nombre, descripción, precio y stock', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockProduct.name)).toBeDefined();
    expect(screen.getByText(mockProduct.description)).toBeDefined();
    expect(screen.getByText(`$${mockProduct.price.toLocaleString('es-CL')}`)).toBeDefined();
    expect(screen.getByText(`Stock disponible: ${mockProduct.stock}`)).toBeDefined();
  });

  it('renderiza la imagen con alt correcto', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const img = screen.getByAltText(mockProduct.name);
    expect(img).toBeDefined();
    expect(img.getAttribute('src')).toContain(mockProduct.image);
  });

  it('renderiza opciones de cantidad según el stock', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const select = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');
    expect(select.value).toBe('1');
    expect(options.length).toBe(mockProduct.stock);
  });

  it('tiene la clase CSS principal', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const card = screen.getByText(mockProduct.name).closest('.custom-product-card');
    expect(card).not.toBeNull();
  });
});