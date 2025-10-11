import React, { useState } from 'react';
import Text from '../atoms/Text';
import ContactForm from '../molecules/ContactForm.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import '../../styles/organisms/ContactSection.css';


function ContactSection() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setSuccess(false);
      setError('Por favor, rellena todos los campos obligatorios');
      return;
    }

    console.log('Mensaje enviado:', formData);
    setError('');
    setSuccess(true);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        navigate('/');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
  <section data-testid="contact-section" className="contact-section">
      <Text variant="h2">Contáctanos</Text>
      <ContactForm onSubmit={handleSubmit} />

      {error && (
        <Text variant="p" className="text-error" >
          {error}
        </Text>
      )}

      {success && (
        <div className="confirmation-message">
          <Text variant="p" className="text-success">
            ✅ Formulario enviado con éxito
          </Text>
        </div>
      )}
    </section>
  );
}

export default ContactSection;