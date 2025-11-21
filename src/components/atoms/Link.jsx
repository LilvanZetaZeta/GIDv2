import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/components/atoms/Link.css';

export const Link = ({ to, children, className = '' }) => {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => `link ${isActive ? 'active' : ''} ${className}`}
    >
      {children}
    </NavLink>
  );
};