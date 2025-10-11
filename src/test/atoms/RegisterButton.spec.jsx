import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterButton from '../../components/atoms/RegisterButton';

describe('RegisterButton', () => {
  it('renderiza con el texto por defecto', () => {
    render(<RegisterButton />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Registrarse');
  });

  it('renderiza con texto personalizado', () => {
    render(<RegisterButton>Crear cuenta</RegisterButton>);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Crear cuenta');
  });

  it('propaga eventos como onClick', () => {
    const handleClick = jasmine.createSpy('handleClick');
    render(<RegisterButton onClick={handleClick}>Click aquí</RegisterButton>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('tiene la clase CSS correcta', () => {
    render(<RegisterButton />);
    const button = screen.getByRole('button');
    expect(button.classList.contains('register-button')).toBeTrue();
  });
});