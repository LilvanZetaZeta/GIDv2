import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../components/atoms/Text';


describe('Text', () => {
  it('renderiza como <p> por defecto', () => {
    render(<Text>Contenido por defecto</Text>);
    const element = screen.getByText('Contenido por defecto');
    expect(element.tagName.toLowerCase()).toBe('p');
  });

  it('renderiza como <h2> si se especifica el variant', () => {
    render(<Text variant="h2">Título</Text>);
    const element = screen.getByText('Título');
    expect(element.tagName.toLowerCase()).toBe('h2');
  });

  it('aplica la clase CSS "text"', () => {
    render(<Text>Texto con clase</Text>);
    const element = screen.getByText('Texto con clase');
    expect(element.classList.contains('text')).toBeTrue();
  });

  it('aplica clases adicionales si se especifican', () => {
    render(<Text className="extra">Texto extendido</Text>);
    const element = screen.getByText('Texto extendido');
    expect(element.classList.contains('extra')).toBeTrue();
  });

  it('aplica estilos inline correctamente', () => {
    render(<Text style={{ color: 'red' }}>Texto rojo</Text>);
    const element = screen.getByText('Texto rojo');
    expect(element.style.color).toBe('red');
  });
});