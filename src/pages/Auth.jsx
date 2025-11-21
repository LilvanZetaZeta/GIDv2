import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const navigate = useNavigate();

  return (
    <Container className="mt-5 text-center">
      <h2>Bienvenido a GID</h2>
      <p>¿Qué deseas hacer?</p>
      <Row className="justify-content-center mt-4">
        <Col xs={12} sm={6} md={4}>
          <Button variant="primary" className="w-100 mb-3" onClick={() => navigate('/login')}>
            Iniciar sesión
          </Button>
          <Button variant="secondary" className="w-100" onClick={() => navigate('/register')}>
            Registrarse
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Auth;
