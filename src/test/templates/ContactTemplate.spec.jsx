import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactTemplate from '../../components/templates/ContactTemplate';
import { MemoryRouter } from 'react-router-dom';

describe('ContactTemplate', () => {
  it('renderiza ContactSection correctamente', () => {
    render(
      <MemoryRouter>
        <ContactTemplate />
      </MemoryRouter>
    );

    expect(screen.getByTestId('contact-section')).toBeDefined();
  });
});
