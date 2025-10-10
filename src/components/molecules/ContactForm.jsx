import React, { useState } from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import TextArea from '../atoms/TextArea';
import ContactButton from '../atoms/ContactButton';

function ContactForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="name">Nombre</Label>
      <Input
        id="name"
        name="name"
        placeholder="Tu nombre"
        value={form.name}
        onChange={handleChange}
      />

      <Label htmlFor="email">Correo electrónico</Label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="ejemplo@correo.com"
        value={form.email}
        onChange={handleChange}
      />

      <Label htmlFor="message">Mensaje</Label>
      <TextArea
        id="message"
        name="message"
        placeholder="Escribe tu mensaje..."
        value={form.message}
        onChange={handleChange}
      />

      <ContactButton type="submit" />
    </form>
  );
}

export default ContactForm;
