import React from 'react';
import '../../styles/components/atoms/Typography.css';

export const Typography = ({ variant = 'body', children, className = '' }) => {
  const Component = ['h1', 'h2', 'h3'].includes(variant) ? variant : 'p';
  const classNames = `typography typography--${variant} ${className}`;

  return (
    <Component className={classNames}>
      {children}
    </Component>
  );
};