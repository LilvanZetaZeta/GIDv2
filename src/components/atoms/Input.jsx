import React from 'react';
import '../../styles/atoms/Input.css';

function Input({ type = 'text', id, name, placeholder, value, onChange, ...props }) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className="input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}

export default Input;
