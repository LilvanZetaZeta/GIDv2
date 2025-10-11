import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextArea from '../../components/atoms/TextArea';

describe('TextArea', () => {
  it('renderiza con el placeholder correcto', () => {
    render(<TextArea placeholder="Escribe tu mensaje" />);
    const textarea = screen.getByPlaceholderText('Escribe tu mensaje');
    expect(textarea).toBeDefined();
  });

  it('muestra el valor correctamente', () => {
    render(<TextArea value="Texto inicial" onChange={() => {}} />);
    const textarea = screen.getByDisplayValue('Texto inicial');
    expect(textarea).toBeDefined();
  });

  it('propaga el evento onChange', () => {
    const handleChange = jasmine.createSpy('handleChange');
    render(<TextArea value="" onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'nuevo texto' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('usa los atributos id, name y rows correctamente', () => {
    render(<TextArea id="mensaje" name="mensaje" rows={6} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea.getAttribute('id')).toBe('mensaje');
    expect(textarea.getAttribute('name')).toBe('mensaje');
    expect(textarea.getAttribute('rows')).toBe('6');
  });

  it('tiene la clase CSS correcta', () => {
    render(<TextArea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea.classList.contains('textarea')).toBeTrue();
  });
});