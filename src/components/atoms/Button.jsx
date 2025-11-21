import React from 'react';
import '../../styles/components/atoms/Button.css';

export const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled, className = '' }) => {
  // Construye la lista de clases BEM
  const classNames = [
    'button',
    `button--${variant}`,
    className
  ].join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames}
      disabled={disabled}
    >
      {children}
    </button>
  );
};