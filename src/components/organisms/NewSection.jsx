import React from 'react';
import NewsCard from '../molecules/NewsCard';
import newsData from '../../data/news';
import '../../styles/organisms/NewsSection.css';

function NewsSection() {
  return (
    <section className="news-section" data-testid="news-section">
      <h2>Noticias Gaming y Hardware</h2>
      {newsData.map((news, index) => (
        <NewsCard key={index} {...news} />
      ))}
    </section>
  );
}

export default NewsSection;