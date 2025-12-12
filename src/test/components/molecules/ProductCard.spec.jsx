/*
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductCard } from '../../../components/molecules/ProductCard';

describe('Molecule: ProductCard', () => {
  // Creamos un producto simulado con una imagen .webp
  const mockProduct = {
    id: 1,
    name: 'Computador Gamer',
    price: 990000,
    // 👇 INTENTO 1: Usamos 'image'. Si falla, cambia esta palabra por 'img'
    image: 'computador-gamer.webp', 
    category: 'tecnologia'
  };

  it('debería renderizar la información del producto correctamente', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    // 1. Verificamos el Título
    expect(screen.getByText('Computador Gamer')).toBeTruthy();

    // 2. Verificamos la Imagen
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeTruthy();
    
    // 👇 DIAGNÓSTICO: Si esto falla, imprime qué nombre de atributo tiene realmente
    console.log('SRC encontrado:', imgElement.getAttribute('src'));

    // Verificamos que el src contenga el nombre de la imagen (ignorando rutas /assets/ si las hubiera)
    expect(imgElement.getAttribute('src')).toContain('computador-gamer.webp');
  });
});

*/