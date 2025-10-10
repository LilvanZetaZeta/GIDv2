import React from 'react';
import '../../styles/atoms/ContactButton.css';

function ContactButton({ children = 'Enviar mensaje', ...props }) {
  return (
    <button className="contact-button" {...props}>
      {children}
    </button>
  );
}

export default ContactButton;
