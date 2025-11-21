import React from 'react';
import { Typography } from '../atoms/Typography';
import '../../styles/components/molecules/NewsCard.css';

export const NewsCard = ({ title, description, link }) => {
  return (
    <article className="news-card">
      <Typography variant="h2" className="news-card__title">{title}</Typography>
      <Typography variant="body" className="news-card__description">
        {description}
      </Typography>
      <a href={link} className="news-card__link" target="_blank" rel="noopener noreferrer">
        Leer más →
      </a>
    </article>
  );
};