import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../../pages/Login';
import { MemoryRouter } from 'react-router-dom';

describe('Login', () => {
  beforeEach(() => {
    window.alert = () => {};
    localStorage.clear();
  });

  it('renderiza el título y los campos del formulario', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeDefined(); // ✅ evita conflicto
    expect(screen.getByLabelText('Correo electrónico')).toBeDefined();
    expect(screen.getByLabelText('Contraseña')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeDefined();
  });

  it('permite escribir en los campos', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'david@duocuc.cl' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'clave123!' } });

    expect(screen.getByLabelText('Correo electrónico').value).toBe('david@duocuc.cl');
    expect(screen.getByLabelText('Contraseña').value).toBe('clave123!');
  });

  it('muestra error si el usuario no existe', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'fake@duocuc.cl' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'wrongpass!' } });
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    expect(screen.getByText('Usuario o contraseña incorrectos')).toBeDefined();
  });

  it('renderiza los botones de navegación secundaria', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: 'Olvidé mi contraseña' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeDefined();
  });
});