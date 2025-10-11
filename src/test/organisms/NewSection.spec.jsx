import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsSection from '../../components/organisms/NewSection';
import newsData from '../../data/news';

describe('NewsSection', () => {
  it('renderiza el título de la sección', () => {
    render(<NewsSection />);
    expect(screen.getByText('Noticias Gaming y Hardware')).toBeDefined();
  });

  it('renderiza una NewsCard por cada entrada en newsData', () => {
    render(<NewsSection />);
    newsData.forEach((news) => {
      expect(screen.getByText(news.title)).toBeDefined();
      expect(screen.getByText(news.summary)).toBeDefined();
    });
  });
});