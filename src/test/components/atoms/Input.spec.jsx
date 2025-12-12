import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Input } from '../../../components/atoms/Input';

describe('Atom: Input', () => {
  it('debería renderizar con el placeholder correcto', () => {
    render(<Input placeholder="Escribe tu nombre" name="test-input" />);
    
    // Verificamos que el input exista buscando por su texto de ayuda
    const inputElement = screen.getByPlaceholderText('Escribe tu nombre');
    expect(inputElement).toBeTruthy();
  });

  it('debería manejar el evento onChange al escribir', () => {
    // Creamos un espía para vigilar la función
    const handleChange = jasmine.createSpy('handleChange');
    
    render(<Input onChange={handleChange} placeholder="Test" />);
    
    const input = screen.getByPlaceholderText('Test');
    
    // Simulamos que el usuario escribe "Hola"
    fireEvent.change(input, { target: { value: 'Hola' } });

    // Verificamos que la función se ejecutó
    expect(handleChange).toHaveBeenCalled();
  });
});