import React from 'react';
import { render, screen } from '@testing-library/react';
import Label from '../../components/atoms/Label';

describe('Label', () => {
  it('renderiza el texto correctamente', () => {
    render(<Label htmlFor="email">Correo electrónico</Label>);
    const label = screen.getByText('Correo electrónico');
    expect(label).toBeDefined();
  });

  it('usa el atributo htmlFor correctamente', () => {
    render(<Label htmlFor="nombre">Nombre</Label>);
    const label = screen.getByText('Nombre');
    expect(label.getAttribute('for')).toBe('nombre');
  });

  it('tiene la clase CSS correcta', () => {
    render(<Label htmlFor="test">Etiqueta</Label>);
    const label = screen.getByText('Etiqueta');
    expect(label.classList.contains('label')).toBeTrue();
  });
});