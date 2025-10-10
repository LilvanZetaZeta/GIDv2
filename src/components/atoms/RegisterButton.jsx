import React from 'react';
import '../../styles/atoms/RegisterButton.css';

function RegisterButton({ children = 'Registrarse', ...props }) {
  return (
    <button className="register-button" {...props}>
      {children}
    </button>
  );
}

export default RegisterButton;
