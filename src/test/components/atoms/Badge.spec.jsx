import React from 'react';
import { render, screen } from '@testing-library/react';

import { Badge } from '../../../components/atoms/Badge';

describe('Atom: Badge', () => {
  it('debería renderizar el contenido (children) correctamente', () => {
    // Renderizamos el Badge con el texto "Nuevo"
    render(<Badge>Nuevo</Badge>);
    
    // Buscamos ese texto en la pantalla
    const badgeElement = screen.getByText('Nuevo');
    
    // Verificamos que existe
    expect(badgeElement).toBeTruthy();
  });
  
  it('debería renderizar números correctamente', () => {
    render(<Badge>5</Badge>);
    const numberElement = screen.getByText('5');
    expect(numberElement).toBeTruthy();
  });
});