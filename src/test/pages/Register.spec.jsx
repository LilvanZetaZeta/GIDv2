import React from 'react';
import { render, screen } from '@testing-library/react';
import Register from '../../pages/Register';
import { MemoryRouter } from 'react-router-dom';

describe('Register', () => {
  it('renderiza el título y el formulario de registro', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Registrarse' })).toBeDefined();
    expect(screen.getByTestId('register-form')).toBeDefined();
  });
});