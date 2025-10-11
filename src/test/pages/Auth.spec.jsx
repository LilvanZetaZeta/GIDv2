import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Auth from '../../pages/Auth';
import { MemoryRouter } from 'react-router-dom';

describe('Auth', () => {
  beforeEach(() => {
    window.alert = () => {};
  });

  it('renderiza el título y la pregunta principal', () => {
    render(
      <MemoryRouter>
        <Auth />
      </MemoryRouter>
    );

    expect(screen.getByText('Bienvenido a GID')).toBeDefined();
    expect(screen.getByText('¿Qué deseas hacer?')).toBeDefined();
  });

  it('renderiza los botones de Iniciar sesión y Registrarse', () => {
    render(
      <MemoryRouter>
        <Auth />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeDefined();
  });

  it('los botones tienen las clases correctas', () => {
    render(
      <MemoryRouter>
        <Auth />
      </MemoryRouter>
    );

    const loginBtn = screen.getByRole('button', { name: 'Iniciar sesión' });
    const registerBtn = screen.getByRole('button', { name: 'Registrarse' });

    expect(loginBtn.classList.contains('w-100')).toBeTrue();
    expect(registerBtn.classList.contains('w-100')).toBeTrue();
  });
});