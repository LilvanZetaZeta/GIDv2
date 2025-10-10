import React from 'react';
import '../../styles/atoms/Text.css';

function Text({ variant = 'p', children, className = '', style = {}, ...props }) {
  const Tag = variant;
  return (
    <Tag className={`text ${className}`} style={style} {...props}>
      {children}
    </Tag>
  );
}

export default Text;
