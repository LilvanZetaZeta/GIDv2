import React, { useState } from 'react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { Textarea } from '../atoms/TextArea'; // El nuevo átomo
import { Typography } from '../atoms/Typography';
import toast from 'react-hot-toast';
// Reutilizamos el CSS del LoginForm
import '../../styles/components/organisms/LoginForm.css'; 

export const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Mensaje enviado");
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <Input placeholder="Nombre" required />
      <Input type="email" placeholder="Email" required />
      <Textarea placeholder="Mensaje" required />
      <Button type="submit">Enviar</Button>
    </form>
  );
};