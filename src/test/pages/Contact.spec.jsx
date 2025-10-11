import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../../pages/Contact';
import { MemoryRouter } from 'react-router-dom';

describe('Contact', () => {
  it('renderiza ContactTemplate correctamente', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    expect(screen.getByText('Contáctanos')).toBeDefined();
  });
});
