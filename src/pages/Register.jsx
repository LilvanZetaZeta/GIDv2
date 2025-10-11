import React from 'react';
import { Container } from 'react-bootstrap';
import RegisterForm from '../components/molecules/RegisterForm';

function Register() {
  return (
    <Container className="mt-5">
      <h2>Registrarse</h2>
      <div data-testid="register-form">
        <RegisterForm />
      </div>
    </Container>
  );
}

export default Register;