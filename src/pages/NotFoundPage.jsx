import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/atoms/Button';
import { Typography } from '../components/atoms/Typography';
import '../styles/pages/NotFoundPage.css';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <Typography variant="h1" className="not-found-page__title">404</Typography>
      <Typography variant="h2">Página no Encontrada</Typography>
      <Typography variant="body" className="mb-6">
        Lo sentimos, la página que estás buscando no existe.
      </Typography>
      <div className="not-found-page__button-wrapper">
        <Link to="/">
          <Button>Volver al Home</Button>
        </Link>
      </div>
    </div>
  );
};