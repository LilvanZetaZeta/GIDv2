import React from 'react';
import '../../styles/components/atoms/ErrorMessage.css';

export const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  );
};