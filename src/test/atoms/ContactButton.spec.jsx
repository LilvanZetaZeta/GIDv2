import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactButton from '../../components/atoms/ContactButton';

describe('ContactButton', () => {
  it('renderiza con el texto por defecto', () => {
    render(<ContactButton />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Enviar mensaje');
  });

  it('renderiza con texto personalizado', () => {
    render(<ContactButton>Enviar correo</ContactButton>);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Enviar correo');
  });

  it('propaga eventos como onClick', () => {
    const handleClick = jasmine.createSpy('handleClick');
    render(<ContactButton onClick={handleClick}>Click aquí</ContactButton>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('tiene la clase CSS correcta', () => {
    render(<ContactButton />);
    const button = screen.getByRole('button');
    expect(button.classList.contains('contact-button')).toBeTrue();
  });
});