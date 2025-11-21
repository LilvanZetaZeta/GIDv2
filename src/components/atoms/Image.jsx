import React from 'react';
import '../../styles/components/atoms/Image.css';

export const Image = ({ src, alt, className = '' }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`image ${className}`} 
      loading="lazy"
    />
  );
};