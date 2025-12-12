import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 

import { Link } from '../../../components/atoms/Link';

describe('Atom: Link', () => {
  it('debería renderizar correctamente y apuntar a la ruta indicada', () => {
    render(
      // Necesario porque el componente Link usa useHref o similar internamente
      <BrowserRouter>
        <Link to="/registro">Registrarse</Link>
      </BrowserRouter>
    );

    const linkElement = screen.getByText('Registrarse');
    
    // Verificamos que existe
    expect(linkElement).toBeTruthy();
    
    // Verificamos que el atributo href (en el DOM) sea el correcto
    expect(linkElement.getAttribute('href')).toBe('/registro');
  });
});