import React from 'react';
import '../../styles/molecules/NewsCard.css';

function NewsCard({ title, summary, url }) {
  return (
    <div className="news-card">
      <h3>{title}</h3>
      <p>{summary}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Leer más →
      </a>  
    </div>
  );
}

export default NewsCard;
