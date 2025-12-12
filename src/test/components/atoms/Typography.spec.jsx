import React from 'react';
import { render, screen } from '@testing-library/react';
import { Typography } from '../../../components/atoms/Typography';

describe('Atom: Typography', () => {
  it('renderiza el texto con la variante correcta (h1)', () => {
    render(<Typography variant="h1">Título Principal</Typography>);
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy();
    expect(screen.getByText('Título Principal')).toBeTruthy();
  });
});