import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [codeSent, setCodeSent] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSendCode = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.email === email);

    if (!userExists) {
      setMessage('❌ El correo no está registrado');
      return;
    }

    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setCodeSent(generatedCode);
    setStep(2);
    setMessage(`✅ Código enviado a ${email} (simulado): ${generatedCode}`);
  };

  const handleResetPassword = () => {
    if (enteredCode !== codeSent) {
      setMessage('❌ Código incorrecto');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user =>
      user.email === email ? { ...user, password: newPassword } : user
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setMessage('✅ Contraseña actualizada correctamente');
    setStep(3);
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Recuperar contraseña</h2>

      {message && <Alert variant={message.includes('✅') ? 'success' : 'danger'}>{message}</Alert>}

      {step === 1 && (
        <Form>
          <Form.Group className="mb-3" controlId="recoverEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              id="recoverEmail"
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSendCode}>
            Enviar código
          </Button>
        </Form>
      )}

      {step === 2 && (
        <Form>
          <Form.Group className="mb-3" controlId="recoverCode">
            <Form.Label>Código recibido</Form.Label>
            <Form.Control
              id="recoverCode"
              type="text"
              placeholder="Ingresa el código"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="recoverNewPassword">
            <Form.Label>Nueva contraseña</Form.Label>
            <Form.Control
              id="recoverNewPassword"
              type="password"
              placeholder="Ingresa nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="success" onClick={handleResetPassword}>
            Confirmar cambio
          </Button>
        </Form>
      )}

      {step === 3 && (
        <Button variant="link" onClick={() => window.location.href = '/login'}>
          Volver al login
        </Button>
      )}
    </Container>
  );
}

export default RecoverPassword;