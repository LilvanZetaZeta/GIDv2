import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsTemplate from '../../components/templates/NewsTemplate';
import { MemoryRouter } from 'react-router-dom';

describe('NewsTemplate', () => {
  it('renderiza NewsSection correctamente', () => {
    render(
      <MemoryRouter>
        <NewsTemplate />
      </MemoryRouter>
    );

    expect(screen.getByTestId('news-section')).toBeDefined();
  });
});
