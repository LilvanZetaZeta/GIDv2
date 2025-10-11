import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetail from '../../pages/ProductDetail';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import products from '../../data/Products';

describe('ProductDetail', () => {
  const product = products[0]; // usa el primer producto como base

  const renderWithRouter = (id) => {
    render(
      <MemoryRouter initialEntries={[`/producto/${id}`]}>
        <Routes>
          <Route path="/producto/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('muestra mensaje si el producto no existe', () => {
    renderWithRouter('999999'); // id inexistente
    expect(screen.getByText('Producto no encontrado')).toBeDefined();
  });

  it('renderiza detalles del producto si el id es válido', () => {
    renderWithRouter(product.id.toString());

    expect(screen.getByText(product.name)).toBeDefined();
    expect(screen.getByText(`$${product.price.toLocaleString('es-CL')}`)).toBeDefined();
    expect(screen.getByText(`Stock disponible: ${product.stock}`)).toBeDefined();
    expect(screen.getByText('Descripción')).toBeDefined();
    expect(screen.getByText(product.description)).toBeDefined();
    expect(screen.getByText('Ficha técnica')).toBeDefined();
    expect(screen.getByText(product.category)).toBeDefined();
  });

  it('renderiza imagen con alt correcto', () => {
    renderWithRouter(product.id.toString());
    const img = screen.getByAltText(product.name);
    expect(img).toBeDefined();
    expect(img.getAttribute('src')).toContain(product.image);
  });

  it('renderiza opciones de cantidad según el stock', () => {
    renderWithRouter(product.id.toString());
    const select = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');
    expect(select.value).toBe('1');
    expect(options.length).toBe(product.stock);
  });

  it('renderiza botones de acción', () => {
    renderWithRouter(product.id.toString());
    expect(screen.getByRole('button', { name: 'Comprar' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Volver' })).toBeDefined();
  });
});
