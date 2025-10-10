import React from 'react';
import '../../styles/atoms/TextArea.css';

function TextArea({ id, name, placeholder, value, onChange, rows = 4 }) {
  return (
    <textarea
      id={id}
      name={name}
      className="textarea"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
    />
  );
}

export default TextArea;
