import React from 'react';
import '../../styles/components/organisms/Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p>&copy; {new Date().getFullYear()} E-Commerce GID. Todos los derechos reservados.</p>
        <div className="footer__links">
          <a href="#" className="footer__link">Política de Privacidad</a>
          <a href="#" className="footer__link">Términos de Servicio</a>
        </div>
      </div>
    </footer>
  );
};