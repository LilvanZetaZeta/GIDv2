import React, { useState } from 'react';
import Text from '../atoms/Text';
import ContactForm from '../molecules/ContactForm.jsx';

function ContactSection() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (formData) => {
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setSuccess(false);
      setError('Por favor, rellena todos los campos obligatorios ');
      return;
    }

    console.log('Mensaje enviado:', formData);
    setError('');
    setSuccess(true);
  };

  return (
    <section style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <Text variant="h2">Contáctanos</Text>
      <ContactForm onSubmit={handleSubmit} />

      {error && (
        <Text variant="p" className="text-error" style={{ marginTop: '1rem' }}>
          {error}
        </Text>
      )}

      {success && (
        <Text variant="p" className="text-success" style={{ marginTop: '1rem' }}>
          Formulario enviado con éxito 
        </Text>
      )}
    </section>
  );
}

export default ContactSection;
