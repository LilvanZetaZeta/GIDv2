import React from 'react';
import { ContactForm } from '../components/organisms/ContactForm';
import { Typography } from '../components/atoms/Typography';

export const ContactPage = () => (
  <div className="form-container">
    <Typography variant="h1" className="text-center">Contacto</Typography>
    <ContactForm />
  </div>
);