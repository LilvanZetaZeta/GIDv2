import React from 'react';
import '../../styles/components/atoms/Badge.css';

export const Badge = ({ children }) => {
  if (!children || children === 0) return null;
  return <span className="badge">{children}</span>;
};