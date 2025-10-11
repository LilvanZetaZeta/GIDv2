import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RecoverPassword from '../../pages/RecoveryPassword';

describe('RecoverPassword', () => {
  const mockUser = {
    email: 'ivan@correo.com',
    password: '123456'
  };

  beforeEach(() => {
    localStorage.setItem('users', JSON.stringify([mockUser]));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('muestra mensaje de error si el correo no existe', () => {
    render(<RecoverPassword />);

    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'otro@correo.com' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Enviar código' }));

    expect(screen.getByText('❌ El correo no está registrado')).toBeDefined();
  });

  it('muestra formulario de código y contraseña si el correo es válido', () => {
    render(<RecoverPassword />);

    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'ivan@correo.com' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Enviar código' }));

    expect(screen.getByLabelText('Código recibido')).toBeDefined();
    expect(screen.getByLabelText('Nueva contraseña')).toBeDefined();
  });

  it('muestra error si el código ingresado es incorrecto', () => {
    render(<RecoverPassword />);

    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'ivan@correo.com' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Enviar código' }));

    fireEvent.change(screen.getByLabelText('Código recibido'), {
      target: { value: '000000' }
    });

    fireEvent.change(screen.getByLabelText('Nueva contraseña'), {
      target: { value: 'nuevaClave' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Confirmar cambio' }));

    expect(screen.getByText('❌ Código incorrecto')).toBeDefined();
  });

  it('actualiza la contraseña si el código es correcto', () => {
    render(<RecoverPassword />);

    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'ivan@correo.com' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Enviar código' }));

    const alertText = screen.getByText((text) => text.includes('Código enviado')).textContent;
    const code = alertText.match(/\d{6}/)[0];

    fireEvent.change(screen.getByLabelText('Código recibido'), {
      target: { value: code }
    });

    fireEvent.change(screen.getByLabelText('Nueva contraseña'), {
      target: { value: 'claveNueva' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Confirmar cambio' }));

    expect(screen.getByText('✅ Contraseña actualizada correctamente')).toBeDefined();

    const updatedUsers = JSON.parse(localStorage.getItem('users'));
    expect(updatedUsers[0].password).toBe('claveNueva');
  });
});
