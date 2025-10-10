import React from 'react';
import '../../styles/atoms/PasswordToggle.css';

function PasswordToggle({ visible, onToggle }) {
  return (
    <button
      type="button"
      className="password-toggle"
      onClick={onToggle}
    >
      {visible ? '🙈 Ocultar' : '👁️ Ver'}
    </button>
  );
}

export default PasswordToggle;
