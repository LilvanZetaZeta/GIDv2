import React from 'react';
import { render, screen } from '@testing-library/react';

import { ErrorMessage } from '../../../components/atoms/ErrorMessage';

describe('Atom: ErrorMessage', () => {
  it('debería mostrar el mensaje de error proporcionado', () => {
    const textoError = 'La contraseña es incorrecta';
    
    
    render(<ErrorMessage message={textoError} />);
    
 
    
    // Buscamos el texto exacto
    const errorElement = screen.getByText(textoError);
    
    // Verificamos que existe
    expect(errorElement).toBeTruthy();
  });
});