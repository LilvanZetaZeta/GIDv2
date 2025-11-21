import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '../atoms/Image';
import '../../styles/components/molecules/ProductCard.css'; 

export const ProductCard = ({ product }) => {
  return (
    <div className="product-card"> 
      <Link to={`/product/${product.id}`}>
        <div className="product-card__image-wrapper">
          <Image src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-card__content">
          <h3 className="product-card__title">{product.name}</h3>
          <p className="product-card__price">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};