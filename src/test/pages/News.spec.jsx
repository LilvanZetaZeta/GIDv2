import React from 'react';
import { render, screen } from '@testing-library/react';
import News from '../../pages/News';
import { MemoryRouter } from 'react-router-dom';

describe('News', () => {
  it('renderiza NewsTemplate correctamente', () => {
    render(
      <MemoryRouter>
        <News />
      </MemoryRouter>
    );

    expect(screen.getByText((content) => content.includes('Noticias'))).toBeDefined();
  });
});