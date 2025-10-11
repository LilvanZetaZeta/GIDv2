import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '../../components/molecules/RegisterForm';
import { MemoryRouter } from 'react-router-dom';

describe('RegisterForm', () => {
  beforeEach(() => {
    localStorage.clear();
    window.alert = () => {};
  });

  it('renderiza todos los campos y el botón de registro', () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('Nombre')).toBeDefined();
    expect(screen.getByLabelText('Correo electrónico')).toBeDefined();
    expect(screen.getByLabelText('Contraseña')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeDefined();
  });

  it('permite escribir en los campos', () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'David' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'david@duocuc.cl' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'clave123!' } });

    expect(screen.getByLabelText('Nombre').value).toBe('David');
    expect(screen.getByLabelText('Correo electrónico').value).toBe('david@duocuc.cl');
    expect(screen.getByLabelText('Contraseña').value).toBe('clave123!');
  });

  it('muestra error si los campos están vacíos', () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));
    expect(screen.getByText('Todos los campos son obligatorios')).toBeDefined();
  });

  it('muestra error si el correo no es válido', () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'David' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'david@gmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'clave123!' } });

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));
    expect(screen.getByText('Solo se permite registro con @duocuc.cl o @profesor.duoc.cl')).toBeDefined();
  });

  it('muestra error si la contraseña no cumple requisitos', () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'David' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'david@duocuc.cl' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'abc' } });

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));
    expect(screen.getByText('La contraseña debe tener al menos 6 caracteres, un número y un carácter especial')).toBeDefined();
  });

  it('muestra éxito si el registro es válido', () => {
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'David' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'david@duocuc.cl' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'clave123!' } });

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));
    expect(screen.getByText('Registro exitoso ✅ Redirigiendo...')).toBeDefined();
  });
});