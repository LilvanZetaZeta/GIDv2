import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordToggle from '../../components/atoms/PasswordToggle';

describe('PasswordToggle', () => {
  it('muestra "👁️ Ver" cuando visible es false', () => {
    render(<PasswordToggle visible={false} onToggle={() => {}} />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('👁️ Ver');
  });

  it('muestra "🙈 Ocultar" cuando visible es true', () => {
    render(<PasswordToggle visible={true} onToggle={() => {}} />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('🙈 Ocultar');
  });

  it('propaga el evento onToggle al hacer click', () => {
    const handleToggle = jasmine.createSpy('handleToggle');
    render(<PasswordToggle visible={false} onToggle={handleToggle} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleToggle).toHaveBeenCalled();
  });

  it('tiene la clase CSS correcta', () => {
    render(<PasswordToggle visible={false} onToggle={() => {}} />);
    const button = screen.getByRole('button');
    expect(button.classList.contains('password-toggle')).toBeTrue();
  });
});