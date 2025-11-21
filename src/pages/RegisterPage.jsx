import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/organisms/RegisterForm';
import { Typography } from '../components/atoms/Typography';
import { Link as AtomLink } from '../components/atoms/Link';

export const RegisterPage = () => {
  return (
    <div className="form-container">
      <Typography variant="h1" className="text-center">Crear Cuenta</Typography>
      <RegisterForm />
      <Typography variant="body" className="text-center" style={{marginTop: '1rem'}}>
        ¿Ya tienes cuenta? <AtomLink to="/login">Inicia Sesión</AtomLink>
      </Typography>
    </div>
  );
};