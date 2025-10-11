import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactSection from '../../components/organisms/ContactSection';
import { MemoryRouter } from 'react-router-dom';

describe('ContactSection', () => {
  beforeEach(() => {
    window.alert = () => {};
  });

  it('renderiza el título y el formulario de contacto', () => {
    render(
      <MemoryRouter>
        <ContactSection />
      </MemoryRouter>
    );

    expect(screen.getByText('Contáctanos')).toBeDefined();
    expect(screen.getByLabelText('Nombre')).toBeDefined();
    expect(screen.getByLabelText('Correo electrónico')).toBeDefined();
    expect(screen.getByLabelText('Mensaje')).toBeDefined();
    expect(screen.getByRole('button')).toBeDefined();
  });

  it('muestra error si se envía el formulario vacío', () => {
    render(
      <MemoryRouter>
        <ContactSection />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Por favor, rellena todos los campos obligatorios')).toBeDefined();
  });

  it('muestra mensaje de éxito si el formulario está completo', () => {
    render(
      <MemoryRouter>
        <ContactSection />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'David' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'david@duocuc.cl' } });
    fireEvent.change(screen.getByLabelText('Mensaje'), { target: { value: 'Hola mundo' } });

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('✅ Formulario enviado con éxito')).toBeDefined();
  });
});