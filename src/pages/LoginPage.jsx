import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/organisms/LoginForm';
import { Typography } from '../components/atoms/Typography';
import { Link as AtomLink } from '../components/atoms/Link';

export const LoginPage = () => {
  return (
    // Usa la clase helper de index.css
    <div className="form-container">
      <Typography variant="h1" className="text-center">Iniciar Sesión</Typography>
      <LoginForm />
      <Typography variant="body" className="text-center" style={{marginTop: '1rem'}}>
        ¿No tienes cuenta? <AtomLink to="/register">Regístrate</AtomLink>
      </Typography>
    </div>
  );
};