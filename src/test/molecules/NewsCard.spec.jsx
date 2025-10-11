import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsCard from '../../components/molecules/NewsCard';

describe('NewsCard', () => {
  const mockNews = {
    title: 'Nuevo lanzamiento de GPU',
    summary: 'La nueva RTX 5090 supera todas las expectativas.',
    url: 'https://example.com/gpu-news'
  };

  it('renderiza el título correctamente', () => {
    render(<NewsCard {...mockNews} />);
    const title = screen.getByText(mockNews.title);
    expect(title.tagName.toLowerCase()).toBe('h3');
  });

  it('renderiza el resumen correctamente', () => {
    render(<NewsCard {...mockNews} />);
    const summary = screen.getByText(mockNews.summary);
    expect(summary.tagName.toLowerCase()).toBe('p');
  });

  it('renderiza el enlace con atributos correctos', () => {
    render(<NewsCard {...mockNews} />);
    const link = screen.getByText('Leer más →');
    expect(link.getAttribute('href')).toBe(mockNews.url);
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('tiene la clase CSS correcta', () => {
    render(<NewsCard {...mockNews} />);
    const card = screen.getByText(mockNews.title).closest('.news-card');
    expect(card).not.toBeNull();
  });
});