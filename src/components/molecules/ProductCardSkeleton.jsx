import React from 'react';
import '../../styles/components/molecules/ProductCardSkeleton.css';

export const ProductCardSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__image"></div>
      <div className="skeleton-card__content">
        <div className="skeleton-card__title"></div>
        <div className="skeleton-card__price"></div>
      </div>
    </div>
  );
};