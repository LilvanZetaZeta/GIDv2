import React from 'react';
import '../../styles/components/atoms/Input.css';

export const Input = ({ type = 'text', placeholder, value, onChange, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input"
      {...props}
    />
  );
};