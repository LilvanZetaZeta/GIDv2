import React from 'react';
import '../../styles/components/atoms/TextArea.css';

export const Textarea = ({ placeholder, value, onChange, ...props }) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="textarea"
      {...props}
    />
  );
};