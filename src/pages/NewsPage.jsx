import React from 'react';
import { NewsFeed } from '../components/organisms/NewsFeed';
import { Typography } from '../components/atoms/Typography';

export const NewsPage = () => (
  <div className="container">
    <Typography variant="h1">Noticias</Typography>
    <NewsFeed />
  </div>
);