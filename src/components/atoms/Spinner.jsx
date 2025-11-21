import React from 'react';
import '../../styles/components/atoms/Spinner.css';

export const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};