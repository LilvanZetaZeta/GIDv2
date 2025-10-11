import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../../components/molecules/ContactForm';

describe('ContactForm', () => {
  it('renderiza todos los campos correctamente', () => {
    render(<ContactForm onSubmit={() => {}} />);
    expect(screen.getByLabelText('Nombre')).toBeDefined();
    expect(screen.getByLabelText('Correo electrónico')).toBeDefined();
    expect(screen.getByLabelText('Mensaje')).toBeDefined();
    expect(screen.getByRole('button')).toBeDefined();
  });

  it('permite escribir en los campos', () => {
    render(<ContactForm onSubmit={() => {}} />);
    const nameInput = screen.getByLabelText('Nombre');
    const emailInput = screen.getByLabelText('Correo electrónico');
    const messageArea = screen.getByLabelText('Mensaje');

    fireEvent.change(nameInput, { target: { value: 'David' } });
    fireEvent.change(emailInput, { target: { value: 'david@duocuc.cl' } });
    fireEvent.change(messageArea, { target: { value: 'Hola mundo' } });

    expect(nameInput.value).toBe('David');
    expect(emailInput.value).toBe('david@duocuc.cl');
    expect(messageArea.value).toBe('Hola mundo');
  });

  it('envía el formulario y limpia los campos', () => {
    const handleSubmit = jasmine.createSpy('handleSubmit');
    render(<ContactForm onSubmit={handleSubmit} />);

    const nameInput = screen.getByLabelText('Nombre');
    const emailInput = screen.getByLabelText('Correo electrónico');
    const messageArea = screen.getByLabelText('Mensaje');
    const submitButton = screen.getByRole('button');

    fireEvent.change(nameInput, { target: { value: 'David' } });
    fireEvent.change(emailInput, { target: { value: 'david@duocuc.cl' } });
    fireEvent.change(messageArea, { target: { value: 'Hola mundo' } });

    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'David',
      email: 'david@duocuc.cl',
      message: 'Hola mundo'
    });

    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(messageArea.value).toBe('');
  });
});