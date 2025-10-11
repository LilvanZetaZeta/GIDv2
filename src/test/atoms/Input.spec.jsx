import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../components/atoms/Input';


describe('Input', () => {
  it('renderiza con el placeholder correcto', () => {
    render(<Input placeholder="Ingresa tu nombre" />);
    const input = screen.getByPlaceholderText('Ingresa tu nombre');
    expect(input).toBeDefined();
  });

  it('acepta y muestra el valor correctamente', () => {
    render(<Input value="David" onChange={() => {}} />);
    const input = screen.getByDisplayValue('David');
    expect(input).toBeDefined();
  });

  it('propaga el evento onChange', () => {
    const handleChange = jasmine.createSpy('handleChange');
    render(<Input value="" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'nuevo texto' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('usa los atributos id, name y type correctamente', () => {
    render(<Input id="email" name="correo" type="email" />);
    const input = screen.getByRole('textbox');
    expect(input.getAttribute('id')).toBe('email');
    expect(input.getAttribute('name')).toBe('correo');
    expect(input.getAttribute('type')).toBe('email');
  });

  it('tiene la clase CSS correcta', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input.classList.contains('input')).toBeTrue();
  });
});